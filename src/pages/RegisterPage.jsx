import React from "react";
import Header from "../components/Header";
import Signup from "../components/Signup";

const RegisterPage = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <Signup />
    </div>
  );
};

export default RegisterPage;
