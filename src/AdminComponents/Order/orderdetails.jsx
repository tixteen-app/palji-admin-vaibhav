// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { makeApi } from "../../api/callApi";
// import "../../adminCss/order/orderdetails.css";
// import Loader from "../../components/loader/loader";

// function Orderdetails() {
//   const [order, setOrder] = useState({});
//   const { id } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [orderData, setOrderData] = useState(null);

//   const [showPopup, setShowPopup] = useState(false);
//   const [showToaster, setShowToaster] = useState(false);
//   const [countdown, setCountdown] = useState(5);
//   const [undo, setUndo] = useState(false);


//   const fetchOrder = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi(`/api/get-second-order-by-id-shiprocket-id/${id}`, "GET");
//       setOrder(response?.data?.secondorder);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrder();
//   }, [id]);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await makeApi(
//           `/api/shiprocket/get-order-by-id/${id}`,
//           "GET"
//         );
//         await setOrderData(response?.data?.data?.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching order details:', error);
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [id]);
//     const getStatusClass = (status) => {
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

//   const cancelOrder = async () => {
//     try {
//       setLoading(true);
//       await makeApi(`/api/shiprocket/cancel-order-by-id/${id}`, "POST");
//       setOrder((prev) => ({ ...prev, status: "Canceled" }));
//     } catch (error) {
//       console.error("Error canceling order:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelClick = () => {
//     setShowPopup(true);
//   };

//   const confirmCancel = () => {
//     setShowPopup(false);
//     setShowToaster(true);
//     setCountdown(5);
//     setUndo(false);
//   };

//   useEffect(() => {
//     let timer;
//     if (showToaster && countdown > 0) {
//       timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
//     } else if (countdown === 0 && !undo) {
//       cancelOrder();
//       setShowToaster(false);
//     }

//     return () => clearTimeout(timer);
//   }, [showToaster, countdown, undo]);

//   const undoCancel = () => {
//     setUndo(true);
//     setShowToaster(false);
//   };


//   const {
//     customer_name,
//     customer_email,
//     customer_phone,
//     customer_address,
//     customer_city,
//     customer_state,
//     customer_country,
//     customer_pincode,
//     payment_method,
//     total,
//     net_total,
//     products,
//     shipments
//   } = orderData || {};

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="order-details-container">
//           <div>
//             <Link to={"/admin/all-orders"}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="26"
//                 height="36"
//                 fill="currentColor"
//                 className="bi bi-arrow-left back_arrow_icon"
//                 viewBox="0 0 16 16"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
//                 />
//               </svg>
//             </Link>
//           </div>
//           <h2>Order Details</h2>
//           {/* mini order dashboard */}
//           {order?.status !== ("CANCELED" || "Delivered" || "canceled" ) && (
//             <button onClick={handleCancelClick} className="cancel-btn">
//               Cancel Order
//             </button>
//           )}
//           <div className="main_mini_order_dashboard_div">
//             <div className="mini_order_dashboard_contact_div ">
//               <div>Status</div>
//               <div> <b>{orderData?.status}</b> </div>
//             </div>
//             <div className="mini_order_dashboard_contact_div">
//               <div>Order date</div>
//               <div>
//                 {new Date(order?.createdAt).toLocaleString("en-US", {
//                   timeZone: "UTC",
//                 })}
//               </div>
//             </div>
//             <div className="mini_order_dashboard_contact_div">
//               <div>isPaid</div>
//               <div>{order.isPaid ? "True" : "False"}</div>
//             </div>
//             {order?.status !== "Pending" && (
//               <div className="mini_order_dashboard_contact_div">
//                 {order?.status === "Delivered" && (
//                   <div>
//                     <div>Delivered date</div>
//                     <div>
//                       {new Date(order?.deliveredAt).toLocaleString("en-US", {
//                         timeZone: "UTC",
//                       })}
//                     </div>
//                   </div>
//                 )}
//                 {order?.status === "Shipped" && (
//                   <div>
//                     <div>Shipped date</div>
//                     <div>
//                       {new Date(order.shippedAt).toLocaleString("en-US", {
//                         timeZone: "UTC",
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//             <div className="mini_order_dashboard_contact_div">
//               <div>updatedAt</div>
//               <div>
//                 {new Date(order?.updatedAt).toLocaleString("en-US", {
//                   timeZone: "UTC",
//                 })}
//               </div>
//             </div>
//           </div>
  
