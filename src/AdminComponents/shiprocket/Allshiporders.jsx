

import React, { useState, useEffect } from "react";
import "./Orders.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import Localorders from "../Order/allorder";

function Orders() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const Dstatus = queryParams.get("status") || "NEW";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(Dstatus.toUpperCase());

  const [showlocalorders, setShowlocalorders] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await makeApi(`/api/shiprocket/get-all-orders?status=${selectedStatus}`, "GET");
        // const response = await makeApi(`/api/shiprocket/get-all-orders?status="PICKUP SCHEDULED"`, "GET");
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

    <>
      <div className="orders-buttons d-flex justify-content-center">
        <button
          className={showlocalorders === true ? "active" : ""}
          onClick={() => showlocalorders ? setShowlocalorders(false) : setShowlocalorders(true)}
        >
          Local Orders
        </button>
        <button
          className={showlocalorders === false ? "active" : ""}
          onClick={() => showlocalorders ? setShowlocalorders(false) : setShowlocalorders(true)}
        >
          Shiprocket Orders
        </button>
      </div>

      {showlocalorders ? (
        <>
          <Localorders />
        </>
      ) : <>
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
                <Link target="_blank" to={`/admin/order-shiprocket/${order.id}`} style={{ textDecoration: "none", color: "black" }} >
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
                      <p>Dimensions: {order?.others?.dimensions || "N/A"}</p>
                      {/* <p>Weight: 10kg</p> */}
                      {/* <p>Shipping Charges: ₹N/A</p> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </>}

    </>

  );
}

export default Orders;
