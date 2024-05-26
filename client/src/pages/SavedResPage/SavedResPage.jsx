import React , {useEffect , useState} from 'react'
import './SavedResPage.css'
import Propertycard from '../../components/Proprtycard/Propertycard'
import {getSavedRes}from '../../utils/api'
import { Navigate, useNavigate } from 'react-router-dom'
import SavedResCard from '../../components/SavedResCard/SavedResCard'

const SavedRes = () => {

    const [properties, setProperties] = useState([]);

    useEffect(() => {
      // Your data fetching logic here
      const fetchData = async () => {
        try {
          const response = await getSavedRes()
          const data = await response.data;
          console.log(response)
          setProperties(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    console.log(properties)

    const navigate = useNavigate();


  return (
    <div className="savedproperties-wrapper">
   
    {/* {properties.map((property,id) => (
        <Propertycard property={property} key={id} onClick={()=>navigate(`/savedRes/${property._id}`)}/>
    ))} */}
      {properties.map((property,id) => (
        <SavedResCard property={property} key={id} onClick={()=>navigate(`/savedRes/${property._id}`)}/>
    ))}
</div>
  )
}

export default SavedRes