
import React, { useEffect, useState } from "react";
import "../../adminCss/order/allorder.css";
import { makeApi } from "../../api/callApi";
import { Link } from "react-router-dom";
import UpdateOrderPopup from "./updateorder";
import Loader from "../../components/loader/loader";
import { useLocation } from "react-router-dom"; 

function AllOrder() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Dstatus= queryParams.get("status") || "";
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState(Dstatus);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/get-all-second-order?status=${status}`, "GET");
      setOrders(response.data.Orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchOrders();
  }, [status]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setSelectedStatus(newStatus);
  };
  const handleOpenPopup = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setSelectedOrderId(null);
  };
  const formatNumber = (number) => {
    return Math.round(number).toString();
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
      <div className="order-list">
        {loading ? (
          <Loader />
        ) : (
          <div className="main_order_list_container">
            {/* <div> */}
              {orders.map((order) => (
                <div>
                <div key={order._id} className="order_list_container">
                  <div>
                    {order.CartId?.orderItems?.map((item) => (
                      <div key={item?._id} className="order_item_details">
                        <div>
                          <img loading="lazy" src={item?.productId?.thumbnail} alt="thumbnail" className="all_order_thumbnail" />
                        </div>
                        <div>
                          <p><b>Name:</b> {item?.productId?.name}</p>
                          <p><b>Price:</b> {item?.singleProductPrice}</p>
                          <p><b>Size:</b> {item?.size?.size} {item?.size?.sizetype} </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="order_details all_order_details">
                    <div><b>Order Id:</b> {order?._id}</div>
                    <div><b>Status:</b> {order?.status}</div>
                    {/* <div><b>Total Price:</b>  {order?.CartId?.totalPrice.toFixed(2)}</div> */}
                    <div><b>Total Price:</b>  {formatNumber(order?.CartId?.totalPrice)}</div>
                  </div>
                  <div className="all_order_shippingAddress all_order_details">
                    <div><b>Pincode:</b> {order?.shippingAddress?.pincode}</div>
                    <div><b>State:</b> {order?.shippingAddress?.state}</div>
                    <div><b>City:</b> {order?.shippingAddress?.city}</div>
                  </div>
                  <div className="all_order_other_details all_order_details">
                    <div><b>Payment Method:</b> {order?.paymentMethod}</div>
                    <div><b>Created At:</b> {new Date(order?.createdAt).toLocaleString("en-US", { timeZone: "UTC" })}</div>
                  </div>
                  <div className="all_order_price_details all_order_details">
                    {/* <div><b>Total Price:</b> {order?.CartId?.totalPrice}</div> */}
                    <div><b>Shipping Price:</b> {order?.CartId?.shippingPrice}</div>
                  </div>
                </div>
                  <div className="all_order_buttons_div">
                    <Link to={`/admin/order/${order?._id}`} className="all_order_order_view_button">View Order</Link>
                    <div className="all_order_order_update_button" onClick={() => handleOpenPopup(order?._id)}>Update Order</div>
                  </div>
                </div>
              ))}
            {/* </div> */}
          </div>
        )}
      </div>
      {selectedOrderId && <UpdateOrderPopup orderId={selectedOrderId} onClose={handleClose} />}
    </div>
  );
}

export default AllOrder;
