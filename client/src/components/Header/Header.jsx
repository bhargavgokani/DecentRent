import React, { useState , useEffect } from 'react'
import './Header.css'
import { Link, NavLink  } from 'react-router-dom'
// import {default as useHistory} from 'react-router-dom'
import useAuthCheck from '../../hooks/useAuthCheck'
import { toast } from 'react-toastify';
import { logout } from '../../utils/api'; 
import { useNavigate } from 'react-router-dom';



const Header = () => {

   // const history = useHistory();
  
   const navigate = useNavigate();

   const {validateLogin }= useAuthCheck();
   const isLogin = validateLogin();
   console.log(isLogin)

   

   const[open , setOpen] = useState(true);

   const handleClose = ()=>{
      setOpen(!open)
   }



   const handleSubmit = async (event) => {
   event.preventDefault();
   try {
     const response = await logout()
      navigate('/')
     console.log('logout successfully!');
   } catch (error) {
     console.error('Logout failed:', error.message);
   }
 };

  return (
   <section className='header-wrapper' >
     
     <div className="header-left">

        <h1>
        DecentRent
       </h1>
      
     </div>
   
     <div className="header-right">
         <div className="h-r-1">
         
            <NavLink to={'/about'}>
               About
               </NavLink>
         </div>

         {
         
         !isLogin ?( <>

        <div className="h-r-2">
            <a href="#">Contact Us</a>
         </div>
         
         <div className="h-r-4">
           <NavLink to="/register"> 
            Register
            </NavLink>
         </div>
         
          
         <div className="h-r-5">
            <NavLink to="/login" style={{color: 'white'}}>
            Log In
            </NavLink>
         </div>
        
         </>
         )
         
         :
         (<> 
            <div className="h-r-3">
            <NavLink to="/create"> 
              Add Property
            </NavLink>
            </div>
            <div className="h-r-6">
            <NavLink to="/savedRes"> 
              Saved
            </NavLink>
            </div>
            <div className="h-r-6">
            <NavLink to="/ownedRes"> 
              owned
            </NavLink>
            </div>
            <div className="h-r-5" onClick={handleSubmit}>
            <a style={{ color: 'white' }} href="#">Log out</a>
           </div>
      </>)
         }


     </div>

     
{/*      
     <button className='open-btn' onClick={handleClose}>open</button>
      <button className='close-btn' onClick={handleClose}> close</button> */}
      {/* <div className={open ? 'profile-open' : 'profile-close'}>
 
 {
 
 !isLogin ?

      (<>
       <div className="p">
       <a href="#">Contact Us</a>
       </div>

       <div className="p">
       <NavLink to="/register"> 
       Register
       </NavLink>
      </div>

 
       <div className=" p p-b">
       <NavLink to="/login" style={{color: 'white'}}>
       Log In
       </NavLink>
      </div>

      </>)
:

      (<> 
            <div className="p">
            <NavLink to="/create"> 
              Add Property
            </NavLink>
            </div>
            <div className="p">
            <NavLink to="/savedRes"> 
              Saved
            </NavLink>
            </div>
            <div className="p">
            <NavLink to="/ownedRes"> 
              owned
            </NavLink>
            </div>
            <div className="p p-b" onClick={handleSubmit}>
            <a style={{ color: 'white' }} href="#">Log out</a>
           </div>
      </>)

      }
      
</div> */}

   </section>


  )
}

export default Header