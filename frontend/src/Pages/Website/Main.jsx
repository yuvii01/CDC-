import React, { useEffect, useState } from 'react'
import Header from '../../Components/Website/Header'
import Footer from '../../Components/Website/Footer'
import { Outlet } from 'react-router-dom'
function Main() {  
  return (
    <div>
 
        <div className="">
          <Header />
          <Outlet />
          <Footer />
        </div>
    </div>
  );
}

export default Main