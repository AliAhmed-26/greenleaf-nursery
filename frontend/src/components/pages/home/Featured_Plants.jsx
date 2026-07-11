import React from 'react'
import './Featured_Plants.css'
import Monstera_Deliciosa from "../../../images/Monstera Deliciosa.avif";
import Snake_Plant from "../../../images/Snake Plant.avif";
import Fiddle_Leaf_Fig from "../../../images/Fiddle Leaf Fig.avif";
import Underline from '../../navbar/Underline'
import { ImTree } from 'react-icons/im'
import Card_Home_Shop from '../../navbar/Card_Home_Shop';
import { useContext } from 'react';
import { Cart_Context } from '../../context/context';
const Featured_Plants = () => {

    const { allproducts } = useContext(Cart_Context)
    // const home_array = [
    // {
    //     'id': 4,
    //     'category': "indoor",
    //     "image": Monstera_Deliciosa,
    //     "title": "Monstera Deliciosa",
    //     "price": "$34.99",
    //     "para": "Popular tropical plant with distinctive split leaves."
    // },

    // {
    //     'id': 2,
    //     'category': "indoor",
    //     "image": Snake_Plant,
    //     "title": "Snake Plant",
    //     "price": "$24.99",
    //     "para": "Low-maintenance plant that purifies air and thrives in low light."
    // },
    // {
    //     'id': 3,
    //     'category': "indoor",
    //     "image": Fiddle_Leaf_Fig,
    //     "title": "Fiddle Leaf Fig",
    //     "price": "$49.99",
    //     "para": "Trendy plant with large, violin-shaped leaves."
    // }
    // ]


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