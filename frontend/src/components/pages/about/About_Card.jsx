import React from 'react'
import './About_Card.css'
import { FaHeadset, FaTruck, FaSeedling } from "react-icons/fa";
import Card_About_Care from '../../navbar/Card_About_Care';

const About_Card = () => {
    const about_array = [
        {
            "icon_card_about": <FaSeedling />,
            "heading_card_about": 'Quality Plants',
            'para_card_about': 'We source only the healthiest, highest-quality plants from trusted growers'
        },
        {
            "icon_card_about": <FaTruck />,

            "heading_card_about": 'Safe Delivery',
            'para_card_about': 'Our plants are carefully packaged and shipped to arrive in perfect condition.'
        },
        {
            "icon_card_about": <FaHeadset />,

            "heading_card_about": 'Expert Support',
            'para_card_about': 'Our team is here to help with plant selection and care advice.'
        },
    ]
    return (
        <div>

            <div className="card-section-of-about">
                {about_array.map((item, index) => {
                    return <Card_About_Care
                        key={index}
                        icon_card_about={item.icon_card_about}
                        heading_card_about={item.heading_card_about}
                        para_card_about={item.para_card_about}
                        text_align={'center'}
                    />

                })}
            </div>

        </div>
    )
}

export default About_Card