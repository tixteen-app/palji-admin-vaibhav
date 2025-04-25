import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import "../../adminCss/order/orderdetails.css";
import Loader from "../../components/loader/loader";
import { FaShippingFast, FaTimesCircle } from "react-icons/fa";

const Orderdetails = () => {
  const [order, setOrder] = useState({});
  console.log("order", order.shippingAddress.firstname);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupforship, setShowPopupforship] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [showToasterforship, setShowToasterforship] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [countdownforship, setCountdownforship] = useState(5);
  const [undo, setUndo] = useState(false);
  const [undoforship, setUndoforship] = useState(false);
  const [courierServiceability, setCourierServiceability] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState(null);


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

  const fetchCourierServiceability = async () => {
    try {
      setLoading(true);

      // Build the query string from the parameters
      const queryParams = new URLSearchParams({
        pickup_postcode: orderData?.pickup_address?.pin_code, // Pickup postcode
        delivery_postcode: order?.shippingAddress?.pincode, // Delivery postcode
        weight: "0.5", // Replace with the actual weight
        cod: "0", // Default to "0" if not provided
        order_id: id, // Order ID
      }).toString();

      // Send GET request with query parameters
      const response = await makeApi(`/api/shiprocket/check-serviceability?${queryParams}`, "GET");
      setCourierServiceability(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching courier serviceability:", error);
    } finally {
      setLoading(false);
    }
  };

  const shipOrder = async (courierId) => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/shiprocket/create-shipment/${id}/${courierId}`, "POST");
      console.log("Shipment created:", response.data);
      setOrder((prev) => ({ ...prev, status: "Shipped" }));
    } catch (error) {
      console.error("Error shipping order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    setShowPopup(true);
  };

  const handleshipClick = async () => {
    await fetchCourierServiceability();
    setShowPopupforship(true);
  };

  const confirmCancel = () => {
    setShowPopup(false);
    setShowToaster(true);
    setCountdown(5);
    setUndo(false);
  };

  const confirmShip = () => {
    if (selectedCourier) {
      setShowPopupforship(false);
      setShowToasterforship(true);
      setCountdownforship(5);
      setUndoforship(false);
    } else {
      alert("Please select a courier partner.");
    }
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

  useEffect(() => {
    let timer;
    if (showToasterforship && countdownforship > 0) {
      timer = setTimeout(() => setCountdownforship((prev) => prev - 1), 1000);
    } else if (countdownforship === 0 && !undoforship) {
      shipOrder(selectedCourier);
      setShowToasterforship(false);
    }
    return () => clearTimeout(timer);
  }, [countdownforship, showToasterforship, undoforship]);

  const undoCancel = () => {
    setUndo(true);
    setShowToaster(false);
  };

  const undoCancelforship = () => {
    setUndoforship(true);
    setShowToasterforship(false);
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
    shipments,
    awb_data
  } = orderData || {};

  return (
    <div className='main-orderdetail'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="order-header p-3">
            <div style={{paddingBottom:"7px"}} >

            <Link to={"/admin/all-orders"} className="back-button">←</Link>
            </div>
            <div style={{fontSize:"24px"}}>Order Details</div>
            <div className="gap-3 d-flex" >
            {order?.status !== ("CANCELED" || "Delivered" || "canceled") && (
              <button onClick={handleCancelClick} className="cancel-button">Cancel Order <FaTimesCircle className="dashboard-icon" style={{ color: "black", fontSize: "24px" }} /></button>
            )}
            {order?.status !== ("CANCELED" || "Delivered" || "canceled") && (
              <button onClick={handleshipClick} className="ship-button">  Ship Order <FaShippingFast className="dashboard-icon" style={{ color: "black", fontSize: "24px" }} /></button>
            )}
            </div>
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
              <div className="status-section">
                order id: {order?.orderId}
              </div>

              <div className="user-box">
                <h3 className="user-title">User Details</h3>
                <p><span className='left-det'>Name:</span> <span className='right-det'>{`${order?.userId?.firstName} ${order?.userId?.lastName}`}</span></p>
                <p><span className='left-det'>Email:</span> <span className='right-det'>{order?.userId?.email}</span></p>
                <p><span className='left-det'>Phone:</span> <span className='right-det'>{order?.userId?.mobileNumber}</span></p>
              </div>

              <div className="shipping-box" style={{ maxHeight: "400px", overflowY: "scroll" }}>
                <h3 className="shipping-title">Shipping Address</h3>
                <p> <span className='left-det'>Name:</span> <span className='right-det'>{order?.shippingAddress?.firstname } {order?.shippingAddress?.lastname }</span> </p>
                <p> <span className='left-det'>Address:</span> <span className='right-det'>{order?.shippingAddress?.address}</span> </p>
                <p> <span className='left-det'>Phone:</span> <span className='right-det'>{order?.shippingAddress?.phonenumber}</span> </p>
                <p> <span className='left-det'>State:</span> <span className='right-det'>{order?.shippingAddress?.state}</span> </p>
                <p> <span className='left-det'>City:</span> <span className='right-det'>{order?.shippingAddress?.city}</span> </p>
                <p> <span className='left-det'>Pincode:</span> <span className='right-det'>{order?.shippingAddress?.pincode}</span> </p>
                <p> <span className='left-det'>User Id:</span> <span className='right-det'>{order?.shippingAddress?.userId}</span> </p>
              </div>
            </div>

            <div className="order-right">
              <div className="order-right-top">
                <div className="payment-box">
                  <h3 className="payment-title">Payment Details</h3>
                  <p><span className='left-det'>Method:</span> <span className='right-det'>{order?.paymentMethod}</span></p>
                  <p><span className='left-det'>payment type:</span> <span className='right-det'>{order?.payment_method}</span></p>
                  <p><span className='left-det'>Total Price:</span> <span className='right-det'>₹{order?.CartId?.totalPrice}</span></p>
                  <p><span className='left-det'>Status:</span> <span className='right-det'>{order?.status}</span></p>
                </div>

                <div className="pickup-box" >
                  <h3 className="pickup-title">Pickup Address</h3>
                  <p>{orderData?.pickup_address?.name || "N/A"}</p>
                  <p>{orderData?.pickup_address?.phone || "N/A"}</p>
                  <p>{`${orderData?.pickup_address?.address || ""}, ${orderData?.pickup_address?.city || ""}, ${orderData?.pickup_address?.state || ""} - ${orderData?.pickup_address?.pin_code || "N/A"}`}</p>
                </div>
              </div>

              <div className="order-items-container" >
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
                          <p>Total Price: ₹{item?.totalPrice}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex" >
            <div className="shipping-box" style={{ maxHeight: "400px", overflowY: "scroll" }} >
              <h3 className="shipping-title">Other details</h3>
              <p> <span className='left-det'>invoice_no:</span> <span className='right-det'>{orderData?.invoice_no}</span> </p>
              <p> <span className='left-det'>invoice_date:</span> <span className='right-det'>{orderData?.invoice_date}</span> </p>
              <p> <span className='left-det'>State:</span> <span className='right-det'>{order?.shippingAddress?.state}</span> </p>
              <p> <span className='left-det'>City:</span> <span className='right-det'>{order?.shippingAddress?.city}</span> </p>
              <p> <span className='left-det'>Pincode:</span> <span className='right-det'>{order?.shippingAddress?.pincode}</span> </p>
              <p> <span className='left-det'>User Id:</span> <span className='right-det'>{order?.shippingAddress?.userId}</span> </p>
            </div>
            <div className="shipping-box" style={{ maxHeight: "400px", overflowY: "scroll" }} >
              {shipments && (
                <>
                  <p><strong>Invoice Link:</strong> {shipments.invoice_link || "N/A"}</p>
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
          <div className="d-flex" >
            <div className="shipping-box" style={{ maxHeight: "400px", overflowY: "scroll" }} >
              <h3 className="shipping-title">Courier details</h3>
              <p> <span className='left-det'>shipments:</span> <span className='right-det'>{shipments?.courier}</span> </p>
              <p> <span className='left-det'>shipments:</span> <span className='right-det'>{shipments?.status}</span> </p>
              <p> <span className='left-det'>invoice_link:</span> <span className='right-det'>{shipments?.invoice_link}</span> </p>
              <p> <span className='left-det'>pickup_scheduled_date:</span> <span className='right-det'>{shipments?.pickup_scheduled_date}</span> </p>
              <p> <span className='left-det'>created_at:</span> <span className='right-det'>{shipments?.created_at}</span> </p>
              <p> <span className='left-det'>updated_at:</span> <span className='right-det'>{shipments?.updated_at}</span> </p>
            </div>
            <div className="shipping-box" style={{ maxHeight: "400px", overflowY: "scroll" }} >
              {awb_data && (
                <>
                  <p><strong>applied_weight_amount:</strong> {awb_data.charges.applied_weight_amount || "N/A"}</p>
                  <p> <strong>freight_charges:</strong> {awb_data.charges.freight_charges || "N/A"}  </p>
                  <p><strong>applied_weight:</strong> {awb_data.charges.applied_weight || "N/A"}</p>
                  <p><strong>billing_amount:</strong> {awb_data.charges.billing_amount || "N/A"}</p>
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
          {showPopup && (
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

     
    {showPopupforship && (
  <div className="courier-popup-overlay">
    <div className="courier-popup-container">
      <h2 className="courier-popup-title">Select Courier Partner</h2>
      <div className="courier-popup-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        { courierServiceability?.message && <> {courierServiceability?.message }</> }
        {courierServiceability?.data?.available_courier_companies.map((courier, index) => (
          <div key={index} className="courier-popup-item">
            <div className="courier-popup-details">
              <p className="courier-popup-name"><strong>Courier:</strong> {courier.courier_name}</p>
              <p className="courier-popup-price"><strong>Price:</strong> ₹{courier.rate}</p>
              <p className="courier-popup-delivery"><strong>Estimated Delivery:</strong> {courier.etd}</p>
            </div>
            <button
              className={`courier-popup-select-btn ${selectedCourier === courier.courier_company_id ? 'courier-popup-selected' : ''}`}
              onClick={() => setSelectedCourier(courier.courier_company_id)}
            >
              {selectedCourier === courier.courier_company_id ? 'Selected' : 'Select'}
            </button>
          </div>
        ))}
      </div>
      <div className="courier-popup-actions">
        <button className="courier-popup-confirm-btn" onClick={confirmShip}>Confirm Ship</button>
        <button className="courier-popup-cancel-btn" onClick={() => setShowPopupforship(false)}>Cancel</button>
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
          {showToasterforship && (
            <>
              <div className="toaster_for_undo">
                <p>Order will be Ship in {countdownforship} seconds.</p>
                <button onClick={undoCancelforship} className="undo_btn">Undo</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Orderdetails;