import { useState , useEffect } from 'react'
import Header from './components/Header/Header'
import {getAllResidency ,  register , login , logout , createResidency  , saveRes , unsaveRes  , getResidency , deleteResidency , updateResidency , addReview , deleteReview} from './utils/api'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import './App.css'
import Footer from './components/Footer/Footer'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import useAuthCheck from './hooks/useAuthCheck'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import LayoutPage from './pages/LayoutPage/LayoutPage'
import CreatePage from './pages/CreatePage/CreatePage'
import LoginPage from './pages/LoginPage/LoginPage'
import PropertiesPage from './pages/PropertiesPage/PropertiesPage'
import PropertyPage from './pages/PropertyPage/PropertyPage'
import SavedResPage from './pages/SavedResPage/SavedResPage'
import OwnedResPage from './pages/OwnedResPage/OwnedResPage'
import UpdatePage from './pages/UpdatePage/UpdatePage'
import About from './pages/AboutPage/About'
import { getSavedRes } from './utils/api'
import { getOwnedRes } from './utils/api'



function App() {

 



   //getSavedRes();
   //getOwnedRes()
   //register("pratik123" , "pratik123@gmail.com" , "pratik123@")
  //login("pratik123@gmail.com" , "pratik123@")
  //logout()
   //saveRes('65ef12037207e9963ed8e0f3')
   //unsaveRes("65ef12037207e9963ed8e0f6")

  //deleteReview("65f15d844eae2fba6b04aa6d" , "65f15df04eae2fba6b04aa79")
  //addReview("65f15d844eae2fba6b04aa6d" , "nice property " , 3)

  //createResidency( "my home" , "home near mounatin" , "https://wallpaperaccess.com/full/2315968.jpg" ,5000 , "vaikunt soc" , "India")
  //getAllResidency()
  //getResidency("65f13382799bc9c1fc332e60")
  //deleteResidency("65f15d844eae2fba6b04aa6d")
  //updateResidency("65f15d844eae2fba6b04aa6d" , "your home" , "home near mounatin" , "https://wallpaperaccess.com/full/2315968.jpg" , 3000 , "vaikunt soc" , "India" )

  return (
  
     <>
      
       <BrowserRouter>
     
       <Routes>
       <Route element={<LayoutPage/>}>

       <Route path ="/register" element={<Register/>}/>
       <Route path='/login' element={<LoginPage/>}/>
       <Route path='/create' element={<CreatePage/>}/>
       <Route path='/about'  element={<About/>}/>
       <Route path='/'element={<PropertiesPage/>}/>
       <Route path='/savedRes'element={<SavedResPage/>}/>
       <Route path='/property/:id'element={<PropertyPage/>}/>
       <Route path='/ownedRes' element={<OwnedResPage/>}/>
       <Route path='/update/:id' element={<UpdatePage/>}/>
       {/* <Route path='/savedRes/:id'element={<SavedResPage/>}/> */}
        </Route>
       </Routes>
     
       </BrowserRouter>
      
     <ToastContainer/>
   

    </>
     
  )
}

export default App
