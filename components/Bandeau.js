import React from 'react';

const Bandeau = () => {
    return (
        <div className="bandeau">
            <div className="flex items-center justify-center container sm:mx-auto bg-pwhite max-w-screen-xl ">
                <img className="flex sm:items-center "
                    src="../img/bandeau-st-serge.jpg" alt="bandeau-st-serge" />
            </div>
        </div>
    );
};

export default Bandeau;