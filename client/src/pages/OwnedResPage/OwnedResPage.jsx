import React  from 'react'
import './OwnedResPage.css'
import { Navigate, useNavigate } from 'react-router-dom'
import {getOwnedRes }from '../../utils/api'
import OwnedResCard from '../../components/OwnedResCard/OwnedResCard'
import { useEffect, useState } from 'react'

const OwnedRes = () => {

  const [properties, setProperties] = useState([]);

    useEffect(() => {
      // Your data fetching logic here
      const fetchData = async () => {
        try {
          const response = await getOwnedRes()
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
    <div className="ownedproperties-wrapper">
   
    {/* {properties.map((property,id) => (
        <Propertycard property={property} key={id} onClick={()=>navigate(`/savedRes/${property._id}`)}/>
    ))} */}
      {properties.map((property,id) => (
        <OwnedResCard property={property} key={id} onClick={()=>navigate(`/ownedRes/${property._id}`)}/>
    ))}
</div>
  )
}

export default OwnedRes