import React, { useState, useEffect } from "react";
import Link from 'next/link';



const Navigation = (props) => {

  const { nav } = props;

  const [handleChange, sethandleChange] = useState();
  const [handleSubmit, sethandleSubmit] = useState();
  const [value, setValue] = useState('/')




  return (



    <nav className="flex items-center justify-center flex-col bg-teal-500">
      <img className=""
        src="img/bandeau-st-serge.jpg" alt="bandeau-st-serge" />
      <ul class="flex border-b">
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>

        <li class="-mb-px mr-10">
          <Link href="/">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Accueil
            </a>
          </Link>
        </li>

        <div className='mr-20  hover-trigger relative'>
          <label>Colline</label>
          <div class="w-40 hover-target absolute top-8">
            <Link href="/nouvelles" >
              <a class="block text-teal-250 hover:text-black">
                Nouvelles
              </a>
            </Link>

            <Link href="/colline" >
              <a class="block text-teal-200 hover:text-black">
                La colline
              </a>
            </Link>


            <Link href="/photo" >
              <a class="block text-teal-200 hover:text-black ">
                Photos
              </a>
            </Link>

            <Link href="/actuelle" >
              <a class="block text-teal-200 hover:text-black ">
                Présence actuelle
              </a>
            </Link>
          </div>
        </div>

        <div className='mr-20  hover-trigger relative'>
          <label>L'histoire</label>
          <div class="w-60 hover-target absolute top-8">
            <Link href="/fondateur" >
              <a class="block text-teal-250 hover:text-black">
                Les fondateurs
              </a>
            </Link>

            <Link href="/personnalites" >
              <a class="block text-teal-200 hover:text-black">
                Les grandes personnalités
              </a>
            </Link>


            <Link href="/emigration" >
              <a class="block text-teal-200 hover:text-black ">
                Centre de l'émigration
              </a>
            </Link>

            <Link href="/liturgique" >
              <a class="block text-teal-200 hover:text-black ">
                La vie liturgique
              </a>
            </Link>
          </div>
        </div>


        <div className="mr-10">
          <Link href="/centreColline" >
            <a class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
             Le centre de la Colline
            </a>
          </Link>
        </div>

        <div className='mr-20  hover-trigger relative'>
          <label>Les travaux envisagés</label>
          <div class="w-40 hover-target absolute top-8">
            <Link href="/suivreProjet" >
              <a class="block text-teal-250 hover:text-black">
                Suivre le projet
              </a>
            </Link>
          </div>
        </div>

        <div className='mr-20  hover-trigger relative'>
          <label>Le financement</label>
          <div class="w-40 hover-target absolute top-8">
            <Link href="/don" >
              <a class="block text-teal-250 hover:text-black">
                Faire un don
              </a>
            </Link>
            <Link href="/leg" >
              <a class="block text-teal-250 hover:text-black">
                Faire un leg
              </a>
            </Link>
          </div>
        </div>

        <div>
          <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
        </div>
      </ul>
    </nav >
  );
};

export default Navigation;
