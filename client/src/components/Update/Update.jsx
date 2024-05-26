import React , {useState , useEffect} from 'react'
import './Update.css'
import { useParams } from 'react-router-dom';
import { getResidency , updateResidency } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const Update = ({property , formData , setFormData}) => {
  const navigate = useNavigate()

    const {id} = useParams();
    console.log(id)

   
    const title =   property.title
    const  description =   property.description
     const  image =   property.image
    const price = property.price
     const location =   property.location
      const country = property.country

    let img = ''
    img=image;
    console.log(img)
   
//    formData.title = title
//    formData.description = description
//    formData.price= price
//    formData.country= country
//    formData.location= location
// setFormData((predata)=>({...predata ,title: title }))

    console.log(formData)

    
        // setFormData({
        //     title: title,
        //     description: description,
        //     location:location,
        //     price: price,
        //     country: country
        // });
   
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
            img = data.secure_url;
            console.log(img)
        })
        .catch(err=>console.log(err))
    }
 
  
    
    
    const handleChange = async(event) => {
      const { name ,value } = event.target;
       await setFormData(prevFormData => ({
        ...prevFormData,
        [name]:'',
      }))
      await setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }))
    };
    console.log(formData)


   
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
       console.log(formData.title ,formData.description ,img ,formData.price , formData.location , formData.country )
        const response = await updateResidency(id ,formData.title ,formData.description ,img ,formData.price , formData.location , formData.country )
        console.log('Registered successfully!');
        navigate('/ownedRes')
      
      } catch (error) {
        console.error('Registration failed:', error.message);
      }

    };

  return (
    <section className='update-wrapper'>
    <div className="heading">
      <p>Add Your Property</p>
    </div>
    <div className="update">
       <div className="title">
       <label htmlFor="username">Title</label>
       <input 
        name="title"
        value={formData.title}
        onChange={handleChange}
        id='title'
        type="text" 
        placeholder={title}/>
       </div>

       <div className="description">
        <label htmlFor="email">Description</label>
        <input 
        name="description"
        value={formData.description}
        onChange={handleChange}
        type='text'
        id='description'  
        placeholder={description}/>
       </div>


     
     <div className="image-wrapper">
       <div className="image">
          <label htmlFor="image">Image</label>
          <input type="file"
          name="image"
          value={formData.image}
          onChange={handleChangeForImg}
          id='image'  
          placeholder={image}
           />
       </div>

          <div className="upload-btn">
            <button id='upload-btn' onClick={upload}> upload</button>
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
            placeholder={price}
            onChange={handleChange} />
          </div>

          <div className="country">
           <label htmlFor="price">Country</label>
            <input
            type="text"
            name='country'
            value={formData.country}
            id='country'
            placeholder={country}
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
        placeholder={location}/>
       </div>

      {
        // show &&
        <div className="upload-btn">
        <button id='upload-btn' onClick={handleSubmit}>update</button>
        </div>
}
       </div> 
      </section>
  )
}

export default Update