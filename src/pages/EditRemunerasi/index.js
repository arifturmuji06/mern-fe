import React, { useEffect, useState } from "react";
import {
  Gap,
  Input,
  AtomButton,
  HargaInput,
  AtomSelect,
} from "../../components";
import { Form, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { fetchDaftarKaryawanActive, fetchRemunById } from "../../services/Api";

const EditRemunerasi = () => {
  const { user, token, loading } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [karyawan, setKaryawan] = useState([]);
  const [pemohonLama, setPemohonLama] = useState(null);
  const [formData, setFormData] = useState({
    namaProduk: "",
    harga: 0,
    pemohon: "",
    kategori: "",
    tanggal: "",
    deskripsi: "",
    gambarProduk: null,
    struk: null,
    proposal: null,
    periode: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    if (user?.role !== "admin") {
      navigate("/remunerasi", { replace: true });
      return;
    }

    const fetchData = async () => {
      try {
        const karyawanRes = await fetchDaftarKaryawanActive();
        const remunByIdRes = await fetchRemunById(id);

        setKaryawan(karyawanRes.data.data);

        const remun = remunByIdRes.data.data;

        setFormData({
          namaProduk: remun.nama || "",
          harga: remun.jumlah || 0,
          pemohon: remun.pemohon?._id || "",
          kategori: remun.jenis || "",
          tanggal: remun.tanggalPembelian
            ? remun.tanggalPembelian.split("T")[0]
            : "",
          deskripsi: remun.keterangan || "",
          gambarProduk: null,
          struk: null,
          proposal: null,
          periode: remun.periode,
        });
        setPemohonLama(remun.pemohon?.nama || null);
      } catch (err) {
        console.error("Gagal mengambil data remunerasi:", err);
      }
    };

    fetchData();
  }, [loading, user, navigate, id]);

  const activeKaryawan = karyawan.map((item) => ({
    ...item,
    value: item._id,
    label: item.nama,
  }));

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

    try {
      const data = new FormData();
      data.append("nama", formData.namaProduk);
      data.append("jumlah", formData.harga);
      data.append("periode", formData.periode);
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
        `https://remunerasi-api.onrender.com/v1/remunerasi/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const resData = await res.json();

      if (!res.ok)
        throw new Error(resData.message || "Gagal mengupdate remunerasi");

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
        <h2>Rubah Data Remunerasi</h2>
        <AtomButton
          to="/remunerasi"
          icon="SquareArrowLeft"
          iconPosition="start"
          className="d-flex align-items-center view-button"
          variant="secondary"
        />

        <Gap height={20} />

        {showAlert && <Alert variant="success">🎉 Data berhasil diubah!</Alert>}

        <Form onSubmit={handleSubmit}>
          <Input
            label="Nama Produk"
            value={formData.namaProduk}
            name="namaProduk"
            onChange={handleChange}
          />

          <Row>
            <Col md={6}>
              <HargaInput value={formData.harga} onChange={handleHargaChange} />
            </Col>
            <Col md={6}>
              <AtomSelect
                label="Pemohon"
                name="pemohon"
                value={formData.pemohon}
                onChange={handleChange}
                options={[
                  pemohonLama
                    ? {
                        value: formData.pemohon,
                        label: `Pemohon lama: ${pemohonLama}`,
                      }
                    : { value: "", label: "Pilih Pemohon" },
                  ...activeKaryawan,
                ]}
              />
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

          <Gap height={30} />

          <div className="d-flex justify-content-center">
            <AtomButton label="Update Data" type="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditRemunerasi;
