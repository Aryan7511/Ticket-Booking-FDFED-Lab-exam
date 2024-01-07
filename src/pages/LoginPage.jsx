import React from "react";
import Login from "../components/Login";
import Header from "../components/Header";

const LoginPage = () => {
  return (
    <div>
      <Header activeHeading={4} />
      <Login />
    </div>
  );
};

export default LoginPage;
