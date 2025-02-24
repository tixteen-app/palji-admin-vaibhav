
// import React, { useState, useEffect } from "react";
// import "./Orders.css";
// import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { makeApi } from "../../api/callApi";
// import Loader from "../../components/loader/loader";


// const Orders = () => {
// const location = useLocation();
// const queryParams = new URLSearchParams(location.search);
// const Dstatus = queryParams.get("status") || "";
// const [orders, setOrders] = useState([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);
// // const [selectedStatus, setSelectedStatus] = useState("");
// const [selectedStatus, setSelectedStatus] = useState(Dstatus.toUpperCase());
// const [status, setStatus] = useState(Dstatus);


// useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const response = await makeApi(`/api/shiprocket/get-all-orders`, "GET");
//         setOrders(response.data.data.data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchOrders();
// }, []);
// const handleStatusChange = (newStatus) => {
//   setSelectedStatus(newStatus.toUpperCase()); // Ensure uppercase matching
//   setStatus(newStatus.toUpperCase());
// };


// if (loading) {
//   return <div className="loading" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }} >
//     <Loader/>
//   </div>;
// }

// if (error) {
//   return <div className="error">{error}</div>;
// }
// // Define the status class based on the order's status
// const getStatusClass = (status) => {
//   switch (status.toLowerCase()) {
//     case 'pending':
//       return 'pending';
//     case 'shipped':
//       return 'shipped';
//     case 'delivered':
//       return 'delivered';
//     case 'canceled':
//       return 'canceled';
//     case 'new':  // New status added
//       return 'new';
//     default:
//       return 'default';
//   }
// };


//   return (
//     <div className="all-orders-container">
//       <div className="all_orders_status_buttons">
//         <button
//           className={`admin_add_product_button  ${selectedStatus === "Pending" ? "selectedStatus" : ""}`}
//           onClick={() => handleStatusChange("new")}
//         >
//           Pending Orders
//         </button>
//         {/* <button
//           className={`admin_add_product_button ${selectedStatus === "Cancelled" ? "selectedStatus" : ""}`}
//           onClick={() => handleStatusChange("Cancelled")}
//         >
//           Cancelled Orders
//         </button> */}
//         <button
//           className={`admin_add_product_button ${selectedStatus === "Shipped" ? "selectedStatus" : ""}`}
//           onClick={() => handleStatusChange("Shipped")}
//         >
//           Shipped Orders
//         </button>
//         <button
//           className={`admin_add_product_button ${selectedStatus === "Delivered" ? "selectedStatus" : ""}`}
//           onClick={() => handleStatusChange("Delivered")}
//         >
//           Delivered Orders
//         </button>
//       </div>
//       <div className="main_order_list_container">
//         {orders.length === 0 ? (
//           <p className="no-orders">No orders found.</p>
//         ) : (
//           orders.map((order) => (
//             <div key={order.id} className="order-list " style={{ width: "40%" }} >
//               <div className="order_list_container">
//                 <div className="order_item_details">
//                   <div className="d-flex" >
//                     <div> <b> Order ID:</b></div><div> {order.channel_order_id}</div>
//                   </div>
//                 </div>
//                 <div className="d-flex" >
//                   <div> <b> Id: </b></div><div> {order.id}</div>
//                 </div>
//                 <div>
//                   <b> status </b> :
//                   <span className={`status ${getStatusClass(order.status)}`}>
//                     {order.status}
//                   </span>
//                 </div>

//                 {/* Customer Info */}
//                 <div className="order_details">
//                   <div><strong>Customer Name:</strong> {order.customer_name}</div>
//                   <div><strong>Email:</strong> {order.customer_email}</div>
//                   <div><strong>Phone:</strong> {order.customer_phone}</div>
//                   <div><strong>Address:</strong> {order.customer_city}, {order.customer_state}, {order.customer_pincode}</div>
//                 </div>

