import React, { useState } from "react";
import { Gap, Input } from "../../components";
import {
  Button,
  Dropdown,
  Form,
  Row,
  Col,
  Pagination,
  Image,
} from "react-bootstrap";
import Icon from "../../assets/icon/Index";
import "bootstrap/dist/css/bootstrap.min.css";

const History = () => {
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const employeeData = [
    {
      id: 1,
      name: "Rahmat Hidayatullah",
      email: "rahmathi@gmail.com",
      position: "Software Engineer",
      unit: "IT",
      remuneration: [
        {
          productId: 1,
          date: "2025-1-24",
          product: "Edensor",
          img: "edensor",
          category: "Book",
          price: 98000,
          desc: "Pembelian buku buulan Januari",
          attachment: "http://",
          status: "Finish",
        },
        {
          productId: 2,
          date: "2025-2-16",
          product: "Berobat",
          img: "surat-dokter",
          category: "Nutrition",
          price: 100000,
          desc: "Checkup ke klinik, gejala pusing dan mual",
          attachment: "http://",
          status: "Finish",
        },
        {
          productId: 3,
          date: "2025-2-16",
          product: "Madu Hutan Badui",
          img: "madu-hutan-badui",
          category: "Nutrition",
          price: 150000,
          desc: "Pembelian madu hutan untuk kesehatan",
          attachment: "http://",
          status: "Pending",
        },
        {
          productId: 4,
          date: "2025-2-18",
          product: "MERN Stack Course",
          img: "mern-course",
          category: "Conference",
          price: 299000,
          desc: "Pembelian paket pembelajaran MERN Stack",
          attachment: "http://",
          status: "Need Approval",
        },
      ],
    },
    {
      id: 2,
      name: "Arif Turmuji",
      email: "arifturmuji@gmail.com",
      position: "Software Engineer",
      unit: "IT",
      remuneration: [
        {
          productId: 1,
          date: "2025-1-24",
          product: "Edensor",
          img: "edensor",
          category: "Book",
          price: 98000,
          desc: "Pembelian buku buulan Januari",
          attachment: "http://",
          status: "Finish",
        },
        {
          productId: 2,
          date: "2025-2-16",
          product: "Berobat",
          img: "surat-dokter",
          category: "Nutrition",
          price: 100000,
          desc: "Checkup ke klinik, gejala pusing dan mual",
          attachment: "http://",
          status: "Finish",
        },
        {
          productId: 3,
          date: "2025-2-16",
          product: "Madu Hutan Badui",
          img: "madu-hutan-badui",
          category: "Nutrition",
          price: 150000,
          desc: "Pembelian madu hutan untuk kesehatan",
          attachment: "http://",
          status: "Pending",
        },
        {
          productId: 4,
          date: "2025-2-18",
          product: "MERN Stack Course",
          img: "mern-course",
          category: "Conference",
          price: 299000,
          desc: "Pembelian paket pembelajaran MERN Stack",
          attachment: "http://",
          status: "Need Approval",
        },
      ],
    },
    {
      id: 3,
      name: "Meri Kurnia",
      email: "merikurnia@gmail.com",
      position: "Software Engineer",
      unit: "IT",
      remuneration: [
        {
          productId: 1,
          date: "2025-1-24",
          product: "Edensor",
          img: "edensor",
          category: "Book",
          price: 98000,
          desc: "Pembelian buku buulan Januari",
          attachment: "http://",
          status: "Finish",
        },
        {
          productId: 2,
          date: "2025-2-16",
          product: "Berobat",
          img: "surat-dokter",
          category: "Nutrition",
          price: 100000,
          desc: "Checkup ke klinik, gejala pusing dan mual",
          attachment: "http://",
          status: "Finish",
        },
        {
          productId: 3,
          date: "2025-2-16",
          product: "Madu Hutan Badui",
          img: "madu-hutan-badui",
          category: "Nutrition",
          price: 150000,
          desc: "Pembelian madu hutan untuk kesehatan",
          attachment: "http://",
          status: "Pending",
        },
        {
          productId: 4,
          date: "2025-2-18",
          product: "MERN Stack Course",
          img: "mern-course",
          category: "Conference",
          price: 299000,
          desc: "Pembelian paket pembelajaran MERN Stack",
          attachment: "http://",
          status: "Need Approval",
        },
      ],
    },
    {
      id: 4,
      name: "Anisa Fauziah",
      email: "anisafa@gmail.com",
      position: "Software Engineer",
      unit: "IT",
      remuneration: [
        {
          productId: 1,
          date: "2025-1-24",
          product: "Edensor",
          img: "edensor",
          category: "Book",
          price: 98000,
          desc: "Pembelian buku buulan Januari",
          attachment: "http://",
          status: "Finish",
        },
        {
          productId: 2,
          date: "2025-2-16",
          product: "Berobat",
          img: "surat-dokter",
          category: "Nutrition",
          price: 100000,
          desc: "Checkup ke klinik, gejala pusing dan mual",
          attachment: "http://",
          status: "Finish",
        },
        {
          productId: 3,
          date: "2025-2-16",
          product: "Madu Hutan Badui",
          img: "madu-hutan-badui",
          category: "Nutrition",
          price: 150000,
          desc: "Pembelian madu hutan untuk kesehatan",
          attachment: "http://",
          status: "Pending",
        },
        {
          productId: 4,
          date: "2025-2-18",
          product: "MERN Stack Course",
          img: "mern-course",
          category: "Conference",
          price: 299000,
          desc: "Pembelian paket pembelajaran MERN Stack",
          attachment: "http://",
          status: "Need Approval",
        },
      ],
    },
  ];
  // Pagination logic
  let allRemunerations = employeeData.flatMap((employee) =>
    employee.remuneration.map((item) => ({
      ...item,
      employeeName: employee.name,
    }))
  );

  if (sortConfig.key) {
    allRemunerations.sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];

      if (sortConfig.key === "date") {
        // Convert to timestamps for accurate comparison
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
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allRemunerations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(allRemunerations.length / itemsPerPage);

  return (
    <div className="content-container">
      <div className="mutasi-container">
        <h2 className="mb-4">Riwayat Remunerasi</h2>
        <Gap height={40} />
        <Row>
          <Col xs={12} md={6}>
            <div className="d-flex align-items-center justify-content download-section">
              <span className="me-2 mb-3">Periode:</span>
              <Dropdown className="me-3 mb-3">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  2024
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">2023</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">2022</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">2021</Dropdown.Item>
                  <Dropdown.Item href="#/action-4">2020</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Form className="mb-0">
                <Input placeholder="🔍 Cari " className="mb-0" />
              </Form>
            </div>
            {/* <div className="d-flex align-items-center justify-content download-section">
              
            </div> */}
          </Col>
          <Col xs={6} md={6}>
            <div className="d-flex align-items-center justify-content download-section">
              {/* <Button
                variant="secondary"
                className="d-flex align-items-center print-button"
              >
                <Icon name="UserPlus" size="16" className="me-2" /> Tambah Data
                Remunerasi
              </Button> */}
              <span className="me-2">Pilih Format File:</span>
              <Dropdown className="me-3">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  *** Select ***
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">PDF</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Excel</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button
                variant="secondary"
                className="d-flex align-items-center download-button"
              >
                <Icon name="Download" size="16" className="me-2" /> Download
              </Button>
            </div>
          </Col>
        </Row>

        <table className="table table-bordered table-fit">
          <thead>
            <tr>
              <th>No</th>
              <th
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
                Status{" "}
                {sortConfig.key === "status" ? (
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
                <td>{item.date}</td>
                <td className="td-aksi">
                  <div className="image-holder d-flex justify-items-center align-center">
                    <Image
                      src="https://placehold.co/600x400?text=Hello\nWorld"
                      fluid
                    />
                  </div>

                  {/* {item.img} */}
                </td>
                <td>{item.product}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.status}</td>
                <td>{item.employeeName}</td>
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
    // <div className="content-container">
    //   <p>History</p>
    // </div>
  );
};

export default History;
