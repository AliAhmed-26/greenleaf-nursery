import React from 'react'
import './Main_Picture.css'
import image from './home-main.avif'
import { Link } from 'react-router-dom'
const Main_Picture = () => {
  return (
    <>
      <div className="container">
        <div className="con">

          <img src={image} className='main-picture-of-img' alt="hello" />
          <div className="for-opa">

          </div>
        </div>


        <div className="alag-div">

          <h1 className="bring-heading">
            Bring Nature Into Your Home
          </h1>
          <p className="discover-para">
            Discover our collection of beautiful indoor and outdoor plants that purify the air and bring life to your spaces.
          </p>
            <Link to='/app/shop' className="shop-home-btn">
              Shop Now
            </Link>
        </div>
      </div>
    </>
  )
}

export default Main_Picture