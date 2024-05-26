import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <section className='footer-wrapper'>
      <div className="footer-left">

        <div className="f-l-top">
            <h2>DecentRent</h2>
        </div>
        <div className="f-l-b">
            <p>Our vision is to make all people</p>
            <p>the best place to live for them.</p>
        </div>
      </div>

      <div className="footer-right">
        <div className="f-r-1">
            <a href="#">Property</a>
        </div>
        <div className="f-r-1">
            <a href="#">Service</a>
        </div>
        <div className="f-r-1">
            <a href="#">About us</a>
        </div>
        <div className="f-r-1">
            <a href="psuthar1903@gmail.com">Contact Us</a>
        </div>
      </div>
    </section>
  )
}

export default Footer