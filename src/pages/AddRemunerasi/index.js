import React, { useEffect, useState } from "react";
import {
  Gap,
  Input,
  AtomButton,
  HargaInput,
  AtomSelect,
} from "../../components";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { fetchDaftarKaryawanActive } from "../../services/Api";

const AddRemunerasi = () => {
  const { user, token, loading } = useAuth();
  const navigate = useNavigate();

  const [karyawan, setKaryawan] = useState([]);

  useEffect(() => {
    if (loading) return;

    const fetchData = async () => {
      try {
        const [karyawanRes] = await Promise.all([fetchDaftarKaryawanActive()]);
        setKaryawan(karyawanRes.data.data);
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
      }
    };

    fetchData();
  }, [loading, user, navigate]);

  const activeKaryawan = karyawan.map((item) => ({
    ...item,
    value: item._id,
    label: item.nama,
  }));
  const [formData, setFormData] = useState({
    namaProduk: "",
    harga: 0,
    pemohon: "",
    kategori: "",
    tanggal: "",
    deskripsi: "",
    status: "reimbursement process",
    gambarProduk: null,
    struk: null,
    proposal: null,
  });

  useEffect(() => {
    if (user?.role === "karyawan") {
      setFormData((prev) => ({ ...prev, pemohon: user._id || user.id }));
    }
  }, [user]);

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

  const handleHargaChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      harga: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const data = new FormData();
      data.append("nama", formData.namaProduk);
      data.append("jumlah", formData.harga);
      data.append("periode", new Date().getFullYear());
      data.append("jenis", formData.kategori);
      data.append("tanggalPembelian", formData.tanggal);
      data.append("keterangan", formData.deskripsi);
      data.append("userId", formData.pemohon);

      if (formData.gambarProduk) {
        data.append("gambar", formData.gambarProduk);
      }
      if (formData.struk) {
        data.append("buktiPembelian", formData.struk);
      }
      if (formData.kategori === "Conference" && formData.proposal) {
        data.append("proposal", formData.proposal);
      }

      const res = await fetch(
        "https://remunerasi-api.onrender.com/v1/remunerasi",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const resData = await res.json();

      if (!res.ok)
        throw new Error(resData.message || "Gagal membuat remunerasi");

      // Show success alert
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/remunerasi");
      }, 3000);
    } catch (err) {
      alert("❌ Gagal submit data: " + err.message);
      console.error(err);
    }
  };

  return (
    <div className="content-container">
      <div className="mutasi-container">
        <h2>Tambah Data Remunerasi</h2>
        <AtomButton
          to="/remunerasi"
          icon="SquareArrowLeft"
          iconPosition="start"
          className="d-flex align-items-center view-button"
          variant="secondary"
        />

        <Gap height={20} />

        {showAlert && (
          <Alert variant="success">🎉 Data berhasil ditambahkan!</Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Input
            label="Nama Produk"
            placeholder="Nama Produk"
            value={formData.namaProduk}
            name="namaProduk"
            onChange={handleChange}
          />

          <Row>
            <Col md={6}>
              <HargaInput onChange={handleHargaChange} />
            </Col>
            <Col md={6}>
              {user?.role === "karyawan" ? (
                <>
                  <Form.Group>
                    <Form.Label>Pemohon</Form.Label>
                    <Form.Control type="text" value={user?.nama} disabled />
                  </Form.Group>
                  <input
                    type="hidden"
                    name="pemohon"
                    value={user?._id || user?.id}
                  />
                </>
              ) : (
                <AtomSelect
                  label="Pemohon"
                  name="pemohon"
                  value={formData.pemohon}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "##Pemohon##" },
                    ...activeKaryawan,
                  ]}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <AtomSelect
                label="Kategori"
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                options={[
                  { value: "", label: "##Kategori##" },
                  { value: "Book", label: "Book" },
                  { value: "Conference", label: "Conference" },
                  { value: "Nutrition", label: "Nutrition" },
                ]}
              />
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tanggal Pembelian</Form.Label>
                <Form.Control
                  type="date"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Gambar Produk</Form.Label>
                <Form.Control
                  type="file"
                  name="gambarProduk"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Struk Pembelian</Form.Label>
                <Form.Control
                  type="file"
                  name="struk"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>

            {formData.kategori === "Conference" && (
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Proposal</Form.Label>
                  <Form.Control
                    type="file"
                    name="proposal"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Col>
            )}
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              placeholder="Deskripsikan pembelian..."
            />
          </Form.Group>

          <Form.Control
            type="hidden"
            value="reimbursement process"
            name="status"
          />

          <Gap height={30} />

          <div className="d-flex justify-content-center">
            <AtomButton label="Tambah Data" type="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddRemunerasi;
