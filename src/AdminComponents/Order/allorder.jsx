
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { makeApi } from "../../api/callApi";
// import Loader from "../../components/loader/loader";

// function Localorders() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const Dstatus = queryParams.get("status") || "NEW";

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedStatus, setSelectedStatus] = useState(Dstatus.toUpperCase());

//   const [showlocalorders, setShowlocalorders] = useState(false);


//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const response = await makeApi(`/api/get-all-second-order`, "GET");
//         console.log(response.data.Orders);
//         setOrders(response.data.Orders);
//       } catch (error) {
//         console.log(error);
//         setError("Failed to fetch orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [selectedStatus]);

//   const handleStatusChange = (newStatus) => {
//     setSelectedStatus(newStatus.toUpperCase());
//     navigate(`/admin/all-orders?status=${newStatus.toLowerCase()}`);
//   };

//   if (loading) {
//     return (
//       <div
//         className="loading"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <Loader />
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   return (
//     <>
//       <div className="orders-buttons d-flex justify-content-center">
//         <button
//           className={showlocalorders === true ? "active" : ""}
//         // onClick={() => showlocalorders ? setShowlocalorders(false) : setShowlocalorders(true)}
//         >
//           <Link to={"/admin/localorders"} style={{ textDecoration: "none", color:"white" }} >
//             Local Orders
//           </Link>
//         </button>
//         <button
//           className={showlocalorders === false ? "active" : ""}
//         // onClick={() => showlocalorders ? setShowlocalorders(false) : setShowlocalorders(true)}
//         >
//           <Link to={"/admin/all-orders?status=new"} style={{ textDecoration: "none" , color:"white"}} >
//             Shiprocket Orders
//           </Link>
//         </button>
//       </div>
//       <section className="orders-section">
//         <div className="orders-buttons">
//           <button
//             className={selectedStatus === "NEW" ? "active" : ""}
//             onClick={() => handleStatusChange("NEW")}
//           >
//             Pending Orders
//           </button>
//           <button
//             className={selectedStatus === "DELIVERED" ? "active" : ""}
//             onClick={() => handleStatusChange("DELIVERED")}
//           >
//             Delivered Orders
//           </button>
//           <button
//             className={selectedStatus === "CANCELED" ? "active" : ""}
//             onClick={() => handleStatusChange("CANCELED")}
//           >
//             Canceled Orders
//           </button>
//           <button
//             className={selectedStatus === "PICKUP SCHEDULED" ? "active" : ""}
//             onClick={() => handleStatusChange("PICKUP SCHEDULED")}
//           >
//             PICKUP SCHEDULED
//           </button>
//         </div>

//         {orders?.length === 0 ? (
//           <p className="no-orders">No orders found.</p>
//         ) : (
//           <div className="Grid">
//             {orders?.map((order) => (
//               <Link
//                 target="_blank"
//                 to={`/admin/local-vaibhav-order/${order._id}`}
//                 style={{ textDecoration: "none", color: "black" }}
//                 key={order._id}
//               >
//                 <div className="receipt-container">
//                   <div>
//                     <div className="order-id">
//                       <strong>Order ID:</strong> {order._id}
//                     </div>
//                     <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                   </div>
//                   <div className="customer-section">
//                     <div className="customer-info">
//                       <p className="customer-name">
//                         Customer Name: {order?.userId?.firstName} {order?.userId?.lastName}
//                       </p>
//                       <p>Email: {order?.userId?.email}</p>
//                       <p>Phone: {order?.shippingAddress?.phonenumber}</p>
//                       <p>
//                         Address: {order?.shippingAddress?.address}, {order?.shippingAddress?.city},{" "}
//                         {order?.shippingAddress?.state}, {order?.shippingAddress?.country} -{" "}
//                         {order?.shippingAddress?.pincode}
//                       </p>
//                     </div>
//                     <div className="status-badge">
//                       <span>{order?.status}</span>
//                     </div>
//                   </div>

//                   <div className="divider"></div>

//                   <div className="order-items">
//                     {order.CartId.orderItems.map((item) => (
//                       <div className="item-card" key={item._id}>
//                         <div className="item-image">
//                           <img src={item.productId.thumbnail} alt={item.productId.name} />
//                         </div>
//                         <div className="item-details">
//                           <p className="item-name">{item.productId.name}</p>
//                           <p>Quantity: {item.quantity}</p>
//                           <p>Price: ₹{item.singleProductPrice}</p>
//                           <p>
//                             Total Price: <b>₹{item.totalPrice}</b>
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="divider"></div>

//                   <div className="total-amount">
//                     <p>Total Amount: ₹{order.CartId.totalPrice}</p>
//                   </div>

//                   <div className="divider"></div>

//                   <div className="shipping-details">
//                     <p className="section-title">Shipping Details</p>
//                     <p>Payment Method: {order.paymentMethod}</p>
//                     <p>Currency: {order.currency}</p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </section>
//     </>
//   );
// }

// export default Localorders;


// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { makeApi } from "../../api/callApi";
// import Loader from "../../components/loader/loader";

// function Localorders() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const Dstatus = queryParams.get("status") || "Pending";

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedStatus, setSelectedStatus] = useState("Pending");
//   const [showlocalorders, setShowlocalorders] = useState(true);
//   const [pincode, setPincode] = useState();
// // console.log("pincode",pincode);

