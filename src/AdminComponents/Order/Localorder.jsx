
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import "../../adminCss/order/orderdetails.css";
import Loader from "../../components/loader/loader";
import { FaShippingFast, FaTimesCircle } from "react-icons/fa";

const Localorder = () => {
    const [order, setOrder] = useState({});

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
            const response = await makeApi(`/api/get-second-order-by-id/${id}`, "GET");
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
         await makeApi(`/api/update-second-order-by-id/${id}`, "PUT", { status: "Canceled" });
            setOrder((prev) => ({ ...prev, status: "Canceled" }));
        } catch (error) {
            console.error("Error canceling order:", error);
        } finally {
            setLoading(false);
        }
    };

   

    const shipOrder = async (courierId) => {
        try {
            setLoading(true);
            const response = await makeApi(`/api/update-second-order-by-id/${id}`, "PUT", { status: "Shipped" });
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
        setShowPopupforship(true);
    };

    const confirmCancel = () => {
        setShowPopup(false);
        setShowToaster(true);
        setCountdown(5);
        setUndo(false);
    };

    const confirmShip = () => {
            setShowPopupforship(false);
            setShowToasterforship(true);
            setCountdownforship(5);
            setUndoforship(false);
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

                    <div className="order-header">
                        <Link to={"/admin/localorders?status=pending"} className="back-button">←</Link>
                        <h1>Order Details</h1>
                        {order?.status !== ("CANCELED" || "Delivered" || "canceled") && (
                            <button onClick={handleCancelClick} className="cancel-button">Cancel Order <FaTimesCircle className="dashboard-icon" style={{ color: "black", fontSize: "24px" }} /></button>
                        )}
                        {order?.status !== ("CANCELED" || "Delivered" || "canceled") && (
                            <button onClick={handleshipClick} className="ship-button">  Ship Order <FaShippingFast className="dashboard-icon" style={{ color: "black", fontSize: "24px" }} /></button>
                        )}
                    </div>
                    <div className="order-whole">
                        <div className="order-left">
                            <div className="status-section">
                                <div className="status-left">
                                    <p>Status</p>
                                    <span className="status-badge">{order?.status}</span>
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

                            <div className="shipping-box" style={{ maxHeight: "400px", overflowY: "scroll" }}>
                                <h3 className="shipping-title">Shipping Address</h3>
                                <p> <span className='left-det'>Phone:</span> <span className='right-det'>{order?.shippingAddress?.phonenumber}</span> </p>
                                <p> <span className='left-det'>Address:</span> <span className='right-det'>{order?.shippingAddress?.address}</span> </p>
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
                                    <p>Palji Bakery</p>
                                    <p>7901706000</p>
                                    <p>Palji Bakery, Ludhiana, Punjab - 141001</p>
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
                        <div className="courier-popup-overlay ">
                            <div className="courier-popup-container">
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

export default Localorder;