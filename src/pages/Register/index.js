import React from "react";
import "./register.scss";
import { CompanyLogo } from "../../assets";
import { Gap, Input, AtomButton } from "../../components";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  return (
    <div className="">
      <header className=""></header>
      <Container className="mt-5 mb-5">
        <Row className="justify-content-md-center">
          <Col xs={10} sm={8} md={6} lg={4} xl={3} className="center mx-auto">
            <Image src={CompanyLogo} alt="Logo" className="logo-img" fluid />
          </Col>
        </Row>
      </Container>
      <Container className="">
        <Row className="justify-content-center">
          <Col xs={10} sm={8} md={6} lg={4} xl={3} className="center mx-auto">
            <Gap height={40} />
            <h2 className="text-center">Register</h2>
            <Gap height={20} />
            <Form>
              <Input label="Nama" placeholder="Nama" />
              <Input label="Email" placeholder="Email" />
              <Input label="Password" placeholder="Password" />
              <Gap height={30} />
              <div className="d-flex justify-content-center">
                <AtomButton label="Tambah User" />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