//   const fetchpincode = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi(`/api/get-all-pincode`, "GET");
//       setPincode(response?.data.pincode);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchpincode();
//   }, []);


//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const response = await makeApi(`/api/get-all-second-order?status=${selectedStatus}`, "GET");
//         console.log("-=-=-",response.data.Orders);
//         setOrders(response.data.Orders);
//       } catch (error) {
//         console.log(error);
//         setError("Failed to fetch orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [selectedStatus]);

//   const handleStatusChange = (newStatus) => {
//     setSelectedStatus(newStatus);
//     navigate(`/admin/localorders?status=${newStatus.toLowerCase()}`);
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//     setShowlocalorders(path === "/admin/localorders");
//   };

//   if (loading) {
//     return (
//       <div
//         className="loading"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <Loader />
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   return (
//     <>
//       <div className="orders-buttons d-flex justify-content-center">
//         <button
//           className={showlocalorders ? "active" : ""}
//           onClick={() => handleNavigation("/admin/localorders?status=pending")}
//         >
//           Local Orders
//         </button>
//         <button
//           className={!showlocalorders ? "active" : ""}
//           onClick={() => handleNavigation("/admin/all-orders?status=new")}
//         >
//           Shiprocket Orders
//         </button>
//       </div>

//       <section className="orders-section">
//         <div className="orders-buttons">
//           <button
//             className={selectedStatus === "Pending" ? "active" : ""}
//             onClick={() => handleStatusChange("Pending")}
//           >
//             Pending Orders
//           </button>
//           <button
//             className={selectedStatus === "DELIVERED" ? "active" : ""}
//             onClick={() => handleStatusChange("DELIVERED")}
//           >
//             Delivered Orders
//           </button>
//           <button
//             className={selectedStatus === "Canceled" ? "active" : ""}
//             onClick={() => handleStatusChange("Canceled")}
//           >
//             Canceled Orders
//           </button>
//           <button
//             className={selectedStatus === "PICKUP SCHEDULED" ? "active" : ""}
//             onClick={() => handleStatusChange("PICKUP SCHEDULED")}
//           >
//             PICKUP SCHEDULED
//           </button>
//         </div>

//         {orders?.length === 0 ? (
//           <p className="no-orders">No orders found.</p>
//         ) : (
//           <div className="Grid">
//             {orders?.map((order) => (
//               <div
//                 key={order._id}
//                 className="receipt-container"
//                 onClick={() => navigate(`/admin/local-vaibhav-order/${order._id}`)}
//               >
//                 <div>
//                   <div className="order-id">
//                     <strong>Order ID:</strong> {order._id}
//                   </div>
//                   <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                 </div>
//                 <div className="customer-section">
//                   <div className="customer-info">
//                     <p className="customer-name">
//                       Customer Name: {order?.userId?.firstName} {order?.userId?.lastName}
//                     </p>
//                     <p>Email: {order?.userId?.email}</p>
//                     <p>Phone: {order?.shippingAddress?.phonenumber}</p>
//                     <p>
//                       Address: {order?.shippingAddress?.address}, {order?.shippingAddress?.city},{" "}
//                       {order?.shippingAddress?.state}, {order?.shippingAddress?.country} -{" "}
//                       {order?.shippingAddress?.pincode}
//                     </p>
//                   </div>
//                   <div className="status-badge">
//                     <span>{order?.status}</span>
//                   </div>
//                 </div>

//                 <div className="divider"></div>

//                 <div className="order-items">
//                   {order.CartId.orderItems.map((item) => (
//                     <div className="item-card" key={item._id}>
//                       <div className="item-image">
//                         <img src={item.productId.thumbnail} alt={item.productId.name} />
//                       </div>
//                       <div className="item-details">
//                         <p className="item-name">{item.productId.name}</p>
//                         <p>Quantity: {item.quantity}</p>
//                         <p>Price: ₹{item.singleProductPrice}</p>
//                         <p>
//                           Total Price: <b>₹{item.totalPrice}</b>
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="divider"></div>

//                 <div className="total-amount">
//                   <p>Total Amount: ₹{order.CartId.totalPrice}</p>
//                 </div>

//                 <div className="divider"></div>

//                 <div className="shipping-details">
//                   <p className="section-title">Shipping Details</p>
//                   <p>Payment Method: {order.paymentMethod}</p>
//                   <p>Currency: {order.currency}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </>
//   );
// }

// export default Localorders;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";

function Localorders() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const Dstatus = queryParams.get("status") || "Pending";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [showlocalorders, setShowlocalorders] = useState(true);
  const [pincode, setPincode] = useState([]);

  const fetchpincode = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/get-all-pincode`, "GET");
      setPincode(response?.data.pincode);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchpincode();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await makeApi(`/api/get-all-second-order?status=${selectedStatus}`, "GET");
        
        // Filter orders based on pincode
        const filteredOrders = response.data.Orders.filter(order => {
          const orderPincode = order.shippingAddress.pincode.toString();
          return pincode.some(p => p.pincode === orderPincode);
        });

        setOrders(filteredOrders);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [selectedStatus, pincode]);

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    navigate(`/admin/localorders?status=${newStatus.toLowerCase()}`);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowlocalorders(path === "/admin/localorders");
  };

  if (loading) {
    return (
      <div
        className="loading"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <div className="orders-buttons d-flex justify-content-center">
        <button
          className={showlocalorders ? "active" : ""}
          onClick={() => handleNavigation("/admin/localorders?status=pending")}
        >
          Local Orders
        </button>
        <button
          className={!showlocalorders ? "active" : ""}
          onClick={() => handleNavigation("/admin/all-orders?status=new")}
        >
          Shiprocket Orders
        </button>
      </div>

      <section className="orders-section">
        <div className="orders-buttons">
          <button
            className={selectedStatus === "Pending" ? "active" : ""}
            onClick={() => handleStatusChange("Pending")}
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
            className={selectedStatus === "Canceled" ? "active" : ""}
            onClick={() => handleStatusChange("Canceled")}
          >
            Canceled Orders
          </button>
          <button
            className={selectedStatus === "PICKUP SCHEDULED" ? "active" : ""}
            onClick={() => handleStatusChange("PICKUP SCHEDULED")}
          >
            PICKUP SCHEDULED
          </button>
        </div>

        {orders?.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          <div className="Grid">
            {orders?.map((order) => (
              <div
                key={order._id}
                className="receipt-container"
                onClick={() => navigate(`/admin/local-vaibhav-order/${order._id}`)}
              >
                <div>
                  <div className="order-id">
                    <strong>Order ID:</strong> {order.orderId}
                  </div>
                  <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="customer-section">
                  <div className="customer-info">
                    <p className="customer-name">
                      Customer Name: {order?.userId?.firstName} {order?.userId?.lastName}
                    </p>
                    <p>Email: {order?.userId?.email}</p>
                    <p>Phone: {order?.shippingAddress?.phonenumber}</p>
                    <p>
                      Address: {order?.shippingAddress?.address}, {order?.shippingAddress?.city},{" "}
                      {order?.shippingAddress?.state}, {order?.shippingAddress?.country} -{" "}
                      {order?.shippingAddress?.pincode}
                    </p>
                  </div>
                  <div className="status-badge">
                    <span>{order?.status}</span>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="order-items">
                  {order?.CartId?.orderItems?.map((item) => (
                    <div className="item-card" key={item._id}>
                      <div className="item-image">
                        <img src={item?.productId?.thumbnail} alt={item?.productId?.name} />
                      </div>
                      <div className="item-details">
                        <p className="item-name">{item?.productId?.name}</p>
                        <p>Quantity: {item?.quantity}</p>
                        <p>Price: ₹{item?.singleProductPrice}</p>
                        <p>
                          Total Price: <b>₹{item?.totalPrice}</b>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="divider"></div>

                <div className="total-amount">
                  <p>Total Amount: ₹{order?.CartId?.totalPrice}</p>
                </div>

                <div className="divider"></div>

                <div className="shipping-details">
                  <p className="section-title">Shipping Details</p>
                  <p>Payment Method: {order?.paymentMethod}</p>
                  <p>Currency: {order?.currency}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Localorders;