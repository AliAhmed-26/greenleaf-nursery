import React from 'react'
import Underline from '../../navbar/Underline'
import './Care.css'
import { FaSun, FaTint, FaThermometerHalf, FaSpa, FaBug, FaCut } from "react-icons/fa";
import Card_About_Care from '../../navbar/Card_About_Care';
const Care = () => {
  const about_array = [

    {
      "icon_card_care": <FaSun />,
      "heading_card_care": 'Light Requirements',
      'para_card_care': 'Most indoor plants thrive in bright light. Avoid direct sunlight which can scorch leaves. Low-light plants like pothos and snake plants can tolerate less light.'
    },
    {
      "icon_card_care": <FaTint />,

      "heading_card_care": 'Watering Tips',
      'para_card_care': 'Overwatering is the most common cause of plant death. Check soil moisture before watering - most plants prefer the top inch of soil to dry out between waterings.'
    },
    {
      "icon_card_care": <FaThermometerHalf />,

      "heading_card_care": 'Temperature & Humidity',
      'para_card_care': 'Most houseplants prefer temperatures between 65-75°F (18-24°C). Increase humidity for tropical plants by misting or using a humidifier.'
    },
    {
      "icon_card_care": <FaSpa />,

      "heading_card_care": 'Fertilizing',
      'para_card_care': 'Feed plants during their growing season (spring and summer) with a balanced fertilizer. Reduce or stop fertilizing in fall and winter when growth slows.'
    },
    {
      "icon_card_care": <FaBug />,

      "heading_card_care": 'Pest Prevention',
      'para_card_care': 'Regularly inspect plants for pests. Isolate new plants for a few weeks. Treat infestations early with insecticidal soap or neem oil.'
    },
    {
      "icon_card_care": <FaCut />,

      "heading_card_care": 'Pruning & Maintenance',
      'para_card_care': 'Remove yellow or dead leaves to encourage new growth. Prune leggy stems to maintain shape. Wipe leaves occasionally to keep them dust-free.'
    },
  ]

  return (
    <>
      <h1 className='heading_care'>Plant Care Tips</h1>
      <Underline />
      <div className="card-section-of-care">
        {about_array.map((item, index) => {
          return <Card_About_Care
          key={index}
            icon_card_about={item.icon_card_care}
            heading_card_about={item.heading_card_care}
            para_card_about={item.para_card_care}
            text_align='start' />
        })}
      </div>


    </>
  )
}

export default Care