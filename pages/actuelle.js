import React from 'react';
import Header from "../components/Header";

const actuelle = () => {
    return (
       
        <div className="actuelle">
             <Header />
            <div className="bg-pyellow">
                <div className="container sm:mx-auto bg-pwhite max-w-screen-xl">
                    <main className="bg-white pt-4 sm:px-48">
                    <h1>Présence actuelle</h1>
                        <p className="pb-2">
                            Page a rempli 
                        </p>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default actuelle;