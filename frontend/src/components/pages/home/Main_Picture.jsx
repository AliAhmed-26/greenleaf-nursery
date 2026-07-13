import React from 'react'
import './Main_Picture.css'
import { Link } from 'react-router-dom'
import { IMAGE_URL } from '../../../config'
const Main_Picture = () => {
  return (
    <>
      <div className="container">
        <div className="con">

          <img src={`${IMAGE_URL}/Home_Main.avif`} className='main-picture-of-img' alt="" />
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