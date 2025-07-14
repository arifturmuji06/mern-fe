import React from "react";
import { Gap } from "../../components";
import { Row, Col, Button, Pagination, Image } from "react-bootstrap";
import "./profile.scss";

import Icon from "../../assets/icon/Index";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  return (
    <div className="content-container">
      <div className="mutasi-container">
        <h2 className="mb-4">Profile Karyawan</h2>
        {/* <div className="mutasi-header profile-header"> */}
        <div className="periode-info profile-info">
          <div className="table-wrapper">
            <table className="table profile-info">
              {/* <h4 className="m-2">Profile</h4> */}
              <tbody>
                <tr>
                  <td rowSpan="6" className="td-aksi">
                    <div className="image-holder-profile d-flex justify-items-center align-center">
                      <Image
                        src="https://placehold.co/300x400?text=Hello\nWorld"
                        fluid
                      />
                    </div>
                  </td>
                  <td>Nama</td>
                  <td className="devider">:</td>
                  <td>
                    <strong>Arif Turmuji</strong>
                  </td>
                </tr>
                <tr>
                  <td>Departemen</td>
                  <td className="devider">:</td>
                  <td>
                    <strong>IT</strong>
                  </td>
                </tr>
                <tr>
                  <td>Jabatan</td>
                  <td className="devider">:</td>
                  <td>
                    <strong>Senior Front End Developer</strong>
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td className="devider">:</td>
                  <td>
                    <strong>arifturmuji@gmail.com</strong>
                  </td>
                </tr>
                <tr>
                  <td>Kontak</td>
                  <td className="devider">:</td>
                  <td>
                    <strong>082-3456-7890</strong>
                  </td>
                </tr>
                <tr>
                  <td>Tahun Masuk</td>
                  <td className="devider">:</td>
                  <td>
                    <strong>6/15/2018</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* <Gap height={20} /> */}
        {/* <div> */}
        {/* <h4>Pengguunaan Budget 2025</h4>
          <Gap height={20} />
          <Row>
            <Col md={4}>
              <div className="mutasi-header budget-card profile-card conference-card">
                <div className="rekening-info">
                  <h6>Conference Budget</h6>
                  <h5>
                    <strong>Rp2.000.000,00</strong>
                  </h5>
                  <p>Saldo : Rp3.000.000,00</p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="mutasi-header budget-card profile-card nutrition-card">
                <div className="rekening-info">
                  <h6>Nutrition Budget</h6>
                  <h5>
                    <strong>Rp3.250.000,00</strong>
                  </h5>
                  <p>Saldo : Rp2.750.000,00</p>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="mutasi-header budget-card profile-card book-card">
                <div className="rekening-info">
                  <h6>Book Budget</h6>
                  <h5>
                    <strong>Rp0,00</strong>
                  </h5>
                  <p>Saldo : Rp2.500.000,00</p>
                </div>
              </div>
            </Col>
          </Row> */}
        {/* </div> */}
        {/* </div> */}
      </div>
      <Gap height={20} />
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
                      <td>Nama Karyawan</td>
                      <td className="devider">:</td>
                      <td>
                        <strong>Arif Turmuji</strong>
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
                  <th>Nama Barang</th>
                  <th>Harga</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>22-12-2023</td>
                  <td>Harry Potter</td>
                  <td>1,200,000.00-</td>
                  <td>Approved</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>22-12-2023</td>
                  <td>Harry Potter</td>
                  <td>1,200,000.00-</td>
                  <td>Approved</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>22-12-2023</td>
                  <td>Harry Potter</td>
                  <td>1,200,000.00-</td>
                  <td>Approved</td>
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
            <h4 className="mb-4">Akses Cepat</h4>
            <div className="align-items-center justify-content download-section">
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
                <Icon name="Download" size="16" className="me-2" /> Unduh
                Riwayat Remunerasi
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Gap height={20} />
    </div>
  );
};

export default Profile;
