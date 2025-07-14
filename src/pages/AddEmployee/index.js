import React, { useState } from "react";
import { Gap, Input, AtomButton, AtomSelect } from "../../components";
import { Form, Row, Col, Alert } from "react-bootstrap";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    departemen: "",
    jabatan: "",
    kontak: "",
    tanggalMasuk: "",
    profileImage: null,
    password: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Form Data Submitted:", formData);

    // Show notification
    setShowAlert(true);

    // Auto-hide after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="content-container">
      <div className="mutasi-container">
        <h2>Tambah Data Karyawan</h2>
        <AtomButton
          to="/employee"
          icon="SquareArrowLeft"
          iconPosition="start"
          className="d-flex align-items-center view-button"
          variant="secondary"
        />

        <Gap height={20} />

        {/* ✅ Success Alert */}
        {showAlert && (
          <Alert variant="success">🎉 Data berhasil ditambahkan!</Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Input
            label="Nama Karyawan"
            placeholder="Nama Karyawan"
            value={formData.nama}
            name="nama"
            onChange={handleChange}
          />
          <Input
            label="Email"
            placeholder="karyawan@email.com"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />

          <Row>
            <Col md={4}>
              <AtomSelect
                label="Departemen"
                name="departemen"
                value={formData.pemohon}
                onChange={handleChange}
                options={[
                  { value: "", label: "##Departemen##" },
                  { value: "IT", label: "IT" },
                  { value: "Keuangan", label: "Keuangan" },
                  { value: "HRD", label: "HRD" },
                ]}
              />
            </Col>
            <Col md={4}>
              <AtomSelect
                label="Jabatan"
                name="jabatan"
                value={formData.jabatan}
                onChange={handleChange}
                options={[
                  { value: "", label: "##Jabatan##" },
                  { value: "FE Developer", label: "FE Developer" },
                  { value: "BE Developer", label: "BE Developer" },
                  { value: "QA Engineer", label: "QA Engineer" },
                  {
                    value: "Payroll and Benefit Staff",
                    label: "Payroll and Benefit Staff",
                  },
                  { value: "Accounting Staff", label: "Accounting Staff" },
                ]}
              />
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Tanggal Masuk</Form.Label>
                <Form.Control
                  type="date"
                  name="tanggalMasuk"
                  value={formData.tanggalMasuk}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Foto</Form.Label>
                <Form.Control
                  type="file"
                  name="profileImage"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Control type="hidden" value="tanggalMasuk" name="password" />

          <Gap height={30} />

          <div className="d-flex justify-content-center">
            <AtomButton label="Tambah Data Karyawan" type="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddEmployee;
