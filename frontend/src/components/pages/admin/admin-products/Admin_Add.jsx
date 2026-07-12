import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { Cart_Context } from '../../../context/context'
import { useNavigate } from 'react-router-dom'
import apiRequest from '../../../auth_apis/fetch_api'
const Admin_Add = () => {

    const navigate = useNavigate()
    const { hi, allproducts, setAllproducts } = useContext(Cart_Context)

    useEffect(() => {
        hi()

    }, [])




    const [admin_form_add, setAdmin_form_add] = useState({
        title: "",
        category: "",
        price: "",
        quantity: "",
        para: "",
        image: null
    })

    const add_product_admin = async () => {

        const form_data = new FormData()
        form_data.append("title", admin_form_add.title)
        form_data.append('category', admin_form_add.category)
        form_data.append("price", admin_form_add.price)
        form_data.append("quantity", admin_form_add.quantity)
        form_data.append("para", admin_form_add.para)
        form_data.append("image", admin_form_add.image)


       
            let request_add_pro_adm = await apiRequest("/admin/add-product", {
                method: "POST",
                body: form_data
            })
            let response_add_pro_adm = await request_add_pro_adm.json()

            console.log("res_add_pro_adm", response_add_pro_adm)

            navigate("/admin/products")
            hi()
        
    }



    const change_admin_add_form = (e) => {
        if (e.target.type === "file") {
            setAdmin_form_add(prev => ({
                ...prev,
                image: e.target.files[0]

            }))
        }
        else {

            setAdmin_form_add(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
    }


    return (
        <div className="overlay-edit">

            <div className="container-edit">

                <div className="header-edit">
                    <h2>Add New Product</h2>
                    <p>Fill the details below to add a new product.</p>
                </div>
                {(

                    < div className="body-edit" >

                        <div className="row-edit">

                            <div className="input-group-edit">
                                <label>Product Name</label>

                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter product name"
                                    value={admin_form_add.title}
                                    onChange={change_admin_add_form}
                                />
                            </div>

                            <div className="input-group-edit">
                                <label>Product Image</label>

                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={change_admin_add_form}
                                />
                            </div>

                        </div>

                        <div className="row-edit">

                            <div className="input-group-edit">
                                <label>Category</label>

                                <select onChange={change_admin_add_form} value={admin_form_add.category}
                                    name="category"
                                >



                                    {/* <option >Select Category</option> */}
                                    <option value="indoor">Indoor</option>
                                    <option value="outdoor">Outdoor</option>
                                    <option value="flowering">Flowering</option>
                                    <option value="succulent">Succulent</option>

                                </select>

                            </div>

                            <div className="input-group-edit">
                                <label>Price</label>

                                <input
                                    type="number"
                                    placeholder="Enter price"
                                    name="price"
                                    value={admin_form_add.price}
                                    onChange={change_admin_add_form}
                                />
                            </div>

                        </div>

                        <div className="row-edit">

                            <div className="input-group-edit">
                                <label>Quantity</label>

                                <input
                                    type="number"
                                    placeholder="Enter quantity"
                                    name="quantity"
                                    value={admin_form_add.quantity}
                                    onChange={change_admin_add_form}
                                />
                            </div>

                        </div>

                        <div className="input-group-edit">
                            <label>Description</label>

                            <textarea
                                rows="6"
                                placeholder="Write product description..."
                                name="para"
                                onChange={change_admin_add_form}
                                value={admin_form_add.para}
                            >

                            </textarea>
                        </div>

                    </div>

                )}


                <div className="footer-edit">

                    <button onClick={() => {
                        navigate('/admin/products')
                    }} className="cancel-btn-edit">
                        Cancel
                    </button>

                    <button onClick={() => {
                        add_product_admin()
                    }} className="save-btn-edit">
                        Add Product
                    </button>

                </div>

            </div>

        </div >
    )
}

export default Admin_Add