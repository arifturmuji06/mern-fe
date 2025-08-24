import React, { useEffect, useState } from "react";
import { fetchMyRemun, fetchAllRemun } from "../../services/Api"; // ✅ pakai helper API
import {
  Gap,
  Input,
  AtomButton,
  AtomSelect,
  ExportButtons,
} from "../../components";
import { Button, Form, Row, Col, Pagination, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Icon from "../../assets/icon/Index";
import "./remunerasi.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Remunerasi = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userRole = userData?.role;
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const currentPeriod = new Date().getFullYear();

  const [dataRemunerasi, setDataRemunerasi] = useState([]);
  useEffect(() => {
    const currentYear = new Date().getFullYear();

    const fetchData = async () => {
      try {
        const response =
          userRole === "admin"
            ? await fetchAllRemun(currentYear)
            : await fetchMyRemun(currentYear);

        setDataRemunerasi(response.data.data);
      } catch (err) {
        console.error("Gagal ambil data remunerasi:", err);
      }
    };

    fetchData();
  }, [userRole]);

  // Render Remunerasi
  const allRemunerations = dataRemunerasi.map((item) => ({
    ...item,
    employeeName: item.pemohon.nama || "—",
    date: item.tanggalPembelian,
    product: item.nama,
    price: item.jumlah,
    category: item.jenis,
    periode: item.periode,
  }));

  // Filter by Nama atau Email
  const filteredRemunerasi = allRemunerations.filter((rem) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      rem.nama.toLowerCase().includes(lowerSearch) ||
      rem.pemohon.nama.toLowerCase().includes(lowerSearch) ||
      rem.jenis.toLowerCase().includes(lowerSearch)
    );
  });

  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  // Sort logic
  const sortedRemunerations = [...filteredRemunerasi].sort((a, b) => {
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

  const handleDelete = async (id, nama) => {
    if (window.confirm(`Anda ingin menghapus data remunerasi "${nama}" ini?`)) {
      try {
        const res = await axios.delete(
          `https://remunerasi-api.onrender.com/v1/remunerasi/${id}`
        );
        alert(`Data remunerasi "${nama}" berhasil dihapus!`);

        setDataRemunerasi((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
        console.error("Gagal hapus remunerasi:", err);
        alert("Gagal hapus data remunerasi!");
      }
    }
  };

  return (
    <div className="content-container">
      <div className="mutasi-container">
        <h2 className="mb-4">Remunerasi 2025</h2>
        <Gap height={40} />

        <Row>
          <Col xs={12} md={4}>
            <div>
              <Form className="">
                <Input
                  placeholder="🔍 Cari "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form>
            </div>
          </Col>
          <Col xs={6} md={8}>
            <div className="d-flex align-items-center justify-content download-section">
              <AtomButton
                label="Tambah Data Remunerasi"
                to="/remunerasi-add"
                icon="UserPlus"
                iconPosition="start"
                variant="secondary"
                className="d-flex align-items-center print-button"
              />
              <AtomSelect
                className="mb-0 inline-format"
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
                periode={currentPeriod}
                tipe="remunerasi"
                format={selectedFormat}
              />
            </div>
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
              <tr key={item._id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td className="td-aksi">
                  {new Date(item.tanggalPembelian).toLocaleDateString("id-ID")}
                </td>
                <td className="td-aksi">
                  <div className="image-holder d-flex justify-items-center align-center">
                    <Image
                      src={`https://remunerasi-api.onrender.com/${item.gambar}`}
                      alt={item.nama}
                      fluid
                    />
                  </div>
                </td>
                <td>{item.nama}</td>
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
                    <Button
                      variant="primary"
                      className="view-button"
                      onClick={() => navigate(`/remunerasi/detail/${item._id}`)}
                    >
                      <Icon name="Eye" size="16" className="me-2" /> View
                    </Button>
                    <Button
                      variant="warning"
                      className="d-flex align-items-center view-button"
                      onClick={() => navigate(`/remunerasi/${item._id}`)}
                    >
                      <Icon name="Wrench" size="16" className="me-2" /> Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="d-flex align-items-center view-button"
                      onClick={() => handleDelete(item._id, item.nama)}
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

export default Remunerasi;
