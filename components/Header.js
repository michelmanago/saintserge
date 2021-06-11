import React from 'react';
import Image from 'next/image'
import Bandeau from "../components/Bandeau";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
const Header = () => {
    return (
        <div className="header">
            <Logo />
            <Navbar />
            <Bandeau />

            
        </div>
    );
};

export default Header;