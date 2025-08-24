import React, { useEffect, useState } from "react";
import { Gap, Input, AtomButton, AtomSelect } from "../../components";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { fetchKaryawanById } from "../../services/Api";

const EditEmployee = () => {
  const { user, token, loading } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nama: "",
    departemen: "",
    jabatan: "",
    kontak: "",
    tahunMasuk: "",
    profilePicture: null,
  });

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    if (user.role !== "admin") {
      navigate("/profile", { replace: true });
    }

    const fetchData = async () => {
      try {
        const userDataRes = await fetchKaryawanById(id);
        const userData = userDataRes.data.data;

        setFormData({
          nama: userData.nama || "",
          departemen: userData.departemen || "",
          jabatan: userData.jabatan || "",
          kontak: userData.kontak || "",
          tahunMasuk: userData.tahunMasuk
            ? userData.tahunMasuk.split("T")[0]
            : "",
          profilePicture: null,
        });
      } catch (err) {
        console.error("Gagal mengambil data profil:", err);
      }
    };

    fetchData();
  }, [loading, user, navigate, id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("nama", formData.nama);
      data.append("departemen", formData.departemen);
      data.append("jabatan", formData.jabatan);
      data.append("kontak", formData.kontak);
      data.append("tahunMasuk", formData.tahunMasuk);

      if (formData.profilePicture) {
        data.append("profilePicture", formData.profilePicture);
      }

      const res = await fetch(
        `https://remunerasi-api.onrender.com/v1/users/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || "Gagal update data");

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/employee");
      }, 2000);
    } catch (err) {
      alert("❌ Gagal submit data: " + err.message);
      console.error(err);
    }
  };

  return (
    <div className="content-container">
      <div className="mutasi-container">
        <h2>Rubah Data Karyawan</h2>
        <AtomButton
          to="/employee"
          icon="SquareArrowLeft"
          iconPosition="start"
          className="d-flex align-items-center view-button"
          variant="secondary"
        />

        <Gap height={20} />

        {showAlert && <Alert variant="success">🎉 Data berhasil diubah!</Alert>}

        <Form onSubmit={handleSubmit}>
          <Input
            label="Nama Karyawan"
            placeholder="Nama Karyawan"
            value={formData.nama}
            name="nama"
            onChange={handleChange}
          />
          <Row>
            <Col md={4}>
              <AtomSelect
                label="Departemen"
                name="departemen"
                value={formData.departemen}
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
                  name="tahunMasuk"
                  value={formData.tahunMasuk}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Input
                label="Kontak"
                placeholder="+62"
                value={formData.kontak}
                name="kontak"
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Foto</Form.Label>
                <Form.Control
                  type="file"
                  name="profilePicture"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Gap height={30} />

          <div className="d-flex justify-content-center">
            <AtomButton label="Simpan Perubahan" type="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditEmployee;
