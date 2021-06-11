import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  .sub-nav {
    position: absolute;
    top: 1.5rem;
  }
  .sub-sub-nav {
    position: absolute;
    top: 0px;
    left: 10rem;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #3C4A87;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    top: 0;
    left: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
    .sub-nav {
      position: initial;
      margin-left: 1.5rem;
    }
    .sub-sub-nav {
      position: initial;
      margin-left: 2rem;
    }
  }
`;

const LeftNav = ({ open }) => {
  const [isOpenArray, setIsOpenArray] = useState([false, false, false, false]);
  const [isSubNavOpen, setIsSubNavOpen] = useState([[false], [false, false, false, false], [], []])

  const openMenu = (menuId) => {
    var newArray = isOpenArray.slice();
    for (let index = 0; index < newArray.length; index++) {
      if (index === menuId)
        newArray[index] = !newArray[index]
      else
        newArray[index] = false;

    }
    setIsOpenArray(newArray);
  }

  const openSubMenu = (menuId, subMenuId) => {
    var newArray = isSubNavOpen.slice();
    var newSubArray = newArray[menuId];
    for (let index = 0; index < newSubArray.length; index++) {

      if (index === subMenuId)
        newSubArray[index] = !newSubArray[index];
      else
        newSubArray[index] = false;
    }
    setIsSubNavOpen(newArray);
  }
  return (

    <nav className="flex items-center justify-center ">
      <div className="flex sm:items-center">
        <Ul open={open} className="">

          <div className='  mr-20  hover-trigger relative'>
            <label onClick={() => openMenu(0)}>Colline ▼</label>
            <div className={`w-44 sub-nav bg-pblue ${isOpenArray[0] ? 'open' : 'close'}`}>
              <Link href="/nouvelles" >
                <a className="ml-1  block text-teal-250 ">
                  Nouvelles
              </a>
              </Link>

              <Link href="/colline" >
                <a className=" ml-1 block text-teal-200 ">
                  La colline
              </a>
              </Link>


              <div className='hover-sub-trigger relative'>
                <Link href="/photo" >
                  <a className="ml-1 block text-teal-200  ">
                    Photos
                </a>
                </Link>
              </div>


              <div className="hover-sub-trigger relative">
                <label className="ml-1  block text-teal-200" onClick={() => openSubMenu(0, 0)}>
                  Présence actuelle ▼
                </label>

                <div className={`w-44 ml-4 sub-sub-nav bg-pblue ${isSubNavOpen[0][0] ? 'open' : 'close'}`}>
                  <Link href="/ito" >
                    <a className="ml-1 block text-teal-200  ">
                      ITO
                    </a>
                  </Link>
                  <Link href="/paroisse" >
                    <a className="ml-1 block text-teal-200  ">
                      Paroisse
                  </a>
                  </Link>
                  <Link href="/salleDiocésaine" >
                    <a className="ml-1 block text-teal-200  ">
                      Salle diocésaine
                   </a>
                  </Link>
                  <Link href="/eglise" >
                    <a className="ml-1 block text-teal-200  ">
                      Eglise
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>



          <div className='mr-20  hover-trigger relative'>
            <label onClick={() => openMenu(1)}>L'histoire ▼</label>
            <div className={`w-52 sub-nav bg-pblue ${isOpenArray[1] ? 'open' : 'close'}`}>

              <div className="w-48  hover-sub-trigger relative bg-pblue">
                <label className="ml-1 block text-teal-200" onClick={() => openSubMenu(1, 0)}>
                  Les fondateurs ▼
                </label>

                <div className={`w-48 ml-11 sub-sub-nav bg-pblue ${isSubNavOpen[1][0] ? 'open' : 'close'}`}>
                  <Link href="/mgrEuloge" >
                    <a className="ml-1 block text-teal-200  ">
                      Mgr Euloge
                  </a>
                  </Link>
                  <Link href="/mmOssorguine" >
                    <a className="ml-1 block text-teal-200  ">
                      MM Ossorguine
                  </a>
                  </Link>

                </div>
              </div>

              <div className="hover-sub-trigger relative bg-pblue">
                <a className="ml-1  block text-teal-200" onClick={() => openSubMenu(1, 1)}>
                  Les grandes personnalites ▼
                </a>

                <div className={`w-44 ml-11 sub-sub-nav bg-pblue ${isSubNavOpen[1][1] ? 'open' : 'close'}`}>
                  <Link href="/sergeBoulgakoff" >
                    <a className="ml-1 block text-teal-200  ">
                      P Serge Boulgakoff
                  </a>
                  </Link>
                  <Link href="/mgrCassien" >
                    <a className="ml-1 block text-teal-200  ">
                      Mgr Cassien
                  </a>
                  </Link>
                </div>
              </div>


              <div className="w-52 hover-sub-trigger relative bg-pblue">
                <a className="ml-1 block text-teal-200" onClick={() => openSubMenu(1, 2)}>
                  Centre de l'émigration ▼
                </a>
                <div className={`w-52 ml-11 sub-sub-nav bg-pblue ${isSubNavOpen[1][2] ? 'open' : 'close'}`}>
                  <Link href="/ecole" >
                    <a className="ml-1 block text-teal-200  ">
                      L'école théologique de Paris
                  </a>
                  </Link>
                </div>
              </div>
              <div className="hover-sub-trigger relative bg-pblue">
                <a className="ml-1 block text-teal-200  " onClick={() => openSubMenu(1, 3)}>
                    La vie liturgique ▼
                </a>

                <div className={`w-52 ml-11 sub-sub-nav bg-pblue ${isSubNavOpen[1][3] ? 'open' : 'close'}`}>
                  <Link href="/traditionMonastique" >
                    <a className="ml-1 block text-teal-200  ">
                      Tradition Monastique à Paris
                  </a>
                  </Link>
                  <Link href="/familleChefsChoeur" >
                    <a className="ml-1 block text-teal-200  ">
                      Une famille de chefs de choeur et de compositien
                  </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>


          <div className="mr-20  hover-trigger  relative hover:text-withe">
            <Link href="/centreColline" >
              <a className="ml-1 block text-teal-250 hover:text-withe">
                Le centre de la Colline
            </a>
            </Link>
          </div>

          <div className='mr-20  hover-trigger relative'>
            <label onClick={() => openMenu(2)}>Les travaux envisagés ▼</label>
            <div className={`w-44 sub-nav bg-pblue ${isOpenArray[2] ? 'open' : 'close'}`}>
              <div className="hover-sub-trigger relative">
                <Link href="/projet" >
                  <a className="ml-1 block text-teal-200  ">
                    Suivre le projet
                  </a>
                </Link>
              </div>

            </div>
          </div>


          <div className='mr-20  hover-trigger relative'>
            <label onClick={() => openMenu(3)}>Le financement ▼</label>
            <div className={`w-44 sub-nav bg-pblue ${isOpenArray[3] ? 'open' : 'close'}`}>
              <div className="hover-sub-trigger relative">
                <Link href="https://www.helloasso.com/associations/union-directrice-diocesaine-des-associations-russes-orthodoxes-en-europe-occidentale/formulaires/4" >
                  <a className="ml-1 block text-teal-200  ">
                    Faire un don
                  </a>
                </Link>
              </div>
              <div className="hover-sub-trigger relative">
                <Link href="/leg" >
                  <a className="ml-1 block text-teal-200  ">
                    Faire un leg
                  </a>
                </Link>
              </div>

            </div>


          </div>
        </Ul>
      </div>
    </nav >

  )
}

export default LeftNav