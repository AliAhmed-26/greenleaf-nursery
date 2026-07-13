import { useNavigate, useParams } from "react-router-dom";
import { Cart_Context } from "../../../context/context";
import "./Admin_Edit.css";
import { useEffect, useContext, useState } from "react";
import apiRequest from "../../../auth_apis/fetch_api";
const Admin_Edit = () => {
    const navigate = useNavigate()

    const { hi, allproducts, setAllproducts } = useContext(Cart_Context)
    const { id } = useParams()
    



    useEffect(() => {
        hi()

    }, [])



    const [admin_form_update, setAdmin_form_update] = useState({
        title: "",
        category: "",
        price: "",
        quantity: "",
        status: "",
        para: "",
        image: null
    })

    const update_product_admin = async (id) => {

        const form_data = new FormData()
        form_data.append("title", admin_form_update.title)
        form_data.append('category', admin_form_update.category)
        form_data.append("price", admin_form_update.price)
        form_data.append("quantity", admin_form_update.quantity)
        form_data.append("para", admin_form_update.para)
        form_data.append("image", admin_form_update.image)




        let request_upd_pro_adm = await apiRequest(`/admin/update-products/${id}`, {
            method: "PUT",

            body: form_data
        })
        let response_upd_pro_adm = await request_upd_pro_adm.json()



        navigate("/admin/products")
        hi()

    }



    const product = allproducts.find(products => {
        return products._id === id
    })
    


    useEffect(() => {
        if (!product) {
            return
        }
        setAdmin_form_update({

            title: product.title,
            category: product.category,
            price: product.price,
            quantity: product.quantity,
            para: product.para,
            image: product.image
        })
    }, [product])



    const change_admin_update_form = (e) => {
        if (e.target.type === "file") {
            setAdmin_form_update(prev => ({
                ...prev,
                image: e.target.files[0]

            }))
        }
        else {

            setAdmin_form_update(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
    }



    return (
        <div className="overlay-edit">

            <div className="container-edit">

                <div className="header-edit">
                    <h2>Edit Product</h2>
                    <p>Update the details below.</p>
                </div>
                {product && (

                    < div className="body-edit" >

                        <div className="row-edit">

                            <div className="input-group-edit">
                                <label>Product Name</label>

                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter product name"
                                    value={admin_form_update.title}
                                    onChange={change_admin_update_form}
                                />
                            </div>

                            <div className="input-group-edit">
                                <label>Product Image</label>

                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={change_admin_update_form}
                                />
                            </div>

                        </div>

                        <div className="row-edit">

                            <div className="input-group-edit">
                                <label>Category</label>

                                <select onChange={change_admin_update_form} value={admin_form_update.category}
                                    name="category"
                                >




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
                                    value={admin_form_update.price}
                                    onChange={change_admin_update_form}
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
                                    value={admin_form_update.quantity}
                                    onChange={change_admin_update_form}
                                />
                            </div>



                        </div>

                        <div className="input-group-edit">
                            <label>Description</label>

                            <textarea
                                rows="1"
                                placeholder="Write product description..."
                                name="para"
                                onChange={change_admin_update_form}
                                value={admin_form_update.para}
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
                        update_product_admin(product._id)
                    }} className="save-btn-edit">
                        Save Changes
                    </button>

                </div>

            </div>

        </div >
    );
};

export default Admin_Edit;