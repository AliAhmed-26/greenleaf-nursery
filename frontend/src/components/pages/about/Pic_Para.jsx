import React from 'react'
import './Pic_Para.css'
import { Link } from 'react-router-dom'
import { IMAGE_URL } from '../../../config'
const Pic_Para = () => {
    return (
        <>
            <div className="pic-para">
                <div className="image-div-about">
                    <img className='img-about' src={`${IMAGE_URL}/About.avif`} alt="GreenLeaf Nursery plants" />
                </div>
                <div className="para-div-about">
                    <h2 className="heading-bringing-about">
                        Bringing Greenery to Your Life Since 2010
                    </h2>
                    <p className="para-about">
                        GreenLeaf Nursery started as a small family business with a passion for plants and nature. What began as a hobby growing plants in our backyard has blossomed into a thriving nursery serving plant lovers across the country. <br />

                        We believe that plants have the power to transform spaces and improve well-being. Our mission is to make it easy for everyone to enjoy the benefits of having plants in their homes and gardens.<br />

                        All our plants are grown with care and sustainably sourced. We work with local growers and ensure that every plant is healthy and ready to thrive in its new home.<br />
                    </p>
                    <button className="visit-btn">

                        <Link to='/app/shop' className='visit-link'>Visit Our Nursery</Link>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Pic_Para
