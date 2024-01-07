import React from "react";
import Header from "../components/Header";
import Search from "../components/Search";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Search />
    </div>
  );
};

export default HomePage;
