import React from 'react';
import Logo from "../components/Logo";
import Header from "../components/Header";


const colline = () => {
  return (
    <div className="colline">
      <Header />
      <div className="actuelle">
            <div className="bg-pyellow">
                <div className="container sm:mx-auto bg-pwhite max-w-screen-xl">
                    <main className="bg-white pt-4 sm:px-48">
                    <h1>La colline</h1>
                    <h1>Présence actuelle</h1>
                        <p className="pb-2">
                        Contenu à fournir par la colline st serge
                        </p>
                        <p className='pb-64'>
                        </p>
                    </main>
                </div>
            </div>
        </div>
      
    </div>
  );
};

export default colline;