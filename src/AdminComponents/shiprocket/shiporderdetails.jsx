import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import Loader from '../../components/loader/loader';

const OrderDetails = () => {
  const { id } = useParams();
  const orderID = Number(id);

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
      const response = await makeApi(
          `/api/shiprocket/get-order-by-id/${orderID}`,
          "GET"
        );
        setOrderData(response.data.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <div>
      <div className="loading" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }} >
      <Loader/>
    </div>
    </div>;
  }

  if (!orderData) {
    return <div>Error loading order details</div>;
  }

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
  } = orderData;

  return (
    <div className=" order_payment_details_section order_details_cards">
        <div>
            <Link to={"/admin/all-orders"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="36"
                fill="currentColor"
                className="bi bi-arrow-left back_arrow_icon"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
          </div>
      <div className="main_mini_order_dashboard_div">
        <h1>Order Details</h1>
      </div>
      <div className='order_details_main_section' >
      <div className="order_details_cards">
          <p><strong>Staus:</strong> {orderData.status}</p>
        </div>

        {/* User Details */}
        <div className="order_details_cards">
          <h2>User Details</h2>
          <p><strong>Name:</strong> {customer_name}</p>
          <p><strong>Email:</strong> {customer_email}</p>
          <p><strong>Phone:</strong> {customer_phone}</p>
        </div>

        {/* Shipping Address */}
        <div className="order_details_cards">
          <h2>Shipping Address</h2>
          <p>{customer_address}</p>
          <p>{customer_city}, {customer_state}, {customer_country}</p>
          <p><strong>Postal Code:</strong> {customer_pincode}</p>
        </div>

        {/* Payment Details */}
        <div className="order_details_cards">
          <h2>Payment Details</h2>
          <p><strong>Payment Method:</strong> {payment_method || 'N/A'}</p>
          <p><strong>Total Amount:</strong> ₹{total}</p>
          <p><strong>Net Total:</strong> ₹{net_total}</p>
        </div>
      </div>
      {orderData.pickup_address && (
        <div className="order_details_cards">
          <h2>Pickup Address</h2>
          <p><strong>Name:</strong> {orderData.pickup_address.name || "N/A"}</p>
          <p><strong>Phone:</strong> {orderData.pickup_address.phone || "N/A"}</p>
          <p>
            <strong>Address:</strong>{" "}
            {`${orderData.pickup_address.address || ""}, ${orderData.pickup_address.city || ""
              }, ${orderData.pickup_address.state || ""} - ${orderData.pickup_address.pin_code || "N/A"
              }`}
          </p>
        </div>
      )}
      {/* Order Items */}
      <div className="order_item_section order_details_cards">
        <h2>Order Items</h2>
        <div className="order_item_section d-flex flex-wrap gap-1">
          {orderData.others.order_items.map((product, index) => {
            return <div key={index} className="order_item_details_div">
              {/* Image Display */}
              <img src={product.product_image} alt={product.name} className="product-thumbnail" />
              <p><strong>Product Name:</strong> {product.name}</p>
              <p><strong>Quantity:</strong> {product.units}</p>
              <p><strong>Price:</strong> ₹{product.selling_price}</p>
              <p><strong>Total:</strong> ₹{product.selling_price * product.units}</p>
              <p>
                <b>Product Id:</b> <Link to={`/admin/product-details/${product.product_id}`} target="_blank" >View</Link>
              </p>

            </div>
          })}
        </div>
      </div>
         {/* Shipment Details */}
         <div className="order_details_cards">
          <h2>Shipment Details</h2>
          <p><strong>Status:</strong> {orderData.status}</p>
          {shipments && (
            <>
              <p> <strong>Shipment ID:</strong> {shipments.id || "N/A"}  </p>
              <p><strong>Order ID:</strong> {shipments.order_id || "N/A"}</p>
              <p><strong>Channel ID:</strong> {shipments.channel_id || "N/A"}</p>
              <p><strong>Code:</strong> {shipments.code || "N/A"}</p>
              <p><strong>Cost:</strong> {shipments.cost || "N/A"}</p>
              <p><strong>Tax:</strong> {shipments.tax || "N/A"}</p>
              <p><strong>AWB:</strong> {shipments.awb || "N/A"}</p>
              <p><strong>Last Mile AWB:</strong> {shipments.last_mile_awb || "N/A"}</p>
              <p><strong>ETD:</strong> {shipments.etd || "N/A"}</p>
              <p><strong>Quantity:</strong> {shipments.quantity || "N/A"}</p>
              <p><strong>Weight:</strong> {shipments.weight || "N/A"}</p>
              <p><strong>Dimensions:</strong> {shipments.dimensions || "N/A"}</p>
              <p><strong>Comment:</strong> {shipments.comment || "N/A"}</p>
              <p><strong>Courier:</strong> {shipments.courier || "N/A"}</p>
              <p><strong>Courier ID:</strong> {shipments.courier_id || "N/A"}</p>
              <p><strong>Manifest ID:</strong> {shipments.manifest_id || "N/A"}</p>
              <p><strong>Manifest Escalate:</strong> {shipments.manifest_escalate || "N/A"}</p>
              <p><strong>Status:</strong> {shipments.status || "N/A"}</p>
              <p><strong>ISD Code:</strong> {shipments.isd_code || "N/A"}</p>
              <p><strong>Created At:</strong> {shipments.created_at || "N/A"}</p>
              <p><strong>Updated At:</strong> {shipments.updated_at || "N/A"}</p>
              <p><strong>POD:</strong> {shipments.pod || "N/A"}</p>
              <p><strong>EWAY Bill Number:</strong> {shipments.eway_bill_number || "N/A"}</p>
              <p><strong>EWAY Bill Date:</strong> {shipments.eway_bill_date || "N/A"}</p>
              <p><strong>Length:</strong> {shipments.length || "N/A"}</p>
              <p><strong>Breadth:</strong> {shipments.breadth || "N/A"}</p>
              <p><strong>Height:</strong> {shipments.height || "N/A"}</p>
              <p><strong>RTO Initiated Date:</strong> {shipments.rto_initiated_date || "N/A"}</p>
              <p><strong>RTO Delivered Date:</strong> {shipments.rto_delivered_date || "N/A"}</p>
              <p><strong>Package Images:</strong> {shipments.package_images || "N/A"}</p>
              <p><strong>Is RTO:</strong> {shipments.is_rto || "N/A"}</p>
              <p><strong>EWAY Required:</strong> {shipments.eway_required || "N/A"}</p>
              <p><strong>Invoice Link:</strong> {shipments.invoice_link || "N/A"}</p>
              <p><strong>Is Darkstore Courier:</strong> {shipments.is_darkstore_courier || "N/A"}</p>
              <p><strong>Courier Custom Rule:</strong> {shipments.courier_custom_rule || "N/A"}</p>
              <p><strong>Is Single Shipment:</strong> {shipments.is_single_shipment || "N/A"}</p>
              <p><strong>Shipment Type:</strong> {shipments.shipment_type || "N/A"}</p>
              <p><strong>Shipment Mode:</strong> {shipments.shipment_mode || "N/A"}</p>
              <p><strong>Shipment Mode ID:</strong> {shipments.shipment_mode_id || "N/A"}</p>
              <p><strong>Shipment Mode Name:</strong> {shipments.shipment_mode_name || "N/A"}</p>
              <p><strong>Shipment Mode Type:</strong> {shipments.shipment_mode_type || "N/A"}</p>
              <p><strong>Shipment Mode Type ID:</strong> {shipments.shipment_mode_type_id || "N/A"}</p>
              <p><strong>Shipment Mode Type Name:</strong> {shipments.shipment_mode_type_name || "N/A"}</p>
              <p><strong>Shipment Mode Type Description:</strong> {shipments.shipment_mode_type_description || "N/A"}</p>
              <p><strong>Shipment Mode Type Code:</strong> {shipments.shipment_mode_type_code || "N/A"}</p>
              <p><strong>Shipment Mode Type Status:</strong> {shipments.shipment_mode_type_status || "N/A"}</p>
              <p><strong>Shipment Mode Type Created At:</strong> {shipments.shipment_mode_type_created_at || "N/A"}</p>
              <p><strong>Shipment Mode Type Updated At:</strong> {shipments.shipment_mode_type_updated_at || "N/A"}</p>

              <p><strong>Shipped Date:</strong> {shipments.shipped_date || "N/A"}</p>
              <p><strong>Delivered Date:</strong> {shipments.delivered_date || "N/A"}</p>
              <p><strong>Courier:</strong> {shipments.courier_name || "N/A"}</p>
              <p><strong>Tracking ID:</strong> {shipments.tracking_id || "N/A"}</p>
              <p>
                <strong>Tracking URL:</strong>{" "}
                {shipments.tracking_url ? (
                  <a href={shipments.tracking_url} target="_blank" rel="noopener noreferrer">
                    Track Order
                  </a>
                ) : (
                  "N/A"
                )}
              </p>
            </>
          )}
        </div>
    </div>
  );

};



