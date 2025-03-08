
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";

function Localorders() {
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
        const response = await makeApi(`/api/get-all-second-order`, "GET");
        console.log(response.data.Orders);
        setOrders(response.data.Orders);
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
            <Link
              target="_blank"
              to={`/admin/local-vaibhav-order/${order._id}`}
              style={{ textDecoration: "none", color: "black" }}
              key={order._id}
            >
              <div className="receipt-container">
                <div>
                  <div className="order-id">
                    <strong>Order ID:</strong> {order._id}
                  </div>
                  <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="customer-section">
                  <div className="customer-info">
                    <p className="customer-name">
                      Customer Name: {order.userId.firstName} {order.userId.lastName}
                    </p>
                    <p>Email: {order.userId.email}</p>
                    <p>Phone: {order.shippingAddress.phonenumber}</p>
                    <p>
                      Address: {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}, {order.shippingAddress.country} -{" "}
                      {order.shippingAddress.pincode}
                    </p>
                  </div>
                  <div className="status-badge">
                    <span>{order.status}</span>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="order-items">
                  {order.CartId.orderItems.map((item) => (
                    <div className="item-card" key={item._id}>
                      <div className="item-image">
                        <img src={item.productId.thumbnail} alt={item.productId.name} />
                      </div>
                      <div className="item-details">
                        <p className="item-name">{item.productId.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ₹{item.singleProductPrice}</p>
                        <p>
                          Total Price: <b>₹{item.totalPrice}</b>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="divider"></div>

                <div className="total-amount">
                  <p>Total Amount: ₹{order.CartId.totalPrice}</p>
                </div>

                <div className="divider"></div>

                <div className="shipping-details">
                  <p className="section-title">Shipping Details</p>
                  <p>Payment Method: {order.paymentMethod}</p>
                  <p>Currency: {order.currency}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default Localorders;