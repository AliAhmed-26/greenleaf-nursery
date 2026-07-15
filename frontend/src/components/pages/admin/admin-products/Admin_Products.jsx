import { IMAGE_URL } from "../../../../config";
import apiRequest from "../../../auth_apis/fetch_api";
import { Cart_Context } from "../../../context/context";
import Underline from "../../../navbar/Underline";
import "./Admin_Products.css";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Admin_Products = () => {
    const navigate = useNavigate();

    const { hi, allproducts } = useContext(Cart_Context);

    useEffect(() => {
        hi();
    }, []);

    const delete_product_admin = async (id) => {
        const confirmDelete = confirm("Are you sure you want to delete this product?");

        if (!confirmDelete) return;

        try {
           
            const request = await apiRequest(
                `/admin/delete-products/${id}`,
                {
                    method: "DELETE",
                }
            );

            const response = await request.json();

            hi();
        } catch (err) {
            console.log(err);
        }
    };
    const [showAllProducts, setshowAllProducts] = useState(false);


    const goto_edit_page = (id) => {
        navigate(`/admin/products/edit/${id}`);
    };

    const goto_add_page = () => {
        navigate("/admin/products/add-product");
    };

    return (
        <>
            <div className="Admin_products-page">

                <div>

                    <h1 className="product-headng-product">Products</h1>
                    <Underline />

                </div>

                <div className="Admin_products-header">


                    <p>
                        Manage all nursery products from one place.
                    </p>


                    <button
                        className="add-product-btn"
                        onClick={goto_add_page}
                    >
                        + Add Product
                    </button>

                </div>

                {/* Table */}

                <div className="Admin_products-card">

                    <table className="dashboard-table">

                        <thead>

                            <tr>

                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {(showAllProducts ? allproducts : allproducts.slice(0, 10)).map((product) => (

                                <tr key={product._id}>

                                    <td>

                                        <div className="product-info">

                                            <img
                                                src={`${IMAGE_URL}/${product.image}`}
                                                alt={product.title}
                                                className="product-image"
                                            />

                                            <div>

                                                <h4>{product.title}</h4>

                                                <p>
                                                    ID :
                                                    {" "}
                                                    {product._id.slice(-6)}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td>

                                        <span className={`category-badge-${product.category}`}>
                                            {product.category}
                                        </span>

                                    </td>

                                    <td>

                                        <b>
                                            ${product.price}
                                        </b>

                                    </td>

                                    <td>
                                        <b>
                                            {product.quantity}
                                        </b>

                                    </td>

                                    <td>

                                        {
                                            product.quantity === 0 ? (

                                                <span className="status-badge status-out">
                                                    Out of Stock
                                                </span>

                                            ) : product.quantity <= 4 ? (

                                                <span className="status-badge status-critical">
                                                    Critical Stock
                                                </span>

                                            ) : product.quantity <= 10 ? (

                                                <span className="status-badge status-low">
                                                    Low Stock
                                                </span>

                                            ) : (

                                                <span className="status-badge status-in">
                                                    In Stock
                                                </span>

                                            )
                                        }
                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    goto_edit_page(product._id)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    delete_product_admin(product._id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            ))
                            }

                        </tbody>
                    </table>
                    {
                        allproducts.length > 10 && (
                            <button
                                className="show-more-btn"
                                onClick={() => setshowAllProducts(!showAllProducts)}
                            >
                                {showAllProducts ? "Show Less" : "Show More"}
                            </button>
                        )
                    }


                </div>

            </div>

            <Outlet />
        </>
    );
};

export default Admin_Products;