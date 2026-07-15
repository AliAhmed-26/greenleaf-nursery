import React, { useState, useEffect, useContext } from "react";
import "./Checkout.css";
import Cart_Order_Summary from "./Cart_Order_Summary";
import { Cart_Context } from "../../context/context";

const Checkout = () => {

    const { checkout_func, formData, setFormData, nameError, setNameError, } = useContext(Cart_Context)



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        checkout_func();
    }, [])


    return (
        <div className="card-summary-section-cart">

            <div className="checkout-form">

                <h1 className="shipping-checkout">
                    Shipping Details
                </h1>

                <div className="form-row">

                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            readOnly
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            readOnly
                            placeholder="Enter your email"
                        />
                    </div>

                </div>

                <div className="form-row">

                    <div className="input-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                        />
                        {nameError && (<p className="error-ui">Phone is required</p>)}
                    </div>

                    <div className="input-group">
                        <label>Country</label>
                        <input
                            type="text"
                            name="country"
                            value={"Pakistan"}
                            readOnly
                            placeholder="Enter your country"
                        />
                    </div>

                </div>
                <p className="payment-note">
                    <strong>Payment Method:</strong> Cash on Delivery (COD)
                </p>

            </div>

            <Cart_Order_Summary setNameError={setNameError} showCheckOutBtn={false} phone={formData.phone} country={formData.country} />

        </div>
    );
};

export default Checkout;