import React, { useState } from 'react'
import { createResidency } from '../../utils/api'
import './Create.css'
import { useNavigate } from 'react-router-dom'

const Create = () => {

  const navigate = useNavigate()
    const[formData , setFormData] = useState({
        title:'',
        description:'',
        location:'',
        price:'',
        country: ''
    }) 
    // const img = ''
    const[img , setImg] = useState('')


    const[imgurl , setImageurl] = useState(null)

    const handleChangeForImg = (event) => {
        const file = event.target.files[0];
        console.log(file)
        setImageurl(file)
       
      };

      const upload = ()=>{
        const data = new FormData()
        data.append("file" , imgurl)
        data.append("upload_preset" , "mswdproject")
        data.append("cloud_name" ,"deau02hu1")
        fetch("https://api.cloudinary.com/v1_1/deau02hu1/image/upload" , {
            method: "post",
            body:data
        })
        .then((res)=>res.json())
        // .then((data) => {
        //     console.log(data.secure_url); 
           
        //     setFormData(prevFormData => ({
        //         ...prevFormData,
        //         image: data.secure_url 
        //     }));
        // })
        .then((data)=>{
            // img = data.secure_url;
            setImg(data.secure_url)
        })
        .catch(err=>console.log(err))
    }
    console.log(img)
 
  
    
    
    const handleChange = (event) => {
      const { name ,value } = event.target;
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }))
    };
    console.log(formData)


   
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
       console.log(formData.title ,formData.description ,img ,formData.price , formData.location , formData.country )
        const response = await createResidency(formData.title ,formData.description ,img ,formData.price , formData.location , formData.country )
        console.log('Registered successfully!');
        setFormData({
          title:'',
          description:'',
          location:'',
          price:'',
          country:''
        });
        navigate('/')
      
      } catch (error) {
        console.error('Registration failed:', error.message);
      }
    };
   
  return (



<section className='create-wrapper'>
    <div className="heading">
      <p>Add Your Property</p>
    </div>
    <div className="create">
       <div className="title">
       <label htmlFor="username">Title</label>
       <input 
        name="title"
        value={formData.userName}
        onChange={handleChange}
        id='title'
        type="text" 
        placeholder='Enter title for propety'/>
       </div>

       <div className="description">
        <label htmlFor="email">Description</label>
        <input 
        name="description"
        value={formData.description}
        onChange={handleChange}
        type='text'
        id='description'  
        placeholder='Enter the description for property'/>
       </div>


     
     <div className="image-wrapper">
       <div className="image">
          <label htmlFor="image">Image</label>
          <input type="file"
          name="image"
          value={formData.image}
          onChange={handleChangeForImg}
          id='image'  
          placeholder='Enter the image of your proprty'
           />
       </div>

          <div className="upload-btn" onClick={upload}>
            <button id='upload-btn'> upload</button>
         </div>      
     </div>


       
       <div className="p-c">

          <div className="price">
            <label htmlFor="price">Price</label>
            <input
            type="number"
            name='price'
            value={formData.price}
            id='price'
            placeholder='enter price'
            onChange={handleChange} />
          </div>

          <div className="country">
           <label htmlFor="price">Country</label>
            <input
            type="text"
            name='country'
            value={formData.country}
            id='country'
            placeholder='country name'
            onChange={handleChange} />
          </div>

       </div>

       <div className="location">
        <label htmlFor="password">location</label>
        <input
        name="location"
        value={formData.location}
        onChange={handleChange} 
        id='location' 
        type="text"  
        placeholder='Enter the location of the property'/>
       </div>

      {
         img!== '' &&
        <div className="create-btn">
        <button id='create-btn'  onClick={handleSubmit}>create</button>
        </div>
}
       </div> 
      </section>

    
  )
}

export default Create