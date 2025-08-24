import React, { useEffect, useState } from "react";
import { Gap, AtomSelect, ExportButtons } from "../../components";
import { Row, Col, Button, Dropdown, Pagination, Modal } from "react-bootstrap";
import Icon from "../../assets/icon/Index";
import "./home.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchCardSummary,
  fetchAllRemun,
  fetchAllRemunHistory,
  fetchDaftarKaryawanActive,
} from "../../services/Api";
import axios from "axios";

const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [cardSummary, setCardSummary] = useState(null);
  const [remunTerbaru, setRemunTerbaru] = useState([]);
  const [remunRiwayat, setRemunRiwayat] = useState([]);
  const [karyawan, setKaryawan] = useState([]);

  const [pastYear, setPastYear] = useState(2023);
  const [syncError, setSyncError] = useState([]);

  const [show, setShow] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year, label: year };
  });

  // State pagination
  const [remunPage, setRemunPage] = useState(1);
  const [karyawanPage, setKaryawanPage] = useState(1);
  const limit = 5;

  // FETCH Data Api
  useEffect(() => {
    if (loading || !user) return;

    const fetchRiwayat = async () => {
      try {
        const riwayatRes = await fetchAllRemunHistory(pastYear);
        setRemunRiwayat(riwayatRes.data.data);
      } catch (err) {
        console.error("Gagal mengambil data riwayat remunerasi:", err);
      }
    };

    fetchRiwayat();
  }, [loading, pastYear, user]);

  useEffect(() => {
    if (loading) return;

    if (user?.role !== "admin") {
      navigate("/profile", { replace: true });
      return;
    }

    const currentYear = new Date().getFullYear();

    const fetchData = async () => {
      try {
        const [summaryRes, terbaruRes, karyawanRes] = await Promise.all([
          fetchCardSummary(currentYear),
          fetchAllRemun(currentYear),
          fetchDaftarKaryawanActive(),
        ]);

        setCardSummary(summaryRes.data);
        setRemunTerbaru(terbaruRes.data.data);
        setKaryawan(karyawanRes.data.data);

        if (summaryRes.data.data.syncError) {
          setSyncError(summaryRes.data.data.syncError);
        }
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
      }
    };

    fetchData();
  }, [loading, user, navigate]);

  // Render cardSummary
  const {
    data: {
      periode,
      jumlahKaryawanAktif,
      totalAlokasiAnggaran,
      totalPenggunaanAnggaran,
      saldoRiilAwalPeriode,
      saldoRiilAkhirPeriode,
      perKategori: {
        totalPenggunaan = {},
        totalSisa = {},
        // totalAlokasi = {},
      } = {},
    } = {},
  } = cardSummary || {};

  // Render remunTerbaru
  const allRemunerations = remunTerbaru.map((item) => ({
    ...item,
    id: item._id,
    namaBarang: item.nama,
    jenis: item.jenis,
    jumlah: item.jumlah,
    keterangan: item.keterangan,
    tanggalPembelian: new Date(item.tanggalPembelian).toLocaleDateString(
      "id-ID"
    ),
    pemohon: item.pemohon || "-",
    gambar: item.gambar,
  }));

  // Render remunRiwayat
  const allRemunerationsHistory = remunRiwayat.map((item) => ({
    ...item,
    id: item._id,
    namaBarang: item.nama,
    jenis: item.jenis,
    jumlah: item.jumlah,
    keterangan: item.keterangan,
    tanggalPembelian: new Date(item.tanggalPembelian).toLocaleDateString(
      "id-ID"
    ),
    pemohon: item.pemohon || "-",
    gambar: item.gambar,
  }));

  // Render karyawan aktif
  const activeKaryawan = karyawan.map((item) => ({
    ...item,
    id: item._id,
    email: item.email,
    nama: item.nama,
    role: item.role,
    status: item.status,
  }));

  if (loading) return null;

  if (user?.role === "karyawan") {
    return <Navigate to="/profile" replace />;
  }

  // Handle Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const exportRemunClose = () => setShow(false);
  const exportRemunShow = () => setShow(true);
  const exportAnggaranClose = () => setShow(false);
  const exportAnggaranShow = () => setShow(true);

  // Generate Anggaran
  const handleGenerateAnggaran = async () => {
    try {
      const token = localStorage.getItem("token"); // ambil JWT
      if (!token) {
        alert("Token tidak ditemukan. Silakan login ulang.");
        return;
      }

      const res = await axios.post(
        `https://remunerasi-api.onrender.com/v1/anggaran/generate-all?tahun=${selectedYear}`,
        {}, // body kosong
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(selectedYear);

      alert(res.data.message || "Anggaran berhasil digenerate!");
      handleClose(); // tutup modal
      window.location.reload(); // reload halaman
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal generate anggaran.");
    }
  };

  // Fungsi ambil data sesuai page
  const paginate = (array, page, limit) => {
    const startIndex = (page - 1) * limit;
    return array.slice(startIndex, startIndex + limit);
  };

  // Data yang akan ditampilkan (dengan pagination)
  const remunToShow = paginate(allRemunerations, remunPage, limit);
  const karyawanToShow = paginate(activeKaryawan, karyawanPage, limit);

  // Hitung total halaman
  const remunTotalPages = Math.ceil(allRemunerations.length / limit);
  const karyawanTotalPages = Math.ceil(activeKaryawan.length / limit);

  // Generate komponen pagination
  const renderPagination = (totalPages, currentPage, onChangePage) => (
    <Pagination>
      <Pagination.First
        onClick={() => onChangePage(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => onChangePage(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {Array.from({ length: totalPages }, (_, i) => (
        <Pagination.Item
          key={i + 1}
          active={i + 1 === currentPage}
          onClick={() => onChangePage(i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => onChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => onChangePage(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );

  return (
    <div className="content-container">
      <div className="mutasi-container">
        <h2 className="mb-4">Penggunaan Anggaran 2025</h2>
        {syncError.length > 0 && (
          <div className="mb-4">
            <div className="alert alert-warning" role="alert">
              Ada beberapa data karyawan yang tidak tersinkron karena belum
              punya anggaran:
              <ul className="mt-2 mb-0">
                {syncError.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <Row>
          <Col md={3}>
            <div className="mutasi-header budget-card conference-card">
              <div className="rekening-info">
                <h6>Conference Budget</h6>
                <h4>
                  <strong>
                    {totalPenggunaan.conference
                      ? `Rp. ${totalPenggunaan.conference.toLocaleString(
                          "id-ID"
                        )}`
                      : "-"}
                  </strong>
                </h4>
                <p>
                  Saldo:{" "}
                  {totalSisa.conference
                    ? `Rp. ${totalSisa.conference.toLocaleString("id-ID")}`
                    : "-"}
                </p>
              </div>
            </div>
            <Gap height={10} />
            <div className="mutasi-header budget-card nutrition-card">
              <div className="rekening-info">
                <h6>Nutrition Budget</h6>
                <h4>
                  <strong>
                    {totalPenggunaan.nutrition
                      ? `Rp. ${totalPenggunaan.nutrition.toLocaleString(
                          "id-ID"
                        )}`
                      : "-"}
                  </strong>
                </h4>
                <p>
                  Saldo:{" "}
                  {totalSisa.nutrition
                    ? `Rp. ${totalSisa.nutrition.toLocaleString("id-ID")}`
                    : "-"}
                </p>
              </div>
            </div>
            <Gap height={10} />
            <div className="mutasi-header budget-card book-card">
              <div className="rekening-info">
                <h6>Book Budget</h6>
                <h4>
                  <strong>
                    {totalPenggunaan.book
                      ? `Rp. ${totalPenggunaan.book.toLocaleString("id-ID")}`
                      : "-"}
                  </strong>
                </h4>
                <p>
                  Saldo:{" "}
                  {totalSisa.book
                    ? `Rp. ${totalSisa.book.toLocaleString("id-ID")}`
                    : "-"}
                </p>
              </div>
            </div>
          </Col>
          <Col md={9}>
            <div className="mutasi-header">
              <div className="periode-info">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Tahun Periode</td>
                      <td className="devider">:</td>
                      <td>
                        <strong>{periode}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Total Karyawan</td>
                      <td className="devider">:</td>
                      <td>
                        <strong>{jumlahKaryawanAktif}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Total Remunerasi</td>
                      <td className="devider">:</td>
                      <td>
                        <strong>
                          {totalAlokasiAnggaran
                            ? `Rp. ${totalAlokasiAnggaran.toLocaleString(
                                "id-ID"
                              )}`
                            : "-"}
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Total Penggunaan</td>
                      <td className="devider">:</td>
                      <td>
                        <strong>
                          {totalPenggunaanAnggaran
                            ? `Rp. ${totalPenggunaanAnggaran.toLocaleString(
                                "id-ID"
                              )}`
                            : "-"}
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Saldo riil awal per 01-01-2025</td>
                      <td className="devider">:</td>
                      <td>
                        <strong>
                          {saldoRiilAwalPeriode
                            ? `Rp. ${saldoRiilAwalPeriode.toLocaleString(
                                "id-ID"
                              )}`
                            : "-"}
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Saldo riil akhir per 31-12-2025</td>
                      <td className="devider">:</td>
                      <td>
                        <strong>
                          {saldoRiilAkhirPeriode
                            ? `Rp. ${saldoRiilAkhirPeriode.toLocaleString(
                                "id-ID"
                              )}`
                            : "-"}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Gap height={20} />
      <Row>
        <Col md={6}>
          <div className="mutasi-container sub-mutasi-container">
            <h4 className="mb-4">Remunerasi Terbaru</h4>
            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Nama Karyawan</th>
                  <th>Nama Barang</th>
                  <th>Harga</th>
                </tr>
              </thead>
              <tbody>
                {remunToShow.map((allRemun, index) => (
                  <tr key={allRemun.id}>
                    <td>{(remunPage - 1) * limit + index + 1}</td>
                    <td>{allRemun.tanggalPembelian}</td>
                    <td>{allRemun.pemohon.nama}</td>
                    <td>{allRemun.nama}</td>
                    <td>
                      {allRemun.jumlah
                        ? `Rp. ${allRemun.jumlah.toLocaleString("id-ID")}`
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Row xs="auto">
              <Col>
                {renderPagination(remunTotalPages, remunPage, setRemunPage)}
              </Col>
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    href="/remunerasi"
                    variant="secondary"
                    className="print-button"
                  >
                    <Icon name="ArrowRight" size="16" className="me-2" /> Lihat
                    Semua
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={6}>
          <div className="mutasi-container sub-mutasi-container">
            <h4 className="mb-4">Daftar Karyawan</h4>
            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {karyawanToShow.map((kItem, index) => (
                  <tr key={kItem.id}>
                    <td>{(karyawanPage - 1) * limit + index + 1}</td>
                    <td>{kItem.nama}</td>
                    <td>{kItem.email}</td>
                    <td className="td-aksi">
                      <div className="d-flex align-items-center justify-content-center action-section">
                        <Button
                          variant="primary"
                          className="d-flex align-items-center view-button"
                          onClick={() => navigate(`/profile/${kItem.id}`)}
                        >
                          <Icon name="Eye" size="16" className="" />
                        </Button>
                        <Button
                          variant="warning"
                          className="d-flex align-items-center view-button"
                          onClick={() => navigate(`/employee/${kItem.id}`)}
                        >
                          <Icon name="Wrench" size="16" className="" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Row xs="auto">
              <Col>
                {renderPagination(
                  karyawanTotalPages,
                  karyawanPage,
                  setKaryawanPage
                )}
              </Col>
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    href="/employee"
                    variant="secondary"
                    className="print-button"
                  >
                    <Icon name="ArrowRight" size="16" className="me-2" /> Lihat
                    Semua
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Gap height={20} />
      <Row>
        <Col md={6}>
          <div className="mutasi-container sub-mutasi-container">
            <h4 className="mb-4">Riwayat Remunerasi</h4>
            <div className="d-flex justify-content-between align-items-center mt-4 download-section">
              <div className="d-flex align-items-center">
                <span className="me-2">Tahun Periode</span>
                <Dropdown className="me-3">
                  <Dropdown.Toggle variant="light" id="tahun-riwayat">
                    {pastYear}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {[2024, 2023, 2022, 2021, 2020, 2019].map((year) => (
                      <Dropdown.Item
                        key={year}
                        onClick={() => setPastYear(year)}
                      >
                        {year}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            <table className="table table-bordered table-fit mt-2">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Nama Karyawan</th>
                  <th>Nama Barang</th>
                  <th>Harga</th>
                </tr>
              </thead>
              <tbody>
                {allRemunerationsHistory.map((allRemunHis, index) => (
                  <tr key={allRemunHis.id}>
                    <td>{index + 1}</td>
                    <td>{allRemunHis.tanggalPembelian}</td>
                    <td>{allRemunHis.pemohon.nama}</td>
                    <td>{allRemunHis.nama}</td>
                    <td>
                      {allRemunHis.jumlah
                        ? `Rp. ${allRemunHis.jumlah.toLocaleString("id-ID")}`
                        : "-"}
                      -
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Row xs="auto">
              <Col>
                <Pagination>
                  <Pagination.First />
                  <Pagination.Prev />
                  <Pagination.Item>1</Pagination.Item>
                  <Pagination.Item>2</Pagination.Item>
                  <Pagination.Item>3</Pagination.Item>
                  <Pagination.Next />
                  <Pagination.Last />
                </Pagination>
              </Col>
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    href="/remunerasi-history"
                    variant="secondary"
                    className="print-button"
                  >
                    <Icon name="ArrowRight" size="16" className="me-2" /> Lihat
                    Semua
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={6}>
          <div className="mutasi-container sub-mutasi-container">
            <h4 className="mb-4">Akses Cepat</h4>
            <div className="align-items-center justify-content download-section">
              <Button
                href="/employee-add"
                variant="secondary"
                className="d-flex align-items-center mb-2 akses-cepat"
              >
                <Icon name="Plus" size="16" className="me-2" /> Tambah Karyawan
              </Button>
              <Button
                href="/remunerasi-add"
                variant="secondary"
                className="d-flex align-items-center mb-2 akses-cepat"
              >
                <Icon name="Plus" size="16" className="me-2" /> Tambah
                Remunerasi
              </Button>
              <Button
                variant="secondary"
                className="d-flex align-items-center mb-2 akses-cepat"
                onClick={handleShow}
              >
                <Icon name="Plus" size="16" className="me-2" /> Generate
                Anggaran
              </Button>
              <Button
                variant="secondary"
                className="d-flex align-items-center mb-2 akses-cepat"
                onClick={exportRemunShow}
              >
                <Icon name="Download" size="16" className="me-2" /> Unduh
                Riwayat Remunerasi
              </Button>
              <Button
                variant="secondary"
                className="d-flex align-items-center mb-2 akses-cepat"
                onClick={exportAnggaranShow}
              >
                <Icon name="Download" size="16" className="me-2" /> Unduh
                Riwayat Anggaran
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Gap height={20} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Anggaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtomSelect
            label="Pilih Tahun"
            name="tahun"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            options={yearOptions}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleGenerateAnggaran}>
            Generate
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={exportRemunClose}>
        <Modal.Header closeButton>
          <Modal.Title>Unduh Riwayat Remunerasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtomSelect
            label="Pilih Tahun"
            name="tahun"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            options={yearOptions}
          />
          <AtomSelect
            label="Pilih Format"
            name="format"
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            options={[
              { value: "pdf", label: "PDF" },
              { value: "excel", label: "Excel" },
            ]}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={exportRemunClose}>
            Batal
          </Button>
          <ExportButtons
            periode={selectedYear}
            tipe="remunerasi"
            format={selectedFormat}
          />
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={exportAnggaranClose}>
        <Modal.Header closeButton>
          <Modal.Title>Unduh Riwayat Anggaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtomSelect
            label="Pilih Tahun"
            name="tahun"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            options={yearOptions}
          />
          <AtomSelect
            label="Pilih Format"
            name="format"
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            options={[
              { value: "pdf", label: "PDF" },
              { value: "excel", label: "Excel" },
            ]}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={exportAnggaranClose}>
            Batal
          </Button>
          <ExportButtons
            tahun={selectedYear}
            tipe="anggaran"
            format={selectedFormat}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
