import React from 'react'
import './Propertycard.css'
import { Navigate, useNavigate } from 'react-router-dom'

const Propertycard = ({property}) => {
  console.log("property " ,property)
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/${property._id}`);
  };
  return (
    <section className='propertycard-wrapper' onClick={handleClick}>

        <div className="property">
            <img src={property?.image} alt="img"  className='property-img'/>
            <div className="info">
                <h2 className="property-title">{property?.title}</h2>
                <p className="property-price">{property?.price}/-</p>
            </div>
        </div>

    </section>
  )
}

export default Propertycard