import React from "react";
import Image from 'next/image'
import Bandeau from "../components/Bandeau";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="home">
      <Logo/>
      <Navbar />
      <Bandeau/>
     
    </div>
  );
};

export default Home;
