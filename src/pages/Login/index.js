import React, { useState } from "react";
import "./login.scss";
import { CompanyLogo } from "../../assets";
import { Gap, Input, AtomButton } from "../../components";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch("http://localhost:4000/v1/auth/login", {
      const response = await fetch(
        "https://remunerasi-api.onrender.com/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login gagal");

      login(data.user, data.token);

      if (data.user.role === "admin") {
        navigate("/");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      alert("Login gagal: " + error.message);
    }
  };

  return (
    <div className="">
      <header className=""></header>
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col xs={10} sm={8} md={6} lg={4} xl={3} className="center mx-auto">
            <Image src={CompanyLogo} alt="Logo" className="logo-img" fluid />
          </Col>
        </Row>
      </Container>
      <Container className="mb-5">
        <Row className="justify-content-center">
          <Col xs={10} sm={8} md={6} lg={4} xl={3} className="center mx-auto">
            <Gap height={40} />
            <h2 className="text-center">Login</h2>
            <Gap height={20} />
            <Form onSubmit={handleLogin}>
              <Input
                label="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Gap height={30} />
              <div className="d-flex justify-content-center">
                <AtomButton
                  label="Login"
                  type="submit"
                  className="d-flex align-items-center view-button"
                />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