//           <div className="order_details_main_section">
//             {/* user section */}
//             <div className="user_section order_details_cards">
//               <h3 className="order_details_header">User Details</h3>
//               <div>
//                 <img
//                   loading="lazy"
//                   src={order?.userId?.userImage}
//                   alt="User"
//                   className="user-image"
//                 />
//                 <p>
//                   <b>Name:</b>{" "}
//                   {`${order?.userId?.firstName} ${order?.userId?.lastName}`}
//                 </p>
//                 <p>
//                   <b>Email:</b> {order?.userId?.email}
//                 </p>
//                 <p>
//                   <b>Mobile Number:</b> {order?.userId?.mobileNumber}
//                 </p>
//               </div>
//             </div>
  
//             {/* shipping address */}
//             <div className="order_shipping_address_section order_details_cards">
//               <h3 className="order_details_header">Shipping Address</h3>
//               <div>
//                 <p>
//                   <b>Firstname:</b> {order?.shippingAddress?.firstname}
//                 </p>
//                 <p>
//                   <b>Lastname:</b> {order?.shippingAddress?.lastname}
//                 </p>
//                 <p>
//                   <b>Phone Number:</b> {order?.shippingAddress?.phonenumber}
//                 </p>
//                 <p>
//                   <b>Address:</b> {order?.shippingAddress?.address}
//                 </p>
//                 <p>
//                   <b>Pincode:</b> {order?.shippingAddress?.pincode}
//                 </p>
//                 <p>
//                   <b>Country:</b> {order?.shippingAddress?.country}
//                 </p>
//                 <p>
//                   <b>State:</b> {order?.shippingAddress?.state}
//                 </p>
//                 <p>
//                   <b>City:</b> {order?.shippingAddress?.city}
//                 </p>
//               </div>

