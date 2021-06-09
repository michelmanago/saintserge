import React from "react";
import Link from 'next/link';

const Navigation = () => {
  return (
    <div className="navigation">
      <Link  href="/"><a>Accueil</a>
       
      </Link>
      
      <Link href="/colline" >
        <a> La colline</a>
      </Link>
      
      <Link href="/histoire" >
        <a> L'histoire</a>
      </Link>
      
      <Link href="/centenaireColline" >
        <a> Le centenaire de la Colline</a>
      </Link>
      
      <Link href="/travaux" >
        <a> Les travaux envisagés</a>
      </Link>
      <Link href="/financement" >
        <a> Le financement</a>
      </Link>

    </div>
  );
};

export default Navigation;
