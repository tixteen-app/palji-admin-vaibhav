// import React, { useState, useEffect } from "react";
// import { makeApi } from "../../api/callApi";
// import "../../adminCss/order/updateorder.css";

// const UpdateOrderPopup = ({ orderId, onClose }) => {
//   const [order, setOrder] = useState(null);
//   const [updatedOrderData, setUpdatedOrderData] = useState({
//     paymentMethod: "",
//     isPaid: false,
//     paidAt: "",
//     isDelivered: false,
//     deliveredAt: "",
//     status: "",
//   });

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await makeApi(
//           `/api/get-second-order-by-id/${orderId}`,
//           "GET"
//         );
//         setOrder(response.data.secondorder);
//         setUpdatedOrderData({
//           paymentMethod: response.data.secondorder.paymentMethod,
//           isPaid: response.data.secondorder.isPaid,
//           paidAt: response.data.secondorder.paidAt,
//           isDelivered: response.data.secondorder.isDelivered,
//           deliveredAt: response.data.secondorder.deliveredAt,
//           status: response.data.secondorder.status,
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedOrderData({
//       ...updatedOrderData,
//       [name]: value,
//     });
//   };

 
//   const handleUpdateOrder = async () => {
//     try {
//       const response = await makeApi(
//         `/api/update-second-order-by-id/${orderId}`,
//         "PUT",
//         updatedOrderData
//       );
//       console.log(response, "udpated");
//       onClose();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleClose = () => {
//     onClose();
//   };

//   return (
//     <div className="popup-container">
//       {order && (
//         <div className="popup-content-for-update-page">
//           <h2>Update Order</h2>
//           <div className="update_page_payment_details">
//             <h3>Payment Details:</h3>
//             <label>Payment Method:</label>
//             <input
//               type="text"
//               className="update_order_input_fileds"
//               name="paymentMethod"
//               value={updatedOrderData.paymentMethod}
//               onChange={handleInputChange}
//             />
//             <div>
//               <label>Is Paid:</label>
//               <select
//                 name="isPaid"
//                 className="update_order_input_fileds"
//                 value={updatedOrderData.isPaid}
//                 onChange={handleInputChange}
//               >
//                 <option value="true">Yes</option>
//                 <option value="false">No</option>
//               </select>
//             </div>
//             <div>
//               <label>Paid At:</label>
//               <input
//                 type="datetime-local"
//                 className="update_order_input_fileds"
//                 name="paidAt"
//                 value={updatedOrderData.paidAt}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div>
//               <label>Is Delivered:</label>
//               <select
//                 name="isDelivered"
//                 className="update_order_input_fileds"
//                 value={updatedOrderData.isDelivered}
//                 onChange={handleInputChange}
//               >
//                 <option value="true">Yes</option>
//                 <option value="false">No</option>
//               </select>
//             </div>
//             <div>
//               <label>Delivered At:</label>
//               <input
//                 type="datetime-local"
//                 className="update_order_input_fileds"
//                 name="deliveredAt"
//                 value={updatedOrderData.deliveredAt}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div>
//               <label>Status:</label>
//               <select
//                 name="status"
//                 className="update_order_input_fileds"
//                 value={updatedOrderData.status}
//                 onChange={handleInputChange}
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Cancelled">Cancelled</option>
//                 <option value="Delivered">Delivered</option>
//                 <option value="Shipped">Shipped</option>
//               </select>
//             </div>
//           </div>
//           <div className="button-group">
//             <button onClick={handleClose}>Close</button>
//             <button onClick={handleUpdateOrder}>Update Order</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdateOrderPopup;


import React, { useState, useEffect } from "react";
import { makeApi } from "../../api/callApi";
import "../../adminCss/order/updateorder.css";

const UpdateOrderPopup = ({ orderId, onClose }) => {
  const [order, setOrder] = useState(null);
  const [updatedOrderData, setUpdatedOrderData] = useState({
    paymentMethod: "",
    isPaid: false,
    paidAt: "",
    isDelivered: false,
    deliveredAt: "",
    status: "",
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await makeApi(
          `/api/get-second-order-by-id/${orderId}`,
          "GET"
        );
        const orderData = response.data.secondorder;
        setOrder(orderData);
        setUpdatedOrderData({
          paymentMethod: orderData.paymentMethod,
          isPaid: orderData.isPaid,
          paidAt: orderData.paidAt ? new Date(orderData.paidAt).toISOString().slice(0, 16) : "",
          isDelivered: orderData.isDelivered,
          deliveredAt: orderData.deliveredAt ? new Date(orderData.deliveredAt).toISOString().slice(0, 16) : "",
          status: orderData.status,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrderData({
      ...updatedOrderData,
      [name]: value,
    });
  };

  const handleUpdateOrder = async () => {
    try {
      const response = await makeApi(
        `/api/update-second-order-by-id/${orderId}`,
        "PUT",
        updatedOrderData
      );
      console.log(response, "updated");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="popup-container">
      {order && (
        <div className="popup-content-for-update-page">
          <h2>Update Order</h2>
          <div className="update_page_payment_details">
            <h3>Payment Details:</h3>
            <label>Payment Method:</label>
            <input
              type="text"
              className="update_order_input_fileds"
              name="paymentMethod"
              value={updatedOrderData.paymentMethod}
              onChange={handleInputChange}
            />
            {updatedOrderData.status !== "Delivered" && (
              <div>
                <label>Is Paid:</label>
                <select
                  name="isPaid"
                  className="update_order_input_fileds"
                  value={updatedOrderData.isPaid}
                  onChange={handleInputChange}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            )}
            <div>
              <label>Paid At:</label>
              <input
                type="datetime-local"
                className="update_order_input_fileds"
                name="paidAt"
                value={updatedOrderData.paidAt}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>paymentMethod</label>
              <select
                name="paymentMethod"
                className="update_order_input_fileds"
                value={updatedOrderData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="Cash On Delievery">Cash On Delievery</option>
                <option value="Razorpay">Razorpay</option>
              </select>
            </div>
            <div>
              <label>Is Delivered:</label>
              <select
                name="isDelivered"
                className="update_order_input_fileds"
                value={updatedOrderData.isDelivered}
                onChange={handleInputChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label>Delivered At:</label>
              <input
                type="datetime-local"
                className="update_order_input_fileds"
                name="deliveredAt"
                value={updatedOrderData.deliveredAt}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Status:</label>
              <select
                name="status"
                className="update_order_input_fileds"
                value={updatedOrderData.status}
                onChange={handleInputChange}
              >
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Delivered">Delivered</option>
                <option value="Shipped">Shipped</option>
              </select>
            </div> 

          </div>
          <div className="button-group">
            <button onClick={handleClose}>Close</button>
            <button onClick={handleUpdateOrder}>Update Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateOrderPopup;
