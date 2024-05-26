import React, { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import { register } from '../../utils/api'
const Register = () => {
  const navigate = useNavigate()
  const[formData , setFormData] = useState({
    userName:'',
    email:'',
    password:'' , 
    metaMaskAddress : ''
}) 


const handleChange = (event) => {
  const { name ,value } = event.target;
   setFormData(prevFormData => ({
    ...prevFormData,
    [name]: value,
  }));
};
console.log(formData)

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await register(formData.userName ,formData.email ,formData.password  , formData.metaMaskAddress)
    console.log('Registered successfully!');
    setFormData({
      userName: '',
      email: '',
      password: '',
      metaMaskAddress:''
    });

    navigate('/login')
  } catch (error) {
    console.error('Registration failed:', error.message);
  }
};


  return (
  <section className='register-wrapper'>
    <div className="heading">
      <p>Regiter on MSWDproject</p>
    </div>
    <div className="register">
       <div className="username">
       <label htmlFor="username">Username</label>
       <input 
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        id='username'
        type="text" 
        placeholder='Enter your username'/>
       </div>

       <div className="metaMaskAddress">
       <label htmlFor="metaMaskAddress">metaMaskAddress</label>
       <input 
        name="metaMaskAddress"
        value={formData.metaMaskAddress}
        onChange={handleChange}
        id='metaMaskAddress'
        type="text" 
        placeholder='Enter your metaMaskAddress'/>
       </div>

       <div className="email">
        <label htmlFor="email">Email</label>
        <input 
        name="email"
        value={formData.email}
        onChange={handleChange}
        id='email' 
        type="text"  
        placeholder='Enter your email'/>
       </div>

       <div className="password">
        <label htmlFor="password">Password</label>
        <input
        name="password"
        value={formData.password}
        onChange={handleChange} 
        id='password' 
        type="text"  
        placeholder='Enter your password'/>
       </div>

       <div className="register-btn">
        <button id='register-btn' onClick={handleSubmit}> Register</button>
       </div>
    </div>
  </section>
  )
}

export default Register