//                 {/* Product Info */}
//                 <div className=" d-flex flex-column gap-5 py-5">
//                   {order.others.order_items.map((product) => (
//                     <>
//                     <Link to={`/admin/product-details/${product.product_id}`} target="_blank" style={{ textDecoration: "none" , color: "black" }} >
//                     <div key={product.id} className="d-flex text-center">
//                       <div>
//                         <img
//                           src={product.product_image}
//                           alt={product.name}
//                           className="product-thumbnail"
//                         />
//                       </div>
//                       <div className="product-details d-flex flex-column gap-1 align-items-baseline  ">
//                         <div><strong>Product:</strong> {product.name}</div>
//                         <div><strong>Quantity:</strong> {product.units}</div>
//                         <div><strong>Price:</strong> ₹{product.selling_price}</div>
//                         <div><strong>Total Price:</strong> ₹{product.selling_price * product.units}</div>
//                       </div>
//                     </div>
//                     </Link>
//                     </>
//                   ))}
//                 </div>
//                 {/* Total Amount */}
//                 <div className="all_order_price_details py-2" style={{ borderTop: "1px solid gray " }}>
//                   <div><strong>Total Amount:</strong> ₹{order.total}</div>
//                 </div>
//                 {/* Shipping Info */}
//                 <div className="all_order_shippingAddress py-3" style={{ borderTop: "1px solid gray " }} >
//                   <h5>Shipping Details</h5>
//                   {order.shipments.map((shipment) => (
//                     <div key={shipment.id}>
//                       <div><strong>Dimensions:</strong> {shipment.dimensions}</div>
//                       <div><strong>Weight:</strong> {shipment.weight}kg</div>
//                       <div><strong>Shipping Charges:</strong> ₹{shipment.shipping_charges || "N/A"}</div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Buttons */}
//               </div>
//               <div className="all_order_buttons_div all_order_buttons_div_for_shiprocket">
//                 <Link target="_blank" to={`/admin/order/${order.id}`} >
//                   <button className="all_order_order_view_button">View</button>
//                 </Link>
//                 {/* <button className="all_order_order_update_button">cancel order</button> */}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Orders;




// import React, { useState, useEffect } from "react";
// import "./Orders.css";
// import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { makeApi } from "../../api/callApi";
// import Loader from "../../components/loader/loader";



// function Orders() {

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const Dstatus = queryParams.get("status") || "";
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // const [selectedStatus, setSelectedStatus] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState(Dstatus.toUpperCase());
//   const [status, setStatus] = useState(Dstatus);


//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const response = await makeApi(`/api/shiprocket/get-all-orders`, "GET");
//         setOrders(response.data.data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchOrders();
//   }, []);
//   const handleStatusChange = (newStatus) => {
//     setSelectedStatus(newStatus.toUpperCase()); // Ensure uppercase matching
//     setStatus(newStatus.toUpperCase());
//   };


//   if (loading) {
//     return <div className="loading" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }} >
//       <Loader />
//     </div>;
//   }

//   if (error) {
//     return <div className="error">{error}</div>;
//   }
//   // Define the status class based on the order's status
//   const getStatusClass = (status) => {
//     switch (status.toLowerCase()) {
//       case 'pending':
//         return 'pending';
//       case 'shipped':
//         return 'shipped';
//       case 'delivered':
//         return 'delivered';
//       case 'canceled':
//         return 'canceled';
//       case 'new':
//         return 'new';
//       default:
//         return 'default';
//     }
//   };



//   return (
//     <section className='orders-section'>
//       <div className='orders-buttons'>
//         <button>Pending Orders</button>
//         <button>Shipped Orders</button>
//         <button>Delivered Orders</button>
//       </div>

//       {orders?.length === 0 ? (
//         <p className="no-orders">No orders found.</p>
//       ) : (
//         <div className='Grid'>
//           {orders?.map((order) => (
//             <>
//               <Link target="_blank" to={`/admin/order/${order.id}`} style={{ textDecoration: "none" , color:"black" }} >
//               <div className="receipt-container">
//                 <div>
//                   <div class="order-id"><strong>Order ID:</strong> {order.channel_order_id}</div>
//                   <p >Id: {order.id}</p>
//                 </div>
//                 <div className="customer-section">
//                   <div className="customer-info">
//                     <p className="customer-name">Customer Name: {order.customer_name}</p>
//                     <p>Email: {order.customer_email}</p>
//                     <p>Phone: {order.customer_phone}</p>
//                     <p>Address: {order.customer_address}</p>
//                   </div>
//                   <div className="status-badge">
//                     <span>{order.status}</span>
//                   </div>
//                 </div>

