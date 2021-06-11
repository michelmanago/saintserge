import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';

const Nav = styled.nav`
  width: 100%;
  border-bottom: 2px solid #f1f1f1;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  background-color: #0D2538;
  
`

const Navbar = () => {
  return (
    <div className='w-full mx-auto bg-pblue py-2'>
      <div className="logo">
       
      </div>
      <Burger />
    </div>
  )
}

export default Navbar
