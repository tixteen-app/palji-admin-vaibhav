import React, { useEffect, useState } from "react";
import "../../adminCss/user/userdetails.css";
import { makeApi } from "../../api/callApi";
import { useNavigate, useParams } from "react-router-dom";

function Userdetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userDetails, setUserDetails] = useState(null);
  const [orders, setOrders] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await makeApi(`/api/get-user-details-by-id/${id}`, "GET");
      setUserDetails(response.data.secondorders[0]?.userId);
      setOrders(response.data.secondorders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="user-details-page">
      {userDetails ? (
        <div className="user-info">
          <img src={userDetails.userImage} alt="User Avatar" className="user-avatar" />
          <h2>
            {userDetails.firstName} {userDetails.lastName}
          </h2>
          <p>Email: <span>{userDetails.email}</span></p>
          <p>Role: <span>{userDetails.role}</span></p>
          <p>Country: <span>{userDetails.country}</span></p>
        </div>
      ) : (
        <p className="loading">Loading user details...</p>
      )}

      <h3 className="orders-title">Orders</h3>
      <div className="orders-container">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
            <p><strong>Total Price:</strong> ₹{order.CartId?.totalPrice}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Shipping Address:</strong></p>
            <p className="shipping-address">
              {order.shippingAddress.firstname} {order.shippingAddress.lastname},<br />
              {order.shippingAddress.address},<br />
              {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country} - {order.shippingAddress.pincode}
            </p>

            <h4>Order Items:</h4>
            <ul className="order-items">
              {order.CartId.orderItems.map((item) => (
                <li key={item._id}>
                  <img src={item.productId.thumbnail} alt={item.productId.name} className="product-thumbnail" />
                  <div className="item-details">
                    <p><strong>Product:</strong> {item.productId.name}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Price:</strong> ₹{item.singleProductPrice}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Userdetails;
