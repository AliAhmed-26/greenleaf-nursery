import React, { useContext } from 'react'
import Card_Home_Shop from '../../navbar/Card_Home_Shop'
import { useState, useRef } from 'react';
import Buttons_Shop from './Buttons_Shop';
import Underline from '../../navbar/Underline'
import './Shop.css'
import { Cart_Context } from '../../context/context';
import Ai_Indicator from '../ai-integration-ui/Ai_Indicator';

const Shop = () => {



  const { shop_array_state } = useContext(Cart_Context)


  return (
    <>
      <h1 className="heading-shop">
        Our Shop
        <Underline />
      </h1>
      <div className="btns-heaading-shop-div">
        <div className="heading-shop-div">
          <h2>Discover Your Favorites</h2>
        </div>
        <Buttons_Shop />
      </div>
      <div className="card-section-of-home-shop">
        {shop_array_state.map((item, index) => {
          return (<Card_Home_Shop key={index} item={item}
          />)
        })}
      </div>
      <Ai_Indicator/>
    </>
  )
}

export default Shop