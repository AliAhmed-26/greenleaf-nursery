import "./Admin_Orders.css";

const Admin_Orders = () => {
    return (
        <div className="admin-orders-page">

            <div className="admin-orders-header">
                <h1>Orders</h1>
            </div>

            <div className="admin-orders-card">

                <table className="admin-orders-table">

                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Phone</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>#1001</td>
                            <td>Ali Ahmed</td>
                            <td>03001234567</td>
                            <td>Rs. 4,500</td>

                            <td>
                                <span className="pending-orders">
                                    Pending
                                </span>
                            </td>

                            <td>06 Jul 2026</td>

                            <td>
                                <button className="view-btn-orders">
                                    View
                                </button>

                                <button className="complete-btn-orders">
                                    Complete
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td>#1002</td>
                            <td>Ahmed Khan</td>
                            <td>03112223344</td>
                            <td>Rs. 2,300</td>

                            <td>
                                <span className="completed-orders">
                                    Completed
                                </span>
                            </td>

                            <td>05 Jul 2026</td>

                            <td>
                                <button className="view-btn-orders">
                                    View
                                </button>

                                <button className="delete-btn-orders">
                                    Delete
                                </button>
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Admin_Orders;