//                 <div className="divider"></div>

//                 <div className="order-items">
//                   {order.others.order_items.map((product) => (<>

//                     <div className="item-card">
//                       <div className="item-image">
//                         <img src={product.product_image} alt="Blue Hand Bag Hamper" />
//                       </div>
//                       <div className="item-details">
//                         <p className="item-name"> {product.name} </p>
//                         <p>Quantity: {product.units}</p>
//                         <p>Price: ₹{product.selling_price}</p>
//                         <p>Total Price: <b> ₹{product.units * product.selling_price}</b></p>
//                       </div>
//                     </div>
//                   </>))}

//                 </div>

//                 <div className="divider"></div>

//                 <div className="total-amount">
//                   <p>Total Amount: ₹{order.total}</p>
//                 </div>

//                 <div className="divider"></div>

//                 <div className="shipping-details">
//                   <p className="section-title">Shipping Details</p>
//                   <p>Dimensions: 10x10x10</p>
//                   <p>Weight: 10kg</p>
//                   <p>Shipping Charges: ₹N/A</p>
//                 </div>
//               </div>
//               </Link>
//             </>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// export default Orders;


import React, { useState, useEffect } from "react";
import "./Orders.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";

function Orders() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const Dstatus = queryParams.get("status") || "NEW";
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(Dstatus.toUpperCase());

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await makeApi(`/api/shiprocket/get-all-orders?status=${selectedStatus}`, "GET");
        setOrders(response.data.data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [selectedStatus]);

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus.toUpperCase()); 
    navigate(`/admin/all-orders?status=${newStatus.toLowerCase()}`);
  };

  if (loading) {
    return <div className="loading" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Loader />
    </div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <section className="orders-section">
      <div className="orders-buttons">
        <button 
          className={selectedStatus === "NEW" ? "active" : ""} 
          onClick={() => handleStatusChange("NEW")}
        >
          Pending Orders
        </button>
        <button 
          className={selectedStatus === "DELIVERED" ? "active" : ""} 
          onClick={() => handleStatusChange("DELIVERED")}
        >
          Delivered Orders
        </button>
        <button 
          className={selectedStatus === "CANCELED" ? "active" : ""} 
          onClick={() => handleStatusChange("CANCELED")}
        >
          Canceled Orders
        </button>
      </div>

      {orders?.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="Grid">
          {orders?.map((order) => (
            <Link target="_blank" to={`/admin/order/${order.id}`} style={{ textDecoration: "none" , color:"black" }} >
            <div className="receipt-container">
              <div>
                <div class="order-id"><strong>Order ID:</strong> {order.channel_order_id}</div>
                <p >Id: {order.id}</p>
              </div>
              <div className="customer-section">
                <div className="customer-info">
                  <p className="customer-name">Customer Name: {order.customer_name}</p>
                  <p>Email: {order.customer_email}</p>
                  <p>Phone: {order.customer_phone}</p>
                  <p>Address: {order.customer_address}</p>
                </div>
                <div className="status-badge">
                  <span>{order.status}</span>
                </div>
              </div>

              <div className="divider"></div>

              <div className="order-items">
                {order.others.order_items.map((product) => (
                  <>

                  <div className="item-card">
                    <div className="item-image">
                      <img src={product.product_image} alt="Blue Hand Bag Hamper" />
                    </div>
                    <div className="item-details">
                      <p className="item-name"> {product.name} </p>
                      <p>Quantity: {product.units}</p>
                      <p>Price: ₹{product.selling_price}</p>
                      <p>Total Price: <b> ₹{product.units * product.selling_price}</b></p>
                    </div>
                  </div>
                </>))}

              </div>

              <div className="divider"></div>

              <div className="total-amount">
                <p>Total Amount: ₹{order.total}</p>
              </div>

              <div className="divider"></div>

              <div className="shipping-details">
                <p className="section-title">Shipping Details</p>
                <p>Dimensions: {order?.others?.dimensions  || "N/A" }</p>
                <p>Weight: 10kg</p>
                <p>Shipping Charges: ₹N/A</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default Orders;
