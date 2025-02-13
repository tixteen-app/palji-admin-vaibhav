
import React, { useState, useEffect } from "react";
import "./Orders.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";


const Orders = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Dstatus = queryParams.get("status") || "";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [status, setStatus] = useState(Dstatus);


  useEffect(() => {
    // Fetch API data
    // fetch("http://localhost:7000/api/shiprocket/get-all-orders")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.success) {
    //       setOrders(data.data.data);
    //     } else {
    //       setError("Failed to fetch orders.");
    //     }
      //   setLoading(false);
      // })
      // .catch((err) => {
      //   setError("Error fetching data.");
      //   setLoading(false);
      // });
      const fetchOrders = async () => {
        try {
          setLoading(true);
          const response = await makeApi(`/api/shiprocket/get-all-orders`, "GET");
          setOrders(response.data.data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      fetchOrders();
  }, []);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setSelectedStatus(newStatus);
  };

  if (loading) {
    return <div className="loading" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }} >
      <Loader/>
    </div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
  // Define the status class based on the order's status
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'pending';
      case 'shipped':
        return 'shipped';
      case 'delivered':
        return 'delivered';
      case 'canceled':
        return 'canceled';
      case 'new':  // New status added
        return 'new';
      default:
        return 'default';
    }
  };


  return (
    <div className="all-orders-container">
      <div className="all_orders_status_buttons">
        <button
          className={`admin_add_product_button  ${selectedStatus === "Pending" ? "selectedStatus" : ""}`}
          onClick={() => handleStatusChange("Pending")}
        >
          Pending Orders
        </button>
        <button
          className={`admin_add_product_button ${selectedStatus === "Cancelled" ? "selectedStatus" : ""}`}
          onClick={() => handleStatusChange("Cancelled")}
        >
          Cancelled Orders
        </button>
        <button
          className={`admin_add_product_button ${selectedStatus === "Shipped" ? "selectedStatus" : ""}`}
          onClick={() => handleStatusChange("Shipped")}
        >
          Shipped Orders
        </button>
        <button
          className={`admin_add_product_button ${selectedStatus === "Delivered" ? "selectedStatus" : ""}`}
          onClick={() => handleStatusChange("Delivered")}
        >
          Delivered Orders
        </button>
      </div>
      <div className="main_order_list_container">
        {orders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-list " style={{ width: "30%" }} >
              <div className="order_list_container">
                <div className="order_item_details">
                  <div className="d-flex" >
                    <div> <b> Order ID:</b></div><div> {order.channel_order_id}</div>
                  </div>
                </div>
                <div className="d-flex" >
                  <div> <b> Id: </b></div><div> {order.id}</div>
                </div>
                <div>
                  <b> status </b> :
                  <span className={`status ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="order_details">
                  <div><strong>Customer Name:</strong> {order.customer_name}</div>
                  <div><strong>Email:</strong> {order.customer_email}</div>
                  <div><strong>Phone:</strong> {order.customer_phone}</div>
                  <div><strong>Address:</strong> {order.customer_city}, {order.customer_state}, {order.customer_pincode}</div>
                </div>

                {/* Product Info */}
                <div className=" d-flex flex-column gap-5 py-5">
                  {order.others.order_items.map((product) => (
                    <>
                    <Link to={`/admin/product-details/${product.product_id}`} target="_blank" style={{ textDecoration: "none" , color: "black" }} >
                    <div key={product.id} className="d-flex text-center">
                      <div>
                        <img
                          src={product.product_image}
                          alt={product.name}
                          className="product-thumbnail"
                        />
                      </div>
                      <div className="product-details d-flex flex-column gap-1 align-items-baseline  ">
                        <div><strong>Product:</strong> {product.name}</div>
                        <div><strong>Quantity:</strong> {product.units}</div>
                        <div><strong>Price:</strong> ₹{product.selling_price}</div>
                        <div><strong>Total Price:</strong> ₹{product.selling_price * product.units}</div>
                      </div>
                    </div>
                    </Link>
                    </>
                  ))}
                </div>
                {/* Total Amount */}
                <div className="all_order_price_details py-2" style={{ borderTop: "1px solid gray " }}>
                  <div><strong>Total Amount:</strong> ₹{order.total}</div>
                </div>
                {/* Shipping Info */}
                <div className="all_order_shippingAddress py-3" style={{ borderTop: "1px solid gray " }} >
                  <h5>Shipping Details</h5>
                  {order.shipments.map((shipment) => (
                    <div key={shipment.id}>
                      <div><strong>Dimensions:</strong> {shipment.dimensions}</div>
                      <div><strong>Weight:</strong> {shipment.weight}kg</div>
                      <div><strong>Shipping Charges:</strong> ₹{shipment.shipping_charges || "N/A"}</div>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
              </div>
              <div className="all_order_buttons_div all_order_buttons_div_for_shiprocket">
                <Link target="_blank" to={`/admin/order/${order.id}`} >
                  <button className="all_order_order_view_button">View</button>
                </Link>
                <button className="all_order_order_update_button">cancel order</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;

