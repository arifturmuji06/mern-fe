import React from "react";
import { Gap, Input, AtomButton } from "../../components";
import { Button, /*Container, Row, Col, Image, */ Form } from "react-bootstrap";
import Icon from "../../assets/icon/Index";

const AddRemunerasi = () => {
  return (
    <div className="content-container">
      <p>AddRemunerasi</p>
      <div className="mutasi-container">
        <h2>Tambah Data Remunerasi</h2>
        <Button
          variant="secondary"
          className="d-flex align-items-center view-button"
        >
          <Icon name="SquareArrowLeft" size="16" className="" />
        </Button>
        <Gap height={20} />
        <div>
          <Form>
            <Input label="Nama Produk" placeholder="Produk" />
            <Input label="Harga" placeholder="Harga" />
            <Form.Group className="mb-3">
              <Form.Label>Kategori</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Pilih Kategori</option>
                <option value="Conference">Conference</option>
                <option value="Book">Book</option>
                <option value="Nutrition">Nutrition</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gambar</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Gap height={30} />
            <div className="d-flex justify-content-center">
              <AtomButton label="Tambah" href="Tambah" />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddRemunerasi;
