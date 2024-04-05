import React, { useEffect } from "react";
import { Col, Row } from "antd";
import StaticUI from "./StaticUI";
import "./css/login.scss";
import GoogleSignin from "./GoogleSignin";
import { useNavigate } from "react-router-dom";

function Login() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!!accessToken) {
      navigate("/");
    }
  });

  return (
    <>
      <Row className="row">
        <Col span={12} className="col1">
          <GoogleSignin />
        </Col>
        <Col span={12} className="col2">
          <StaticUI />
        </Col>
      </Row>
    </>
  );
}

export default Login;
