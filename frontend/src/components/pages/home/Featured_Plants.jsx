import React from 'react'
import './Featured_Plants.css'
import Underline from '../../navbar/Underline'
import { ImTree } from 'react-icons/im'
import Card_Home_Shop from '../../navbar/Card_Home_Shop';
import { useContext } from 'react';
import { Cart_Context } from '../../context/context';
const Featured_Plants = () => {

    const { allproducts } = useContext(Cart_Context)
    
      const home_array = allproducts.slice(2 , 5)
    return (
        <div className='featured-and-card-flex'>


            <h2 className="featured-heading">
                Featured Plants
                <Underline />
            </h2>
            <div className="card-section-of-home-shop">
                {home_array.map((item, index) => {
                    return (<Card_Home_Shop key={index} item={item}
                    />)
                })}
            </div>

        </div >

    )
}

export default Featured_Plants