//               {shipments && (
//             <>
//               <p> <strong>Shipment ID:</strong> {shipments.id || "N/A"}  </p>
//               <p><strong>Order ID:</strong> {shipments.order_id || "N/A"}</p>
//               <p><strong>Channel ID:</strong> {shipments.channel_id || "N/A"}</p>
//               <p><strong>Code:</strong> {shipments.code || "N/A"}</p>
//               <p><strong>Cost:</strong> {shipments.cost || "N/A"}</p>
//               <p><strong>Tax:</strong> {shipments.tax || "N/A"}</p>
//               <p><strong>AWB:</strong> {shipments.awb || "N/A"}</p>
//               <p><strong>Last Mile AWB:</strong> {shipments.last_mile_awb || "N/A"}</p>
//               <p><strong>ETD:</strong> {shipments.etd || "N/A"}</p>
//               <p><strong>Quantity:</strong> {shipments.quantity || "N/A"}</p>
//               <p><strong>Weight:</strong> {shipments.weight || "N/A"}</p>
//               <p><strong>Dimensions:</strong> {shipments.dimensions || "N/A"}</p>
//               <p><strong>Comment:</strong> {shipments.comment || "N/A"}</p>
//               <p><strong>Courier:</strong> {shipments.courier || "N/A"}</p>
//               <p><strong>Courier ID:</strong> {shipments.courier_id || "N/A"}</p>
//               <p><strong>Manifest ID:</strong> {shipments.manifest_id || "N/A"}</p>
//               <p><strong>Manifest Escalate:</strong> {shipments.manifest_escalate || "N/A"}</p>
//               <p><strong>Status:</strong> {shipments.status || "N/A"}</p>
//               <p><strong>ISD Code:</strong> {shipments.isd_code || "N/A"}</p>
//               <p><strong>Created At:</strong> {shipments.created_at || "N/A"}</p>
//               <p><strong>Updated At:</strong> {shipments.updated_at || "N/A"}</p>
//               <p><strong>POD:</strong> {shipments.pod || "N/A"}</p>
//               <p><strong>EWAY Bill Number:</strong> {shipments.eway_bill_number || "N/A"}</p>
//               <p><strong>EWAY Bill Date:</strong> {shipments.eway_bill_date || "N/A"}</p>  
//               <p><strong>Length:</strong> {shipments.length || "N/A"}</p>
//               <p><strong>Breadth:</strong> {shipments.breadth || "N/A"}</p>
//               <p><strong>Height:</strong> {shipments.height || "N/A"}</p>
//               <p><strong>RTO Initiated Date:</strong> {shipments.rto_initiated_date || "N/A"}</p>
//               <p><strong>RTO Delivered Date:</strong> {shipments.rto_delivered_date || "N/A"}</p>
//               <p><strong>Package Images:</strong> {shipments.package_images || "N/A"}</p>
//               <p><strong>Is RTO:</strong> {shipments.is_rto || "N/A"}</p>
//               <p><strong>EWAY Required:</strong> {shipments.eway_required || "N/A"}</p>
//               <p><strong>Invoice Link:</strong> {shipments.invoice_link || "N/A"}</p>
//               <p><strong>Is Darkstore Courier:</strong> {shipments.is_darkstore_courier || "N/A"}</p>
//               <p><strong>Courier Custom Rule:</strong> {shipments.courier_custom_rule || "N/A"}</p>
//               <p><strong>Is Single Shipment:</strong> {shipments.is_single_shipment || "N/A"}</p>
//               <p><strong>Shipment Type:</strong> {shipments.shipment_type || "N/A"}</p>
//               <p><strong>Shipment Mode:</strong> {shipments.shipment_mode || "N/A"}</p>
//               <p><strong>Shipment Mode ID:</strong> {shipments.shipment_mode_id || "N/A"}</p>
//               <p><strong>Shipment Mode Name:</strong> {shipments.shipment_mode_name || "N/A"}</p>
//               <p><strong>Shipment Mode Type:</strong> {shipments.shipment_mode_type || "N/A"}</p>
//               <p><strong>Shipment Mode Type ID:</strong> {shipments.shipment_mode_type_id || "N/A"}</p>
//               <p><strong>Shipment Mode Type Name:</strong> {shipments.shipment_mode_type_name || "N/A"}</p>
//               <p><strong>Shipment Mode Type Description:</strong> {shipments.shipment_mode_type_description || "N/A"}</p>
//               <p><strong>Shipment Mode Type Code:</strong> {shipments.shipment_mode_type_code || "N/A"}</p>
//               <p><strong>Shipment Mode Type Status:</strong> {shipments.shipment_mode_type_status || "N/A"}</p>
//               <p><strong>Shipment Mode Type Created At:</strong> {shipments.shipment_mode_type_created_at || "N/A"}</p>
//               <p><strong>Shipment Mode Type Updated At:</strong> {shipments.shipment_mode_type_updated_at || "N/A"}</p>

//               <p><strong>Shipped Date:</strong> {shipments.shipped_date || "N/A"}</p>
//               <p><strong>Delivered Date:</strong> {shipments.delivered_date || "N/A"}</p>
//               <p><strong>Courier:</strong> {shipments.courier_name || "N/A"}</p>
//               <p><strong>Tracking ID:</strong> {shipments.tracking_id || "N/A"}</p>
//               <p>
//                 <strong>Tracking URL:</strong>{" "}
//                 {shipments.tracking_url ? (
//                   <a href={shipments.tracking_url} target="_blank" rel="noopener noreferrer">
//                     Track Order
//                   </a>
//                 ) : (
//                   "N/A"
//                 )}
//               </p>
//             </>
//           )}
//             </div>
  
//             {/* payment details */}
//             <div className="order_payment_details_section order_details_cards">
//               <h3>Payment Details</h3>
//               <div>
//                 <p><strong>Payment Method:</strong> {payment_method || 'N/A'}</p>
//                 <p>
//                   <b>Payment Type:</b> {order?.paymentMethod}
//                 </p>
//                 <p>
//                   <b>Total Price:</b> {order?.CartId?.totalPrice}
//                 </p>
//                 <p>
//                   <b>Shipping Price:</b> {order?.CartId?.shippingPrice}
//                 </p>
//                 <p>
//                   <b>Is Paid:</b> {order?.isPaid ? "Yes" : "No"}
//                 </p>
//                 <p>
//                   <b>Paid At:</b>{" "}
//                   {order?.paidAt
//                     ? new Date(order.paidAt).toLocaleString()
//                     : "Not Paid Yet"}
//                 </p>
//                 <p>
//                   <b>Is Delivered:</b> {order?.isDelivered ? "Yes" : "No"}
//                 </p>
//                 <p>
//                   <b>Delivered At:</b>{" "}
//                   {order?.deliveredAt
//                     ? new Date(order.deliveredAt).toLocaleString()
//                     : "Not Delivered Yet"}
//                 </p>
//                 <p>
//                   <b>Status:</b> {order?.status}
//                 </p>
//               </div>
//             </div>
  
