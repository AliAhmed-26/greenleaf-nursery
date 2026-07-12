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

      {/* Quick Buttons */}

      {/* <div className="dashboard-actions">

        <button className="dashboard-btn add-btn">
          + Add Product
        </button>

        <button className="dashboard-btn product-btn">
          View Products
        </button>

      </div> */}

      {/* Recent Orders */}

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

            dashboard.low_stock_admin && (showAllLowStock ? dashboard.low_stock_admin : dashboard.low_stock_admin.slice(0, 3)).map((item) => (

              <div className="low-stock-item" key={item.name}>
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



























// import { useContext, useEffect } from "react";
// import {
//   Package,
//   ShoppingCart,
//   Users,
//   AlertTriangle,
//   Plus,
//   Eye,
// } from "lucide-react";
// import { Cart_Context } from "../../../context/context";
// import "./Admin_Dashboard.css";

// const Admin_Dashboard = () => {

//   const {
//     dashboard,
//     stats,
//     dashboard_summary_admin,
//     change_status_func
//   } = useContext(Cart_Context);

//   useEffect(() => {
//     dashboard_summary_admin();
//   }, []);

//   const icons = [
//     <Package size={32} />,
//     <ShoppingCart size={32} />,
//     <Users size={32} />,
//     <AlertTriangle size={32} />
//   ];

//   return (
//     <div className="admin-dashboard">

//       {/* ================= HEADER ================= */}

//       <div className="dashboard-header">

//         <div>

//           <h1>Dashboard</h1>

//           <p>
//             Welcome back, Admin 👋
//           </p>

//         </div>

//         <div className="dashboard-actions">

//           <button className="dashboard-btn add-btn">
//             <Plus size={18} />
//             Add Product
//           </button>

//           <button className="dashboard-btn view-btn">
//             <Eye size={18} />
//             View Products
//           </button>

//         </div>

//       </div>

//       {/* ================= STATS ================= */}

//       <div className="dashboard-cards">

//         {
//           stats.map((item, index) => (

//             <div className={`dashboard-card card-${index}`} key={item.title}>

//               <div className="card-top">

//                 <div className="card-icon">
//                   {icons[index]}
//                 </div>

//               </div>

//               <h3>
//                 {item.title}
//               </h3>

//               <h2>
//                 {item.value}
//               </h2>

//             </div>

//           ))
//         }

//       </div>

//       {/* ================= RECENT ORDERS ================= */}

//       <div className="dashboard-box">

//         <div className="box-heading">

//           <h2>Recent Orders</h2>

//         </div>

//         <table className="dashboard-table">

//           <thead>

//             <tr>

//               <th>Order</th>
//               <th>Customer</th>
//               <th>Phone</th>
//               <th>Total</th>
//               <th>Status</th>
//               <th>Update</th>
//               <th>Date</th>

//             </tr>

//           </thead>

//           <tbody>

//             {
//               dashboard.recent_orders_admin.map((order) => (

//                 <tr key={order._id}>

//                   <td>#{order._id.slice(-6)}</td>

//                   <td>{order.name}</td>

//                   <td>{order.phone}</td>

//                   <td>Rs {order.totalAmount}</td>

//                   <td>

//                     <span
//                       className={
//                         order.status === "confirmed"
//                           ? "status confirmed"
//                           : "status pending"
//                       }
//                     >
//                       {order.status}
//                     </span>

//                   </td>

//                   <td>

//                     <select
//                       value={order.status}
//                       onChange={async (e) => {

//                         await change_status_func(
//                           order._id,
//                           e.target.value
//                         );

//                         dashboard_summary_admin();

//                       }}
//                     >

//                       <option value="pending">
//                         Pending
//                       </option>

//                       <option value="confirmed">
//                         Confirmed
//                       </option>

//                     </select>

//                   </td>

//                   <td>
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </td>

//                 </tr>

//               ))
//             }

//           </tbody>

//         </table>

//       </div>

//       {/* ================= BOTTOM ================= */}

//       <div className="dashboard-bottom">

//         {/* LOW STOCK */}

//         <div className="dashboard-box">

//           <div className="box-heading">

//             <h2>
//               Low Stock Products
//             </h2>

//           </div>

//           {

//             dashboard.low_stock_admin.map((item) => (

//               <div
//                 className="low-stock-item"
//                 key={item._id}
//               >

//                 <img
//                   src={`http://localhost:3000/images/${item.image}`}
//                   alt={item.title}
//                   className="product-image"
//                 />

//                 <div className="stock-info">

//                   <h4>{item.title}</h4>

//                   <p>
//                     Only {item.quantity} left
//                   </p>

//                 </div>

//               </div>

//             ))

//           }

//         </div>

//         {/* CUSTOMERS */}

//         <div className="dashboard-box">

//           <div className="box-heading">

//             <h2>
//               Recent Customers
//             </h2>

//           </div>

//           <table className="dashboard-table">

//             <thead>

//               <tr>

//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Joined</th>

//               </tr>

//             </thead>

//             <tbody>

//               {

//                 dashboard.recent_users_admin.map((user) => (

//                   <tr key={user.email}>

//                     <td>{user.name}</td>

//                     <td>{user.email}</td>

//                     <td>{user.date}</td>

//                   </tr>

//                 ))

//               }

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Admin_Dashboard;