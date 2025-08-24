import React, { useEffect, useState } from "react";
import { Gap, Input, AtomButton } from "../../components";
import { Button, Dropdown, Form, Row, Col, Pagination } from "react-bootstrap";
import Icon from "../../assets/icon/Index";
import "./employee.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import {
  fetchDaftarKaryawanActive,
  fetchDaftarKaryawanInactive,
} from "../../services/Api";

const Employee = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [karyawan, setKaryawan] = useState([]);
  const [karyawanInactive, setInactiveKaryawan] = useState([]);
  const [searchActive, setSearchActive] = useState("");
  const [searchInactive, setSearchInactive] = useState("");

  useEffect(() => {
    if (loading || !user) return;

    const fetchData = async () => {
      try {
        const [karyawanRes] = await Promise.all([fetchDaftarKaryawanActive()]);
        const [karyawanInactiveRes] = await Promise.all([
          fetchDaftarKaryawanInactive(),
        ]);

        setKaryawan(karyawanRes.data.data);
        setInactiveKaryawan(karyawanInactiveRes.data.data);
      } catch (err) {
        console.error("Gagal mengambil data karyawan:", err);
      }
    };

    fetchData();
  }, [loading, user]);

  const activeKaryawan = karyawan.map((item) => ({
    ...item,
    id: item._id,
    email: item.email,
    nama: item.nama,
    role: item.role,
    status: item.status,
  }));

  const inactiveKaryawan = karyawanInactive.map((item) => ({
    ...item,
    id: item._id,
    email: item.email,
    nama: item.nama,
    role: item.role,
    status: item.status,
  }));

  // Filter Aktif
  const filteredKaryawan = activeKaryawan.filter((emp) => {
    const lowerSearch = searchActive.toLowerCase();
    return (
      emp.nama.toLowerCase().includes(lowerSearch) ||
      emp.email.toLowerCase().includes(lowerSearch)
    );
  });

  // Filter Nonaktif
  const filteredInactiveKaryawan = inactiveKaryawan.filter((emp) => {
    const lowerSearch = searchInactive.toLowerCase();
    return (
      emp.nama.toLowerCase().includes(lowerSearch) ||
      emp.email.toLowerCase().includes(lowerSearch)
    );
  });

  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  // Sorting setelah filter
  const sortedKaryawan = [...filteredKaryawan].sort((a, b) => {
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
  const [currentPageActive, setCurrentPageActive] = useState(1);
  const [currentPageInactive, setCurrentPageInactive] = useState(1);
  const itemsPerPage = 5;

  // Pagination Aktif
  const indexOfLastActive = currentPageActive * itemsPerPage;
  const indexOfFirstActive = indexOfLastActive - itemsPerPage;
  const currentActiveItems = sortedKaryawan.slice(
    indexOfFirstActive,
    indexOfLastActive
  );
  const totalPagesActive = Math.ceil(sortedKaryawan.length / itemsPerPage);

  // Pagination Nonaktif
  const indexOfLastInactive = currentPageInactive * itemsPerPage;
  const indexOfFirstInactive = indexOfLastInactive - itemsPerPage;
  const currentInactiveItems = filteredInactiveKaryawan.slice(
    indexOfFirstInactive,
    indexOfLastInactive
  );
  const totalPagesInactive = Math.ceil(
    filteredInactiveKaryawan.length / itemsPerPage
  );

  // Sorting button click
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Nonaktifkan karyawan
  const handleDeactivate = async (id, nama) => {
    if (window.confirm(`Yakin ingin menonaktifkan karyawan ${nama}?`)) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(
          `https://remunerasi-api.onrender.com/v1/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(res.data.message);
        setKaryawan((prev) => prev.filter((k) => k._id !== id));
        setInactiveKaryawan((prev) => [...prev, res.data.data]);
      } catch (err) {
        console.error("Gagal menonaktifkan:", err.response || err);
        alert("Gagal menonaktifkan karyawan!");
      }
    }
  };

  // Aktifkan kembali karyawan
  const handleActivate = async (id, nama) => {
    if (window.confirm(`Yakin ingin mengaktifkan kembali karyawan ${nama}?`)) {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.patch(
          `https://remunerasi-api.onrender.com/v1/users/${id}/reactivate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(res.data.message);
        setInactiveKaryawan((prev) => prev.filter((k) => k._id !== id));
        setKaryawan((prev) => [...prev, res.data.data]);
      } catch (err) {
        console.error("Gagal reaktivasi:", err.response || err);
        alert("Gagal mengaktifkan karyawan!");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "admin") {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="content-container">
      <div className="mutasi-container">
        <h2 className="mb-4">Daftar Karyawan Aktif</h2>
        <Gap height={40} />
        <Row>
          <Col xs={12} md={4}>
            <div>
              <Form className="mb-4">
                <Input
                  placeholder="🔍 Cari Karyawan"
                  value={searchActive}
                  onChange={(e) => {
                    setSearchActive(e.target.value);
                    setCurrentPageActive(1);
                  }}
                />
              </Form>
            </div>
          </Col>
          <Col xs={6} md={8}>
            <div className="d-flex align-items-center justify-content download-section">
              <AtomButton
                label="Tambah Karyawan"
                to="/employee-add"
                icon="UserPlus"
                iconPosition="start"
                variant="primary"
                className="d-flex align-items-center print-button"
              />
            </div>
          </Col>
        </Row>

        <table className="table table-bordered table-fit">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Karyawan</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="th-aksi">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentActiveItems.map((employee, index) => (
              <tr key={employee.id}>
                <td>{indexOfFirstActive + index + 1}</td>
                <td>{employee.nama}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                <td>{employee.status}</td>
                <td className="td-aksi">
                  <div className="d-flex align-items-center justify-content-center action-section">
                    <Button
                      variant="primary"
                      className="view-button"
                      onClick={() => navigate(`/profile/${employee.id}`)}
                    >
                      <Icon name="Eye" size="16" className="me-2" /> View
                    </Button>
                    <Button
                      variant="warning"
                      className="d-flex align-items-center view-button"
                      onClick={() => navigate(`/employee/${employee.id}`)}
                    >
                      <Icon name="Wrench" size="16" className="me-2" /> Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="d-flex align-items-center view-button"
                      onClick={() =>
                        handleDeactivate(employee._id, employee.nama)
                      }
                    >
                      <Icon name="Trash" size="16" className="me-2" />{" "}
                      Deactivate
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination className="justify-content-center mt-4">
          <Pagination.First
            disabled={currentPageActive === 1}
            onClick={() => setCurrentPageActive(1)}
          />
          <Pagination.Prev
            disabled={currentPageActive === 1}
            onClick={() => setCurrentPageActive(currentPageActive - 1)}
          />
          {Array.from({ length: totalPagesActive }, (_, idx) => idx + 1).map(
            (pageNum) => (
              <Pagination.Item
                key={pageNum}
                active={pageNum === currentPageActive}
                onClick={() => setCurrentPageActive(pageNum)}
              >
                {pageNum}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            disabled={currentPageActive === totalPagesActive}
            onClick={() => setCurrentPageActive(currentPageActive + 1)}
          />
          <Pagination.Last
            disabled={currentPageActive === totalPagesActive}
            onClick={() => setCurrentPageActive(totalPagesActive)}
          />
        </Pagination>
      </div>
      <Gap height={40} />
      <div className="mutasi-container">
        <h2 className="mb-4">Karyawan Tidak Aktif</h2>
        <Gap height={40} />
        <Row>
          <Col xs={12} md={4}>
            <div>
              <Form className="mb-4">
                <Input
                  placeholder="🔍 Cari Karyawan"
                  value={searchInactive}
                  onChange={(e) => {
                    setSearchInactive(e.target.value);
                    setCurrentPageInactive(1);
                  }}
                />
              </Form>
            </div>
          </Col>
        </Row>

        <table className="table table-bordered table-fit">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Karyawan</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="th-aksi">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentInactiveItems.map((employee, index) => (
              <tr key={employee.id}>
                <td>{indexOfFirstInactive + index + 1}</td>
                <td>{employee.nama}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                <td>{employee.status}</td>
                <td className="td-aksi">
                  <div className="d-flex align-items-center justify-content-center action-section">
                    <Button
                      variant="primary"
                      className="view-button"
                      onClick={() => navigate(`/profile/${employee.id}`)}
                    >
                      <Icon name="Eye" size="16" className="me-2" /> View
                    </Button>
                    <Button
                      variant="warning"
                      className="d-flex align-items-center view-button"
                      onClick={() => navigate(`/employee/${employee.id}`)}
                    >
                      <Icon name="Wrench" size="16" className="me-2" /> Edit
                    </Button>
                    <Button
                      variant="secondary"
                      className="d-flex align-items-center view-button"
                      onClick={() =>
                        handleActivate(employee._id, employee.nama)
                      }
                    >
                      <Icon name="Plus" size="16" className="me-2" /> Activate
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination className="justify-content-center mt-4">
          <Pagination.First
            disabled={currentPageInactive === 1}
            onClick={() => setCurrentPageInactive(1)}
          />
          <Pagination.Prev
            disabled={currentPageInactive === 1}
            onClick={() => setCurrentPageInactive(currentPageInactive - 1)}
          />
          {Array.from({ length: totalPagesInactive }, (_, idx) => idx + 1).map(
            (pageNum) => (
              <Pagination.Item
                key={pageNum}
                active={pageNum === currentPageInactive}
                onClick={() => setCurrentPageInactive(pageNum)}
              >
                {pageNum}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            disabled={currentPageInactive === totalPagesInactive}
            onClick={() => setCurrentPageInactive(currentPageInactive + 1)}
          />
          <Pagination.Last
            disabled={currentPageInactive === totalPagesInactive}
            onClick={() => setCurrentPageInactive(totalPagesInactive)}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default Employee;
