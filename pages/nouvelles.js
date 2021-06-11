import React from "react";
import Image from 'next/image'
import Bandeau from "../components/Bandeau";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";


const Nouvelles = () => {
    return (

        <div className="nouvelles">
            <Logo />
            <Navbar />
            <Bandeau />
            <div className="bg-pyellow">
                <div className="container sm:mx-auto bg-pwhite max-w-screen-xl">
                    <main className="bg-white pt-4 sm:px-48">
                        <h2 className="titre">Nouvelles</h2>

                        <p className="pb-2">
                        Contenu à fournir par la colline st serge. </p>
                        <p className='pb-64'>
                        </p>
                        
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Nouvelles;