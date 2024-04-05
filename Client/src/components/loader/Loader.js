import React from "react";
import "./loader.scss";
import { Spin } from "antd";

function Loader() {
  return (
    <div className="global-loader">
      <Spin></Spin>
    </div>
  );
}

export default Loader;
