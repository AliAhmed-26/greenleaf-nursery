import React from 'react'
import "./Logo_And_Text.css"
import { FaLeaf } from "react-icons/fa";


const Logo_And_Text = ({ color }) => {

    return (

        <div style={{ color: color }} className='logo-div'>
            <FaLeaf className='leaf' />
            <span >GreenLeaf Nursery</span>
        </div>


    )
}

export default Logo_And_Text