//             {/* Pickup details */}
//             <div className="order_payment_details_section order_details_cards">
//               <h2>Pickup Address</h2>
//               <p><strong>Name:</strong> {orderData?.pickup_address?.name || "N/A"}</p>
//               <p><strong>Phone:</strong> {orderData?.pickup_address?.phone || "N/A"}</p>
//               <p>
//                 <strong>Address:</strong>{" "}
//                 {`${orderData?.pickup_address?.address || ""}, ${orderData?.pickup_address?.city || ""}, ${orderData?.pickup_address?.state || ""} - ${orderData?.pickup_address?.pin_code || "N/A"}`}
//               </p>
//             </div>
  
//             {/* order items */}
//           </div>
  
//           <div className="order_item_section order_details_cards">
//             <h3>Order Items</h3>
//             <div className="order_item_div_section_div">
//               {order?.CartId?.orderItems?.map((item, index) => (
//                 <div key={index} className="order_item_details_div p-4">
//                   <img
//                     loading="lazy"
//                     src={item?.productId?.thumbnail}
//                     alt="Product"
//                     className="product-thumbnail"
//                   />
//                   <p>
//                     <b>Name:</b> {item?.productId?.name}
//                   </p>
//                   <p>
//                     <b>Price:</b> {item?.productId?.price}
//                   </p>
//                   <p><b>Size:</b> {item?.size?.size} {item?.size?.sizetype}</p>
//                   <p>
//                     <b>Quantity:</b> {item?.quantity}
//                   </p>
//                   <p>
//                     <b>Total Price:</b> {item?.totalPrice}
//                   </p>
//                   <p>
//                     <b>Product Id:</b> <Link to={`/admin/product-details/${item?.productId._id}`} target="_blank">View</Link>
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {showPopup && (
//             <div className="popup">
//               <div className="popup-content">
//                 <h3>Are you sure you want to cancel this order?</h3>
//                 <div className="popup-actions">
//                   <button onClick={confirmCancel} className="confirm-btn">
//                     Confirm Cancel
//                   </button>
//                   <button onClick={() => setShowPopup(false)} className="close-btn">
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

// {showToaster && (
//             <div className="toaster">
//               <p>Order will be canceled in {countdown} seconds.</p>
//               <button onClick={undoCancel} className="undo-btn">
//                 Undo
//               </button>
//             </div>
//           )}

//         </div>
       

//       )}
//     </>
//   );
  
// }

// export default Orderdetails;

// // import React, { useEffect, useState } from "react";
// // import { Link, useParams } from "react-router-dom";
// // import { makeApi } from "../../api/callApi";
// // import "../../adminCss/order/orderdetails.css";
// // import Loader from "../../components/loader/loader";

// // function Orderdetails() {
//   // const [order, setOrder] = useState({});
//   // const { id } = useParams();
//   // const [loading, setLoading] = useState(false);
//   // const [orderData, setOrderData] = useState(null);
//   // const [showPopup, setShowPopup] = useState(false);
//   // const [showToaster, setShowToaster] = useState(false);
//   // const [countdown, setCountdown] = useState(5);
//   // const [undo, setUndo] = useState(false);

// //   const fetchOrder = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await makeApi(`/api/get-second-order-by-id-shiprocket-id/${id}`, "GET");
// //       setOrder(response.data.secondorder);
// //     } catch (error) {
// //       console.log(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOrder();
// //   }, [id]);

// //   useEffect(() => {
// //     const fetchOrderDetails = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await makeApi(
// //           `/api/shiprocket/get-order-by-id/${id}`,
// //           "GET"
// //         );
// //         setOrderData(response?.data?.data?.data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error('Error fetching order details:', error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchOrderDetails();
// //   }, [id]);

//   // const cancelOrder = async () => {
//   //   try {
//   //     setLoading(true);
//   //     await makeApi(`/api/cancel-order/${id}`, "POST");
//   //     setOrder((prev) => ({ ...prev, status: "Canceled" }));
//   //   } catch (error) {
//   //     console.error("Error canceling order:", error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const handleCancelClick = () => {
//   //   setShowPopup(true);
//   // };

//   // const confirmCancel = () => {
//   //   setShowPopup(false);
//   //   setShowToaster(true);
//   //   setCountdown(5);
//   //   setUndo(false);
//   // };

//   // useEffect(() => {
//   //   let timer;
//   //   if (showToaster && countdown > 0) {
//   //     timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
//   //   } else if (countdown === 0 && !undo) {
//   //     cancelOrder();
//   //     setShowToaster(false);
//   //   }

//   //   return () => clearTimeout(timer);
//   // }, [showToaster, countdown, undo]);

//   // const undoCancel = () => {
//   //   setUndo(true);
//   //   setShowToaster(false);
//   // };

// //   const getStatusClass = (status) => {
// //     switch (status?.toLowerCase()) {
// //       case "pending":
// //         return "pending";
// //       case "shipped":
// //         return "shipped";
// //       case "delivered":
// //         return "delivered";
// //       case "canceled":
// //         return "canceled";
// //       default:
// //         return "default";
// //     }
// //   };

// //   return (
// //     <>
// //       {loading ? (
// //         <Loader />
// //       ) : (
// //         <div className="order-details-container">
// //           <h2>Order Details</h2>

// //           {/* Cancel Order Button */}
//           // {order?.status !== ("Canceled" || "Delivered" || "canceled" ) && (
//           //   <button onClick={handleCancelClick} className="cancel-btn">
//           //     Cancel Order
//           //   </button>
//           // )}

// //           {/* Cancel Confirmation Popup */}
//           // {showPopup && (
//           //   <div className="popup">
//           //     <div className="popup-content">
//           //       <h3>Are you sure you want to cancel this order?</h3>
//           //       <div className="popup-actions">
//           //         <button onClick={confirmCancel} className="confirm-btn">
//           //           Confirm Cancel
//           //         </button>
//           //         <button onClick={() => setShowPopup(false)} className="close-btn">
//           //           Close
//           //         </button>
//           //       </div>
//           //     </div>
//           //   </div>
//           // )}

// //           {/* Toaster for Undo */}
//           // {showToaster && (
//           //   <div className="toaster">
//           //     <p>Order will be canceled in {countdown} seconds.</p>
//           //     <button onClick={undoCancel} className="undo-btn">
//           //       Undo
//           //     </button>
//           //   </div>
//           // )}

// //           {/* Order Details */}
// //           <div className={`order-status ${getStatusClass(orderData?.status)}`}>
// //             <h3>Status: {orderData?.status}</h3>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// // export default Orderdetails;


// import React from 'react';
// import "../../adminCss/order/orderdetails.css";


// const MyComponent = () => {
//   return (
//     <div className='main-orderdetail'>
//         <div className="order-header">
//             <a href="#" className="back-button">←</a>
//             <h1>Order Details</h1>
//             <button className="cancel-button">Cancel Order</button>
//         </div>
//         <div className="order-whole">
//         <div className="order-left">
//         <div className="status-section">
//             <div className="status-left">
//                 <p>Status</p>
//                 <span className="status-badge">SHIPPED</span>
//             </div>
//             <div className="status-right">
//                 <span>Order Date</span>
//                 <p>8:50:17 AM</p>
//                 <p> 20/02/2025</p>
//             </div>
//         </div>

//         {/* <div className="details-grid"> */}
//         <div className="user-box">
//             <h3 className="user-title">User Details</h3>
//             <p><span className='left-det'>Name:</span> <span className='right-det'>Username</span></p>
//             <p><span className='left-det'>Email:</span> <span className='right-det'>username@example.com</span></p>
//             <p><span className='left-det'>Phone:</span> <span className='right-det'>12345678</span> </p>
//         </div>

//         <div className="shipping-box">
//             <h3 className="shipping-title">Shipping Address</h3>
//             <p>SCF 22/16c, Jalandhar, Punjab</p>
//             <p>144001, India</p>
//         </div>
//         </div>
//         {/* left end */}
//         <div className="order-right">
//             <div className="order-right-top">
//         <div className="payment-box">
//             <h3 className="payment-title">Payment Details</h3>
//             <p><span className='left-det'>Method:</span> <span className='right-det'>Razorpay</span></p>
//             <p><span className='left-det'>Total Price:</span> <span className='right-det'>₹756</span></p>
//             <p><span className='left-det'>Status:</span> <span className='right-det'>Pending</span></p>
//         </div>

//         <div className="pickup-box">
//             <h3 className="pickup-title">Pickup Address</h3>
//             <p>Raju Bakery</p>
//             <p>9647656650</p>
//             <p>Raju Bakery, Ludhiana, Punjab - 144001</p>
//         </div>
//         </div>
//         {/* </div> */}
//         <div className="order-items-container">
//             <h3>Order Items</h3>
//         <div className="order-items">
            
//         <div className="item-card">
//             <div className="item-image">
//             <img src="" alt="Product" />
//             </div>
//             <div className="item-details">
//             <p className="item-name">BLUE HAND BAG HAMPER</p>
//             <div className="item-price">
//             <p>Quantity: 1</p>
//             <p>Price: ₹756</p>
//             <p>Total Price: ₹756</p>
//             </div>
//             </div>
//         </div>
//         <div className="item-card">
//             <div className="item-image">
//             <img src="" alt="Product" />
//             </div>
//             <div className="item-details">
//             <p className="item-name">BLUE HAND BAG HAMPER</p>
//             <div className="item-price">
//             <p>Quantity: 1</p>
//             <p>Price: ₹756</p>
//             <p>Total Price: ₹756</p>
//             </div>
//             </div>
//         </div>
        
//         <div className="item-card">
//             <div className="item-image">
//             <img src="" alt="Product" />
//             </div>
//             <div className="item-details">
//             <p className="item-name">BLUE HAND BAG HAMPER</p>
//             <div className="item-price">
//             <p>Quantity: 1</p>
//             <p>Price: ₹756</p>
//             <p>Total Price: ₹756</p>
//             </div>
//             </div>
//         </div>
//         <div className="item-card">
//             <div className="item-image">
//             <img src="" alt="Product" />
//             </div>
//             <div className="item-details">
//             <p className="item-name">BLUE HAND BAG HAMPER</p>
//             <div className="item-price">
//             <p>Quantity: 1</p>
//             <p>Price: ₹756</p>
//             <p>Total Price: ₹756</p>
//             </div>
//             </div>
//         </div>
//         </div>
//         </div>
//         </div>
//         </div>
//         </div>

//   );
// };
// export default MyComponent;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import "../../adminCss/order/orderdetails.css";
import Loader from "../../components/loader/loader";

const Orderdetails = () => {
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [undo, setUndo] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/get-second-order-by-id-shiprocket-id/${id}`, "GET");
      setOrder(response?.data?.secondorder);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await makeApi(
          `/api/shiprocket/get-order-by-id/${id}`,
          "GET"
        );
        await setOrderData(response?.data?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const cancelOrder = async () => {
    try {
      setLoading(true);
      await makeApi(`/api/shiprocket/cancel-order-by-id/${id}`, "POST");
      setOrder((prev) => ({ ...prev, status: "Canceled" }));
    } catch (error) {
      console.error("Error canceling order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    setShowPopup(true);
  };

  const confirmCancel = () => {
    setShowPopup(false);
    setShowToaster(true);
    setCountdown(5);
    setUndo(false);
  };

  useEffect(() => {
    let timer;
    if (showToaster && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0 && !undo) {
      cancelOrder();
      setShowToaster(false);
    }

    return () => clearTimeout(timer);
  }, [showToaster, countdown, undo]);

  const undoCancel = () => {
    setUndo(true);
    setShowToaster(false);
  };

  const {
    customer_name,
    customer_email,
    customer_phone,
    customer_address,
    customer_city,
    customer_state,
    customer_country,
    customer_pincode,
    payment_method,
    total,
    net_total,
    products,
    shipments
  } = orderData || {};

  return (
    <div className='main-orderdetail'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="order-header">
            <Link to={"/admin/all-orders"} className="back-button">←</Link>
            <h1>Order Details</h1>
            {order?.status !== ("CANCELED" || "Delivered" || "canceled" ) && (
              <button onClick={handleCancelClick} className="cancel-button">Cancel Order</button>
            )}
          </div>
          <div className="order-whole">
            <div className="order-left">
              <div className="status-section">
                <div className="status-left">
                  <p>Status</p>
                  <span className="status-badge">{orderData?.status}</span>
                </div>
                <div className="status-right">
                  <span>Order Date</span>
                  <p>{new Date(order?.createdAt).toLocaleString("en-US", { timeZone: "UTC" })}</p>
                </div>
              </div>

              <div className="user-box">
                <h3 className="user-title">User Details</h3>
                <p><span className='left-det'>Name:</span> <span className='right-det'>{`${order?.userId?.firstName} ${order?.userId?.lastName}`}</span></p>
                <p><span className='left-det'>Email:</span> <span className='right-det'>{order?.userId?.email}</span></p>
                <p><span className='left-det'>Phone:</span> <span className='right-det'>{order?.userId?.mobileNumber}</span></p>
              </div>

              <div className="shipping-box">
                <h3 className="shipping-title">Shipping Address</h3>
                <p>{`${order?.shippingAddress?.address}, ${order?.shippingAddress?.city}, ${order?.shippingAddress?.state} - ${order?.shippingAddress?.pincode}`}</p>
                <p>{order?.shippingAddress?.country}</p>
              </div>
            </div>

            <div className="order-right">
              <div className="order-right-top">
                <div className="payment-box">
                  <h3 className="payment-title">Payment Details</h3>
                  <p><span className='left-det'>Method:</span> <span className='right-det'>{order?.paymentMethod}</span></p>
                  <p><span className='left-det'>Total Price:</span> <span className='right-det'>₹{order?.CartId?.totalPrice}</span></p>
                  <p><span className='left-det'>Status:</span> <span className='right-det'>{order?.status}</span></p>
                </div>

                <div className="pickup-box">
                  <h3 className="pickup-title">Pickup Address</h3>
                  <p>{orderData?.pickup_address?.name || "N/A"}</p>
                  <p>{orderData?.pickup_address?.phone || "N/A"}</p>
                  <p>{`${orderData?.pickup_address?.address || ""}, ${orderData?.pickup_address?.city || ""}, ${orderData?.pickup_address?.state || ""} - ${orderData?.pickup_address?.pin_code || "N/A"}`}</p>
                </div>
              </div>

              <div className="order-items-container">
                <h3>Order Items</h3>
                <div className="order-items">
                  {order?.CartId?.orderItems?.map((item, index) => (
                    <div key={index} className="item-card">
                      <div className="item-image">
                        <img src={item?.productId?.thumbnail} alt="Product" />
                      </div>
                      <div className="item-details">
                        <p className="item-name">{item?.productId?.name}</p>
                        <div className="item-price">
                          <p>Quantity: {item?.quantity}</p>
                          <p>Price: ₹{item?.productId?.price}</p>
                          <p>Total Price: ₹{item?.totalPrice}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {showPopup && (
            // <div className="popup">
            //   <div className="popup-content">
            //     <h3>Are you sure you want to cancel this order?</h3>
            //     <div className="popup-actions">
            //       <button onClick={confirmCancel} className="confirm-btn">Confirm Cancel</button>
            //       <button onClick={() => setShowPopup(false)} className="close-btn">Close</button>
            //     </div>
            //   </div>
            // </div>
            <div className="new_add_cat_modal-overlay">
            <div className="new_add_cat_modal">
                <h2>Confirm Cancel </h2>
                <p>Are you sure you want to cancel this order?</p>
                <div className="new_add_cat_modal-actions">
                    <button className="new_add_cat_modal-deleteBtn" onClick={confirmCancel}>Confirm Cancel</button>
                    <button className="new_add_cat_modal-cancelBtn" onClick={() => setShowPopup(false)}>Cancel</button>
                </div>
            </div>
        </div>
          )}

          {showToaster && (
            <>
            <div className="toaster_for_undo">
              <p>Order will be canceled in {countdown} seconds.</p>
              <button onClick={undoCancel} className="undo_btn">Undo</button>
            </div>
            </>
          )}
        </>
      )}  
    </div>
  );
};

export default Orderdetails;