import React, { useEffect, useState } from "react";
import { Gap, AtomSelect, ExportButtons } from "../../components";
import { Row, Col, Button, Pagination, Image, Modal } from "react-bootstrap";
import "./profile.scss";
import Icon from "../../assets/icon/Index";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchCardSummaryById,
  fetchMyCardSummary,
  fetchAllRemunByUserId,
  fetchMyRemun,
  fetchMe,
  fetchKaryawanById,
} from "../../services/Api";

const Profile = () => {
  const { user, loading } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year, label: year };
  });
  const [cardSummary, setCardSummary] = useState(null);
  const [remunTerbaru, setRemunTerbaru] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    if (loading) return;

    const currentYear = new Date().getFullYear();

    if (id && user?.role !== "admin") {
      navigate("/profile", { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        let summaryRes, terbaruRes, userDataRes;
        if (id) {
          summaryRes = await fetchCardSummaryById(id, currentYear);
          terbaruRes = await fetchAllRemunByUserId(id, currentYear);
          userDataRes = await fetchKaryawanById(id);
        } else {
          summaryRes = await fetchMyCardSummary(currentYear);
          terbaruRes = await fetchMyRemun(currentYear);
          userDataRes = await fetchMe();
        }

        setCardSummary(summaryRes.data);
        setRemunTerbaru(terbaruRes.data.data);
        setDataUser(userDataRes.data);
      } catch (err) {
        console.error("Gagal mengambil data profil:", err);
      }
    };

    fetchData();
  }, [id, user, loading, navigate]);

  // Render cardSummary
  const {
    data: {
      periode,
      nama,
      totalAlokasiAnggaran,
      totalPenggunaanAnggaran,
      saldoRiilAwalPeriode,
      saldoRiilAkhirPeriode,
      perKategori: { penggunaan = {}, sisa = {} } = {},
    } = {},
  } = cardSummary || {};

  let userDetail = {};

  if (id) {
    userDetail = dataUser?.data || {};
  } else {
    userDetail = dataUser?.data?.[0] || {};
  }

  const {
    nama: namaUser,
    email,
    role,
    status,
    departemen,
    jabatan,
    kontak,
    tahunMasuk,
    profilePicture,
  } = userDetail;

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

  // Handle Modal
  const exportRemunClose = () => setShow(false);
  const exportRemunShow = () => setShow(true);

  if (loading) return null;

  return (
    <div className="content-container">
      <div className="mutasi-container">
        <h2 className="mb-4">Profile Karyawan</h2>
        <div className="periode-info profile-info">
          <div className="table-wrapper">
            <table className="table profile-info">
              <tbody>
                <tr>
                  <td rowSpan="6" className="td-aksi">
                    <div className="image-holder-profile d-flex justify-items-center align-center">
                      <Image
                        src={
                          `https://remunerasi-api.onrender.com/${profilePicture}` ||
                          "https://placehold.co/300x400?text=Hello\nWorld"
                        }
                        fluid
                      />
                    </div>
                  </td>
                  <td>Nama</td>
                  <td className="devider">:</td>
                  <td>
                    <strong>{namaUser}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Departemen</td>
                  <td className="devider">:</td>
                  <td>
                    <strong>{departemen || "-"}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Jabatan</td>
                  <td className="devider">:</td>
                  <td>
                    <strong>{jabatan || "-"}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td className="devider">:</td>
                  <td>
                    <strong>{email || "-"}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Kontak</td>
                  <td className="devider">:</td>
                  <td>
                    <strong>{kontak || "-"}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Tahun Masuk</td>
                  <td className="devider">:</td>
                  <td>
                    <strong>
                      {new Date(tahunMasuk).toLocaleDateString("id-ID") || "-"}
                    </strong>
                    {}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Gap height={20} />
      <div className="mutasi-container">
        <h2 className="mb-4">Penggunaan Anggaran {periode}</h2>
        <Row>
          <Col md={3}>
            <div className="mutasi-header budget-card conference-card">
              <div className="rekening-info">
                <h6>Conference Budget</h6>
                <h4>
                  <strong>
                    {penggunaan.conference
                      ? `Rp. ${penggunaan.conference.toLocaleString("id-ID")}`
                      : "-"}
                  </strong>
                </h4>
                <p>
                  Saldo:{" "}
                  {sisa.sisaConference
                    ? `Rp. ${sisa.sisaConference.toLocaleString("id-ID")}`
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
                    {penggunaan.nutrition
                      ? `Rp. ${penggunaan.nutrition.toLocaleString("id-ID")}`
                      : "-"}
                  </strong>
                </h4>
                <p>
                  Saldo:{" "}
                  {sisa.sisaNutrition
                    ? `Rp. ${sisa.sisaNutrition.toLocaleString("id-ID")}`
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
                    <strong>
                      {penggunaan.book
                        ? `Rp. ${penggunaan.book.toLocaleString("id-ID")}`
                        : "-"}
                    </strong>
                  </strong>
                </h4>
                <p>
                  Saldo:{" "}
                  {sisa.sisaBook
                    ? `Rp. ${sisa.sisaBook.toLocaleString("id-ID")}`
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
                      <td>Nama Karyawan</td>
                      <td className="devider">:</td>
                      <td>
                        <strong>{nama}</strong>
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
                  <th>Nama Barang</th>
                  <th>Harga</th>
                </tr>
              </thead>
              <tbody>
                {allRemunerations.map((allRemun, index) => (
                  <tr key={allRemun.id}>
                    <td>{index + 1}</td>
                    <td>{allRemun.tanggalPembelian}</td>
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
            <h4 className="mb-4">Akses Cepat</h4>
            <div className="align-items-center justify-content download-section">
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
                onClick={exportRemunShow}
              >
                <Icon name="Download" size="16" className="me-2" /> Unduh
                Riwayat Remunerasi
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Gap height={20} />
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
    </div>
  );
};

export default Profile;
