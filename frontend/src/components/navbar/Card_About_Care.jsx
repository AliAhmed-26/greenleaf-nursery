import React from 'react'
import './Card_About_Care.css'
const Card_About_Care = (item) => {
    return (
        <>
        {/* In about i need text align center. But in care i need text align start   */}
            <div className="card-of-about" style={{textAlign:item.text_align}}>

                <h1 className='icon_about_heading'>{item.icon_card_about}</h1>

                <h3 className="card-heading-of-about">{item.heading_card_about}</h3>

                <p className="card-description-of-about">{item.para_card_about}</p>

           
        </div>
        </>
    )
}

export default Card_About_Care