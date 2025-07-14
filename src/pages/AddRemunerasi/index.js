// import React from "react";
// import { Gap, Input, AtomButton, HargaInput } from "../../components";
// import { Button, Form, Row, Col } from "react-bootstrap";
// import Icon from "../../assets/icon/Index";

// const AddRemunerasi = () => {
//   return (
//     <div className="content-container">
//       <div className="mutasi-container">
//         <h2>Tambah Data Remunerasi</h2>
//         <Button
//           variant="secondary"
//           className="d-flex align-items-center view-button"
//         >
//           <Icon name="SquareArrowLeft" size="16" className="" />
//         </Button>
//         <Gap height={20} />
//         <div>
//           <Form>
//             <Input label="Nama Produk" placeholder="Nama Produk" />

//             <Row>
//               <Col md={6}>
//                 <HargaInput
//                   onChange={(value) => console.log("Harga int:", value)}
//                 />
//               </Col>
//               {/* <Col md={6}>
//                 <Input label="Harga" placeholder="Rp." />
//               </Col> */}
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Pemohon</Form.Label>
//                   <Form.Select aria-label="Default select example">
//                     <option>##Pemohon##</option>
//                     <option value="Conference">Arif Turmuji</option>
//                     <option value="Book">Anisa Fauziah</option>
//                     <option value="Nutrition">Meri Kurnia</option>
//                     <option value="Nutrition">Rahmat Hidayatullah</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group className="mb-3">
//               <Form.Label>Kategori</Form.Label>
//               <Form.Select aria-label="Default select example">
//                 <option>##Pilih Kategori##</option>
//                 <option value="Book">Book</option>
//                 <option value="Conference">Conference</option>
//                 <option value="Nutrition">Nutrition</option>
//               </Form.Select>
//             </Form.Group>

//             {/* 🗓️ Tanggal Pembelian */}
//             <Form.Group className="mb-3">
//               <Form.Label>Tanggal Pembelian</Form.Label>
//               <Form.Control type="date" />
//             </Form.Group>

//             {/* 📄 Deskripsi */}
//             <Form.Group className="mb-3">
//               <Form.Label>Deskripsi</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Deskripsikan pembelian..."
//               />
//             </Form.Group>

//             {/* 🔒 Hidden Status Input */}
//             <Form.Control
//               type="hidden"
//               value="reimbursement process"
//               name="status"
//             />

//             <Row>
//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Gambar Produk</Form.Label>
//                   <Form.Control type="file" />
//                 </Form.Group>
//               </Col>

//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Struk Pembelian</Form.Label>
//                   <Form.Control type="file" />
//                 </Form.Group>
//               </Col>

//               <Col md={4}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Proposal</Form.Label>
//                   <Form.Control type="file" />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Gap height={30} />

//             <div className="d-flex justify-content-center">
//               <AtomButton label="Tambah Data" href="Tambah Data" />
//             </div>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddRemunerasi;

import React, { useState } from "react";
import {
  Gap,
  Input,
  AtomButton,
  HargaInput,
  AtomSelect,
} from "../../components";
import { Form, Row, Col, Alert } from "react-bootstrap";

const AddRemunerasi = () => {
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
        <h2>Tambah Data Remunerasi</h2>
        <AtomButton
          to="/remunerasi"
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
              <AtomSelect
                label="Pemohon"
                name="pemohon"
                value={formData.pemohon}
                onChange={handleChange}
                options={[
                  { value: "", label: "##Pemohon##" },
                  { value: "Arif Turmuji", label: "Arif Turmuji" },
                  { value: "Anisa Fauziah", label: "Anisa Fauziah" },
                  { value: "Meri Kurnia", label: "Meri Kurnia" },
                  {
                    value: "Rahmat Hidayatullah",
                    label: "Rahmat Hidayatullah",
                  },
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
