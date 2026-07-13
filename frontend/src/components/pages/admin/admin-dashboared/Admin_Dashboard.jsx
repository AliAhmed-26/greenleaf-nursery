import { Cart_Context } from "../../../context/context";
import Underline from "../../../navbar/Underline";
import "./Admin_Dashboard.css";
import { useContext, useEffect, useState } from "react";

const Admin_Dashboard = () => {

  const { hi, allproducts, setAllproducts, dashboard, setDashboard, stats, dashboard_summary_admin, change_status_func } = useContext(Cart_Context)

  const [showAllLowStock, setShowAllLowStock] = useState(false);


  useEffect(() => {
    dashboard_summary_admin()
  }, [])

  !dashboard.recent_orders_admin && []



  return (

    <div className="admin-dashboard">

      <div className="dashboard-heading">
        <h1>Dashboard</h1>
        <Underline />
      </div>


      <div className="dashboard-cards">

        {
          stats.map((item) => (

            <div className="dashboard-card" key={item.title}>

              <h3>{item.title}</h3>

              <h2>{item.value}</h2>

            </div>

          ))
        }

      </div>


      <div className="dashboard-section">

        <div className="section-heading">
          <h2>Recent Orders</h2>
        </div>
        {dashboard.recent_orders_admin && dashboard.recent_orders_admin.length > 0 ?

          <table className="dashboard-table">

            <thead>

              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
                <th>Date</th>
              </tr>

            </thead>

            <tbody>

              {dashboard.recent_orders_admin &&
                dashboard.recent_orders_admin.map((order) => (

                  <tr key={order._id}>

                    {/* <td>{order._id}</td> */}
                    <td><h3>#{order._id.slice(-6)}</h3></td>

                    <td>{order.name}</td>

                    <td>{order.phone}</td>

                    <td><b> {`$${(order.totalAmount).toFixed(2)}`}</b></td>

                    <td>

                      <span className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>

                    </td>

                    <td>
                      <select onChange={async (e) => {
                        await change_status_func(order._id, e.target.value)
                        dashboard_summary_admin()
                      }}
                        value={order.status}>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                      </select>
                    </td>

                    <td>
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>
          : <p className="no-order-dashboard">
            No recent orders found.
          </p>}
      </div>

      {/* Bottom */}

      <div className="dashboard-bottom">

        {/* Low Stock */}

        <div className="low-stock-card">

          <div className="section-heading">

            <h2>Low Stock Products</h2>

          </div>
          {dashboard.low_stock_admin && dashboard.low_stock_admin.length > 0 ?

            dashboard.low_stock_admin && (showAllLowStock ? dashboard.low_stock_admin : dashboard.low_stock_admin.slice(0, 3)).map((item,index) => (

              <div className="low-stock-item" key={index}>
                <img
                  src={`http://localhost:3000/images/${item.image}`}
                  alt={item.title}
                  className="product-image"
                />
                <span>{item.title}</span>

                <span>{item.quantity} Left</span>

              </div>

            ))

            : <p className="no-order-dashboard">No low stock products found</p>}
          {dashboard.low_stock_admin && dashboard.low_stock_admin.length > 3 && (
            <button
              className="show-more-btn"
              onClick={() => setShowAllLowStock(!showAllLowStock)}
            >
              {showAllLowStock ? "Show Less" : "Show More"}
            </button>
          )
          }


        </div>

        {/* Recent Customers */}

        <div className="customer-card">

          <div className="section-heading">

            <h2>Recent Customers</h2>

          </div>
          {dashboard.recent_users_admin && dashboard.recent_users_admin.length > 0 ?
            <table className="dashboard-table">

              <thead>

                <tr>

                  <th>Name</th>
                  <th>Email</th>
                  {/* <th>Phone</th> */}
                  <th>Joined</th>

                </tr>

              </thead>

              <tbody>

                {dashboard.recent_users_admin &&
                  dashboard.recent_users_admin.map((user) => (

                    <tr key={user.email}>

                      <td className="user-name-dashboard">{user.name}</td>

                      <td>{user.email}</td>

                      {/* <td>{user.phone}</td> */}

                      <td>
                        {new Date(user.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                    </tr>
                  ))
                }


              </tbody>

            </table>
            : <p className="no-order-dashboard">No recent users found</p>}

        </div>

      </div>

    </div>

  );

};

export default Admin_Dashboard;