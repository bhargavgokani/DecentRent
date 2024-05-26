import React, { useState  , useContext} from 'react'
import './Login.css'
import { login } from '../../utils/api'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  
 

  const navigate = useNavigate()


  const[formData , setFormData] = useState({
    email:'',
    password:''
}) 


const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData(prevFormData => ({
    ...prevFormData,
    [name]: value,
  }));
};
console.log(formData)

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await login(formData.email ,formData.password )
    console.log('Login successfully!');
    await setFormData({
      email: '',
      password: '',
    });
    console.log(response.data.user.email)
    localStorage.setItem("email" , response.data.user.email);
   
    navigate('/')
  } catch (error) {
    console.error('Registration failed:', error.message);
  }
};



  return (
  <section className='login-wrapper'>
    <div className="heading">
      <p>Login on MSWDproject</p>
    </div>
    <div className="login">
    
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

       <div className="login-btn">
        <button id='login-btn' onClick={handleSubmit}> Login</button>
       </div>
    </div>
  </section>
  )
}

export default Login