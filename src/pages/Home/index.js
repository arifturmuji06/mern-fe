import React from "react";
import { Gap } from "../../components";
import { Row, Col, Button, Dropdown, Pagination } from "react-bootstrap";

import Icon from "../../assets/icon/Index";
import "./home.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="content-container">
      <div className="mutasi-container">
        <h2 className="mb-4">Penggunaan Anggaran 2025</h2>
        <Row>
          {/* <Row>
          <Col md={4}> */}
          <Col md={3}>
            <div className="mutasi-header budget-card conference-card">
              <div className="rekening-info">
                <h6>Conference Budget</h6>
                <h4>
                  <strong>Rp. 13.500.000</strong>
                </h4>
                <p>Saldo : Rp. 51.500.000</p>
              </div>
            </div>
            <Gap height={10} />
            {/* </Col>
          <Col md={4}> */}
            <div className="mutasi-header budget-card nutrition-card">
              <div className="rekening-info">
                <h6>Nutrition Budget</h6>
                <h4>
                  <strong>Rp. 26.500.000</strong>
                </h4>
                <p>Saldo : Rp. 63.500.000</p>
              </div>
            </div>
            <Gap height={10} />
            {/* </Col>
          <Col md={4}> */}
            <div className="mutasi-header budget-card book-card">
              <div className="rekening-info">
                <h6>Book Budget</h6>
                <h4>
                  <strong>Rp. 2.300.000</strong>
                </h4>
                <p>Saldo : Rp. 35.200.000</p>
              </div>
            </div>
            {/* </Col>
        </Row> */}
          </Col>
          <Col md={9}>
            <div className="mutasi-header">
              <div className="periode-info">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Tahun Periode</td>
                      <td className="devider">:</td>
                      <td>
                        <strong>2025</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Total Karyawan</td>
                      <td className="devider">:</td>
                      <td>
                        <strong>15</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Total Remunerasi</td>
                      <td className="devider">:</td>
                      <td>
                        <strong>Rp202.500.000,00</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Total Penggunaan</td>
                      <td className="devider">:</td>
                      <td>
                        <strong>00.00</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Saldo riil awal per 1-12-2025</td>
                      <td className="devider">:</td>
                      <td>
                        <strong>Rp202.500.000,00</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>Saldo riil akhir per 31-12-2025</td>
                      <td className="devider">:</td>
                      <td>
                        <strong>Rp160.200.000,00</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* <p>
                <strong>Periode</strong>: 22-12-2023 s/d 22-12-2023
              </p>
              <p>
                <strong>Total Debet (Dalam Periode)</strong>: 1,200,000.00-
              </p>
              <p>
                <strong>Total Kredit (Dalam Periode)</strong>: 0.00
              </p>
              <p>
                <strong>Saldo riil awal per 22-12-2023</strong>: 960,480,789.00
              </p>
              <p>
                <strong>Saldo riil akhir per 22-12-2023</strong>: 959,280,789.00
              </p> */}
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Gap height={20} />
      <Row>
        <Col md={6}>
          <div className="mutasi-container sub-mutasi-container">
            <h4 className="mb-4">Remunerasi Terbaru</h4>
            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Nama Karyawan</th>
                  <th>Nama Barang</th>
                  <th>Harga</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>22-12-2023</td>
                  <td>Arif Turmji</td>
                  <td>Harry Potter</td>
                  <td>1,200,000.00-</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>22-12-2023</td>
                  <td>Arif Turmji</td>
                  <td>Harry Potter</td>
                  <td>1,200,000.00-</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>22-12-2023</td>
                  <td>Arif Turmji</td>
                  <td>Harry Potter</td>
                  <td>1,200,000.00-</td>
                </tr>
              </tbody>
            </table>
            <Row xs="auto">
              <Col>
                <Pagination>
                  <Pagination.First />
                  <Pagination.Prev />
                  <Pagination.Item>1</Pagination.Item>
                  <Pagination.Item>2</Pagination.Item>
                  <Pagination.Item>3</Pagination.Item>
                  <Pagination.Next />
                  <Pagination.Last />
                </Pagination>
              </Col>
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    href="/remunerasi"
                    variant="secondary"
                    className="print-button"
                  >
                    <Icon name="ArrowRight" size="16" className="me-2" /> Lihat
                    Semua
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={6}>
          <div className="mutasi-container sub-mutasi-container">
            <h4 className="mb-4">Daftar Karyawan</h4>
            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>RAHMAT HIDAYATULLAH</td>
                  <td>arif@gmail.com</td>
                  <td className="td-aksi">
                    <div className="d-flex align-items-center justify-content-center action-section">
                      <Button
                        variant="primary"
                        className="d-flex align-items-center view-button"
                      >
                        <Icon name="Eye" size="16" className="" />
                      </Button>
                      <Button
                        variant="warning"
                        className="d-flex align-items-center view-button"
                      >
                        <Icon name="Wrench" size="16" className="" />
                      </Button>
                      <Button
                        variant="danger"
                        className="d-flex align-items-center view-button"
                      >
                        <Icon name="Trash" size="16" className="" />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>RAHMAT HIDAYATULLAH</td>
                  <td>arif@gmail.com</td>
                  <td className="td-aksi">
                    <div className="d-flex align-items-center justify-content-center action-section">
                      <Button
                        variant="primary"
                        className="d-flex align-items-center view-button"
                      >
                        <Icon name="Eye" size="16" className="" />
                      </Button>
                      <Button
                        variant="warning"
                        className="d-flex align-items-center view-button"
                      >
                        <Icon name="Wrench" size="16" className="" />
                      </Button>
                      <Button
                        variant="danger"
                        className="d-flex align-items-center view-button"
                      >
                        <Icon name="Trash" size="16" className="" />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>RAHMAT HIDAYATULLAH</td>
                  <td>arif@gmail.com</td>
                  <td className="td-aksi">
                    <div className="d-flex align-items-center justify-content-center action-section">
                      <Button
                        variant="primary"
                        className="d-flex align-items-center view-button"
                      >
                        <Icon name="Eye" size="16" className="" />
                      </Button>
                      <Button
                        variant="warning"
                        className="d-flex align-items-center view-button"
                      >
                        <Icon name="Wrench" size="16" className="" />
                      </Button>
                      <Button
                        variant="danger"
                        className="d-flex align-items-center view-button"
                      >
                        <Icon name="Trash" size="16" className="" />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <Row xs="auto">
              <Col>
                <Pagination>
                  <Pagination.First />
                  <Pagination.Prev />
                  <Pagination.Item>1</Pagination.Item>
                  <Pagination.Item>2</Pagination.Item>
                  <Pagination.Item>3</Pagination.Item>
                  <Pagination.Next />
                  <Pagination.Last />
                </Pagination>
              </Col>
              <Col>
                <div className="d-flex justify-content-between align-items-center ">
                  <Button
                    href="/employee"
                    variant="secondary"
                    className="print-button"
                  >
                    <Icon name="ArrowRight" size="16" className="me-2" /> Lihat
                    Semua
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Gap height={20} />
      <Row>
        <Col md={6}>
          <div className="mutasi-container sub-mutasi-container">
            <h4 className="mb-4">Riwayat Remunerasi</h4>
            {/* Bagian Download */}
            <div className="d-flex justify-content-between align-items-center mt-4 download-section">
              <div className="d-flex align-items-center">
                <span className="me-2">Tahun Periode</span>
                <Dropdown className="me-3">
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    2024
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">2024</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">2023</Dropdown.Item>
                    <Dropdown.Item href="#/action-1">2022</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">2021</Dropdown.Item>
                    <Dropdown.Item href="#/action-1">2020</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">2019</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            <table className="table table-bordered table-fit mt-2">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Nama Karyawan</th>
                  <th>Nama Barang</th>
                  <th>Harga</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>22-12-2023</td>
                  <td>Arif Turmji</td>
                  <td>Harry Potter</td>
                  <td>1,200,000.00-</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>22-12-2023</td>
                  <td>Arif Turmji</td>
                  <td>Harry Potter</td>
                  <td>1,200,000.00-</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>22-12-2023</td>
                  <td>Arif Turmji</td>
                  <td>Harry Potter</td>
                  <td>1,200,000.00-</td>
                </tr>
              </tbody>
            </table>
            <Row xs="auto">
              <Col>
                <Pagination>
                  <Pagination.First />
                  <Pagination.Prev />
                  <Pagination.Item>1</Pagination.Item>
                  <Pagination.Item>2</Pagination.Item>
                  <Pagination.Item>3</Pagination.Item>
                  <Pagination.Next />
                  <Pagination.Last />
                </Pagination>
              </Col>
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    href="/remunerasi-history"
                    variant="secondary"
                    className="print-button"
                  >
                    <Icon name="ArrowRight" size="16" className="me-2" /> Lihat
                    Semua
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={6}>
          <div className="mutasi-container sub-mutasi-container">
            <h4 className="mb-4">Akses Cepat</h4>
            <div className="align-items-center justify-content download-section">
              <Button
                variant="secondary"
                className="d-flex align-items-center mb-2 akses-cepat"
              >
                <Icon name="Plus" size="16" className="me-2" /> Tambah Karyawan
              </Button>
              <Button
                variant="secondary"
                className="d-flex align-items-center mb-2 akses-cepat"
              >
                <Icon name="Plus" size="16" className="me-2" /> Tambah
                Remunerasi
              </Button>
              <Button
                variant="secondary"
                className="d-flex align-items-center mb-2 akses-cepat"
              >
                <Icon name="Download" size="16" className="me-2" /> Unduh Data
                Karyawan
              </Button>
              <Button
                variant="secondary"
                className="d-flex align-items-center mb-2 akses-cepat"
              >
                <Icon name="Download" size="16" className="me-2" /> Unduh
                Riwayat Remunerasi
              </Button>
            </div>
            {/* <div className="d-flex align-items-center justify-content download-section">
              <Button
                variant="primary"
                className="d-flex align-items-center print-button"
              >
                <Icon name="UserPlus" size="16" className="me-2" /> Tambah
                Karyawan
              </Button>

              <Button
                variant="success"
                className="d-flex align-items-center download-button"
              >
                <Icon name="Download" size="16" className="me-2" /> Download
              </Button>
            </div> */}
            {/* <Row>
              <Col xs={12} md={6}>
                <div className="d-flex align-items-center justify-content download-section">
                  <Button
                    variant="primary"
                    className="d-flex align-items-center print-button"
                  >
                    <Icon name="UserPlus" size="16" className="me-2" /> Tambah
                    Karyawan
                  </Button>

                  <Button
                    variant="success"
                    className="d-flex align-items-center download-button"
                  >
                    <Icon name="Download" size="16" className="me-2" /> Download
                  </Button>
                </div>
              </Col>
              <Col xs={6} md={6}>
                <div className="d-flex align-items-center justify-content download-section">
                  <Button
                    variant="primary"
                    className="d-flex align-items-center print-button"
                  >
                    <Icon name="UserPlus" size="16" className="me-2" /> Tambah
                    Karyawan
                  </Button>

                  <Button
                    variant="success"
                    className="d-flex align-items-center download-button"
                  >
                    <Icon name="Download" size="16" className="me-2" /> Download
                  </Button>
                </div>
              </Col>
            </Row> */}
          </div>
        </Col>
      </Row>
      <Gap height={20} />
    </div>
  );
};

export default Home;
