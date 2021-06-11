import React from 'react';
import Header from "../components/Header";

const ecole = () => {
    return (

        <div className="bg-pyellow">
            <Header />
            <div className="container sm:mx-auto bg-pwhite max-w-screen-xl">
                <main className="bg-white pt-4 sm:px-48">
                    <h1> L'école théologique de Paris</h1>
                    <p className="pb-2">
                    Contenu à fournir par la colline st serge
                    </p>
                    <p className='pb-96'>
                    </p>
                </main>
            </div>
        </div>
    );
};

export default ecole;