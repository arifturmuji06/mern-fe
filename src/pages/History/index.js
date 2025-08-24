import React, { useEffect, useState } from "react";
import { Gap, AtomSelect, ExportButtons } from "../../components";
import {
  Button,
  Dropdown,
  Form,
  Row,
  Col,
  Pagination,
  Image,
  InputGroup,
} from "react-bootstrap";
import Icon from "../../assets/icon/Index";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../contexts/AuthContext";
import { fetchAllRemunHistory, fetchMyRemunRiwayat } from "../../services/Api";

const History = () => {
  const { user, loading } = useAuth();

  const [remunRiwayat, setRemunRiwayat] = useState([]);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear - 1);
  const [selectedFormat, setSelectedFormat] = useState("pdf");

  const yearOptions = Array.from({ length: 7 }, (_, i) => {
    const year = currentYear - 1 - i;
    return { value: year, label: year };
  });

  useEffect(() => {
    if (loading || !user) return;

    const fetchRiwayat = async () => {
      try {
        const response =
          user.role === "admin"
            ? await fetchAllRemunHistory(selectedYear)
            : await fetchMyRemunRiwayat(selectedYear);

        setRemunRiwayat(response.data.data);
      } catch (err) {
        console.error("Gagal mengambil data riwayat remunerasi:", err);
      }
    };

    fetchRiwayat();
  }, [loading, user, selectedYear]);

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
    category: item.jenis,
    pemohon: item.pemohon || "-",
    gambar: item.gambar,
  }));

  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  // Sort logic
  const sortedRemunerations = [...allRemunerationsHistory].sort((a, b) => {
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];

    if (sortConfig.key === "date") {
      return sortConfig.direction === "asc"
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA);
    }

    if (typeof valA === "string") {
      return sortConfig.direction === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    } else {
      return sortConfig.direction === "asc" ? valA - valB : valB - valA;
    }
  });

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedRemunerations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedRemunerations.length / itemsPerPage);

  // Sorting button click
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="content-container">
      <div className="mutasi-container">
        <h2 className="mb-4">
          Riwayat Remunerasi & Penggunaan Anggaran tahun 2024
        </h2>
        <Gap height={40} />
        <div className="mb-3 d-flex align-items-center justify-content download-section">
          <AtomSelect
            className="inline-format"
            label="Pilih Periode:"
            name="tahun"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            options={yearOptions}
          />
          <AtomSelect
            className=" inline-format"
            label="Pilih Format:"
            name="format"
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            options={[
              { value: "pdf", label: "PDF" },
              { value: "excel", label: "Excel" },
            ]}
          />
          <ExportButtons
            periode={selectedYear}
            tipe="remunerasi"
            format={selectedFormat}
          />
        </div>

        <Row>
          <Col xs={12} md={6}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary">
                <Icon name="Search" size="16" className="me-2" />
                Cari
              </Button>
            </InputGroup>
          </Col>
          <Col xs={12} md={6}>
            <Button
              variant="secondary"
              className="d-flex align-items-center download-button mb-3"
            >
              <Icon name="Download" size="16" className="me-2" /> Download
            </Button>
          </Col>
        </Row>

        <table className="table table-bordered table-fit">
          <thead>
            <tr>
              <th>No</th>
              <th
                className="td-aksi"
                onClick={() => handleSort("date")}
                style={{ cursor: "pointer" }}
              >
                Tanggal{" "}
                {sortConfig.key === "date" ? (
                  sortConfig.direction === "asc" ? (
                    <Icon name="ChevronUp" size="16" className="me-2" />
                  ) : (
                    <Icon name="ChevronDown" size="16" className="me-2" />
                  )
                ) : (
                  ""
                )}
              </th>
              <th>Gambar</th>
              <th
                onClick={() => handleSort("product")}
                style={{ cursor: "pointer" }}
              >
                Nama Produk{" "}
                {sortConfig.key === "product" ? (
                  sortConfig.direction === "asc" ? (
                    <Icon name="ChevronUp" size="16" className="me-2" />
                  ) : (
                    <Icon name="ChevronDown" size="16" className="me-2" />
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                onClick={() => handleSort("price")}
                style={{ cursor: "pointer" }}
              >
                Harga{" "}
                {sortConfig.key === "price" ? (
                  sortConfig.direction === "asc" ? (
                    <Icon name="ChevronUp" size="16" className="me-2" />
                  ) : (
                    <Icon name="ChevronDown" size="16" className="me-2" />
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                onClick={() => handleSort("category")}
                style={{ cursor: "pointer" }}
              >
                Kategori{" "}
                {sortConfig.key === "category" ? (
                  sortConfig.direction === "asc" ? (
                    <Icon name="ChevronUp" size="16" className="me-2" />
                  ) : (
                    <Icon name="ChevronDown" size="16" className="me-2" />
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                onClick={() => handleSort("status")}
                style={{ cursor: "pointer" }}
              >
                Periode{" "}
                {sortConfig.key === "periode" ? (
                  sortConfig.direction === "asc" ? (
                    <Icon name="ChevronUp" size="16" className="me-2" />
                  ) : (
                    <Icon name="ChevronDown" size="16" className="me-2" />
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                onClick={() => handleSort("employeeName")}
                style={{ cursor: "pointer" }}
              >
                Nama Karyawan{" "}
                {sortConfig.key === "employeeName" ? (
                  sortConfig.direction === "asc" ? (
                    <Icon name="ChevronUp" size="16" className="me-2" />
                  ) : (
                    <Icon name="ChevronDown" size="16" className="me-2" />
                  )
                ) : (
                  ""
                )}
              </th>
              <th className="th-aksi">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td className="td-aksi">
                  {new Date(item.tanggalPembelian).toLocaleDateString("id-ID")}
                </td>
                <td className="td-aksi">
                  <div className="image-holder d-flex justify-items-center align-center">
                    <Image
                      src={`https://remunerasi-api.onrender.com/${item.gambar}`}
                      alt={item.namaBarang}
                      fluid
                    />
                  </div>
                </td>
                <td>{item.namaBarang}</td>
                <td>
                  {item.jumlah.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td>{item.jenis}</td>
                <td>{item.periode}</td>
                <td>{item.pemohon.nama}</td>
                <td className="td-aksi">
                  <div className="d-flex align-items-center justify-content-center action-section">
                    <Button variant="primary" className="view-button">
                      <Icon name="Eye" size="16" className="me-2" /> View
                    </Button>
                    <Button
                      variant="warning"
                      className="d-flex align-items-center view-button"
                    >
                      <Icon name="Wrench" size="16" className="me-2" /> Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="d-flex align-items-center view-button"
                    >
                      <Icon name="Trash" size="16" className="me-2" /> Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination className="justify-content-center mt-4">
          <Pagination.First
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          />
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          />

          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
            (pageNum) => (
              <Pagination.Item
                key={pageNum}
                active={pageNum === currentPage}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </Pagination.Item>
            )
          )}

          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          />
          <Pagination.Last
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default History;
