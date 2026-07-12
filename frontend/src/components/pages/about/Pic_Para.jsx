import React from 'react'
import './Pic_Para.css'
import { Link } from 'react-router-dom'
const Pic_Para = () => {
    return (
        <>
            <div className="pic-para">
                <div className="image-div-about">
                    <img className='img-about' src={"http://localhost:3000/images/About.avif"} alt="" />
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






// .pic-para {
//     border: 2px solid black;
//     display: flex;
//     align-items: center;
//     justify-content: space-evenly;
//     height: 450px;
//     /* width: 89%; */
// max-width: 1200px;

// gap: 0px;
// margin: 27px auto;

// }

// .image-div-about {
//     height: 100%;
//     width: 45%;
//     border: 2px solid red;
// }

// .img-about {
//     border-radius: 10px;
//     width: 100%;
//     height: 100%;

// }

// .para-div-about {
//     /* border: 2px solid blue; */
//     min-height: 80%;
//     width: 45%;
//     /* word-spacing: 5px; */
//     line-height: 1.6;

// }

// .visit-btn {
//     background-color: var(--primary);
//     color: white;
//     padding: 15px;
//     margin-top: 20px;
//     border: none;
//     border-radius: 6px;
// }

// .visit-link {
//     color: white;
//     font-size: 16px;

// }

// @media (max-width:900px) {
//     .pic-para {

//         flex-direction: column;
//         /* height: 0px; */
//         min-height: 120px;
//         width: 100%;

//     }

//     .image-div-about {
//         height: 90%;
//         width: 90%;
//     }

//     .img-about {
//         border-radius: 10px;
//         width: 100%;
//         height: 350px;

//     }

//     .para-div-about {
//         min-height: 80%;
//         width: 90%;

//     }


// } 