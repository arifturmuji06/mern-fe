import React, { useState } from "react";
import { Gap, Input } from "../../components";
import { Button, Dropdown, Form, Row, Col, Pagination } from "react-bootstrap";
import Icon from "../../assets/icon/Index";
import "./employee.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Employee = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const employeeData = [
    {
      id: 1,
      name: "Rahmat Hidayatullah",
      email: "rahmathi@gmail.com",
      position: "Software Engineer",
      unit: "IT",
    },
    {
      id: 2,
      name: "Arif Turmuji",
      email: "arifturmuji@gmail.com",
      position: "Software Engineer",
      unit: "IT",
    },
    {
      id: 3,
      name: "Meri Kurnia",
      email: "merikurnia@gmail.com",
      position: "Software Engineer",
      unit: "IT",
    },
    {
      id: 4,
      name: "Meri Kurnia",
      email: "merikurnia@gmail.com",
      position: "Software Engineer",
      unit: "IT",
    },
    {
      id: 5,
      name: "Meri Kurnia",
      email: "merikurnia@gmail.com",
      position: "Software Engineer",
      unit: "IT",
    },
    {
      id: 6,
      name: "Meri Kurnia",
      email: "merikurnia@gmail.com",
      position: "Software Engineer",
      unit: "IT",
    },
    {
      id: 7,
      name: "Meri Kurnia",
      email: "merikurnia@gmail.com",
      position: "Software Engineer",
      unit: "IT",
    },
    {
      id: 8,
      name: "Meri Kurnia",
      email: "merikurnia@gmail.com",
      position: "Software Engineer",
      unit: "IT",
    },
    {
      id: 9,
      name: "Meri Kurnia",
      email: "merikurnia@gmail.com",
      position: "Software Engineer",
      unit: "IT",
    },
    {
      id: 10,
      name: "Meri Kurnia",
      email: "merikurnia@gmail.com",
      position: "Software Engineer",
      unit: "IT",
    },
  ];
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = employeeData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(employeeData.length / itemsPerPage);

  return (
    <div className="content-container">
      <div className="mutasi-container">
        <h2 className="mb-4">Daftar Karyawan</h2>
        <Gap height={40} />
        <Row>
          <Col xs={12} md={4}>
            <div>
              <Form className="mb-4">
                <Input placeholder="🔍 Cari Karyawan" />
              </Form>
            </div>
          </Col>
          <Col xs={6} md={8}>
            <div className="d-flex align-items-center justify-content download-section">
              <Button
                variant="primary"
                className="d-flex align-items-center print-button"
              >
                <Icon name="UserPlus" size="16" className="me-2" /> Tambah
                Karyawan
              </Button>
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
                variant="success"
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
              <th>Nama Karyawan</th>
              <th>Email</th>
              <th>Jabatan</th>
              <th>Unit</th>
              <th className="th-aksi">Aksi</th>
            </tr>
          </thead>
          {/* <tbody>
            {employeeData.map((employee, index) => (
              <tr key={employee.id}>
                <td>{index + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.unit}</td>
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
          </tbody> */}
          <tbody>
            {currentEmployees.map((employee, index) => (
              <tr key={employee.id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.unit}</td>
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

export default Employee;