export default OrderDetails;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useParams } from "react-router-dom";

// const OrderDetails = () => {
//   const { id } = useParams();
//   const orderID = Number(id);

//   const [orderData, setOrderData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:7000/api/shiprocket/get-order-by-id/${orderID}`
//         );
//         setOrderData(response.data.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching order details:', error);
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!orderData) {
//     return <div>Error loading order details</div>;
//   }

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
//     shipments, // Assuming shipment info is nested here
//     products,
//   } = orderData;

//   return (
//     <div className="order_payment_details_section order_details_cards">
//       <div className="main_mini_order_dashboard_div">
//         <h1>Order Details</h1>
//       </div>
//       <div className='order_details_main_section' >

//         {/* Order Status */}
//         <div className="order_details_cards">
//           <h2>Order Status</h2>
//           <p><strong>Status:</strong> {orderData.status}</p>
//           </div>
       

//         {/* User Details */}
//         <div className="order_details_cards">
//           <h2>User Details</h2>
//           <p><strong>Name:</strong> {customer_name}</p>
//           <p><strong>Email:</strong> {customer_email}</p>
//           <p><strong>Phone:</strong> {customer_phone}</p>
//         </div>

//         {/* Shipping Address */}
//         <div className="order_details_cards">
//           <h2>Shipping Address</h2>
//           <p>{customer_address}</p>
//           <p>{customer_city}, {customer_state}, {customer_country}</p>
//           <p><strong>Postal Code:</strong> {customer_pincode}</p>
//         </div>

//         {/* Payment Details */}
//         <div className="order_details_cards">
//           <h2>Payment Details</h2>
//           <p><strong>Payment Method:</strong> {payment_method || 'N/A'}</p>
//           <p><strong>Total Amount:</strong> ₹{total}</p>
//           <p><strong>Net Total:</strong> ₹{net_total}</p>
//         </div>
//       </div>

//       {/* Pickup Address */}
//       {orderData.pickup_address && (
//         <div className="order_details_cards">
//           <h2>Pickup Address</h2>
//           <p><strong>Name:</strong> {orderData.pickup_address.name || "N/A"}</p>
//           <p><strong>Phone:</strong> {orderData.pickup_address.phone || "N/A"}</p>
//           <p>
//             <strong>Address:</strong>{" "}
//             {`${orderData.pickup_address.address || ""}, ${orderData.pickup_address.city || ""
//               }, ${orderData.pickup_address.state || ""} - ${orderData.pickup_address.pin_code || "N/A"
//               }`}
//           </p>
//         </div>
//       )}

//       {/* Order Items */}
//       <div className="order_item_section order_details_cards">
//         <h2>Order Items</h2>
//         <div className="order_item_section d-flex flex-wrap gap-1">
//           {products.map((product, index) => (
//             <div key={index} className="order_item_details_div">
//               {/* Image Display */}
//               <img src={product.product_image} alt={product.name} className="product-thumbnail" />
//               <p><strong>Product Name:</strong> {product.name}</p>
//               <p><strong>Quantity:</strong> {product.units}</p>
//               <p><strong>Price:</strong> ₹{product.selling_price}</p>
//               <p><strong>Total:</strong> ₹{product.selling_price * product.units}</p>
//               <p>
//                 <strong>Product ID:</strong>{" "}
//                 <Link to={`/admin/product-details/${product.product_id}`} target="_blank">
//                   View
//                 </Link>
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//           {/* Shipment Details */}
//       <div className="order_details_cards">
//           <h2>Shipment Details</h2>
//           <p><strong>Status:</strong> {orderData.status}</p>
//           {shipments && (
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
//         </div>
//     </div>
//   );
// };

// export default OrderDetails;
