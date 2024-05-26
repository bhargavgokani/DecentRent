import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './LayoutPage.css'

const LaoutPage = () => {
  return (
    <>
    <div className='wrapper'>
    <Header/>
    <div className="content">
    <Outlet/>
    </div>
   <Footer/>
   </div>
   </>
  )
}

export default LaoutPage