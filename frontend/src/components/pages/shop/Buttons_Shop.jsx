import React, {useContext} from 'react'
import './Buttons_Shop.css'
import { Cart_Context } from '../../context/context';

const Buttons_Shop = () => {
    const { active_button, setActive_button, handleAll, handleIndoor, handleOutdoor, handleFlowering, handlSucculent } = useContext(Cart_Context)
    return (
        <>
            <div className="btns-shop">
                <button className={active_button === 'all' ? "active-btn-shop" : ""} onClick={handleAll}>All Plants</button>
                <button className={active_button === 'Indoor' ? "active-btn-shop" : ""} onClick={handleIndoor} >Indoor</button>
                <button className={active_button === 'Outdoor' ? "active-btn-shop" : ""} onClick={handleOutdoor}>Outdoor</button>
                <button className={active_button === 'Succulent' ? "active-btn-shop" : ""} onClick={handlSucculent}>Succulents</button>
                <button className={active_button === 'Flowering' ? "active-btn-shop" : ""} onClick={handleFlowering}>Flowering</button>
            </div>
        </>
    )
}

export default Buttons_Shop