import React  ,{useState , useEffect}from 'react'
import Update from '../../components/Update/Update'
import { useParams } from 'react-router-dom';
import { getResidency } from '../../utils/api';

const UpdatePage = () => {

  const[formData , setFormData] = useState({
    title : '',
    description:'',
    location:'',
    price:'',
    country:''
}) 
  const {id} = useParams();
  console.log(id)

  const [property, setProperty] = useState([]);

  useEffect(() => {
      // Your data fetching logic here
      const fetchData = async () => {
        try {
          const response = await getResidency(id)
          const data = await response;
          console.log(data)
          setProperty(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    useEffect(() => {
      // Set form data initially when the property value changes
      setFormData((prevData) => ({
        ...prevData,
        title: property.title || '',
        description: property.description || '',
        location: property.location || '',
        price: property.price || '',
        country: property.country || ''
      }));
    }, [property]);
   

    // console.log(property.title)
  return (
    <>
    {/* {
       setFormData((predata)=>({...predata ,title : property.title
       }))
    } */}
    <Update property={property} formData={formData} setFormData={setFormData}/>
    </>
  )
}

export default UpdatePage