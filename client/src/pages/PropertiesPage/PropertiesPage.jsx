import React , {useEffect, useState}from 'react'
import './PropertiesPage.css'
import Propertycard from '../../components/Proprtycard/Propertycard'
import {getAllResidency }from '../../utils/api'

const PropertiesPage = () => {

    const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Your data fetching logic here
    const fetchData = async () => {
      try {
        const response = await getAllResidency()
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
  
  return (
    <div className="properties-wrapper">
   
        {properties.map((property,id) => (
            <Propertycard property={property} key={id}/>
        ))}

    
      
     
    </div>
  )
}

export default PropertiesPage