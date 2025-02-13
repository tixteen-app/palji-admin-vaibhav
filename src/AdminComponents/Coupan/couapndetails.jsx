import React, { useState, useEffect } from "react";
import { makeApi } from "../../api/callApi";
import { useParams } from "react-router";
import "../../adminCss/coupna/couapndetails.css";
import { Link } from "react-router-dom";
const CouponDetails = () => {
  const { Id } = useParams(); // Fetching ID from URL
  console.log("coupon details");
  const [couponData, setCouponData] = useState(null);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await makeApi(`/api/get-coupan-by-id/${Id}`, "GET");
        setCouponData(response.data.coupan);
      } catch (error) {
        console.error("Error fetching coupon details:", error);
      }
    };
    fetchCoupon();
  }, []);

  return (
    <>
      <div>
        <Link to={"/admin/All-coupan"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="36"
            fill="currentColor"
            className="bi bi-arrow-left back_arrow_icon back_button_add_catogory"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </Link>
      </div>
      <div className="coupon-container">
        {couponData ? (
          <div className="coupon-details">
            <h2>{couponData.name}</h2>
            <p>
              <strong>Coupon Code:</strong> {couponData.Coupancode}
            </p>
            <p>
              <strong>Discount Percentage:</strong>{" "}
              {couponData.discountPercentage}%
            </p>
            <p>
              <strong>Coupon For:</strong> {couponData.coupanfor}
            </p>
            <p>
              {/* cahnage value into string for display */}
              <strong>Isexpired:</strong> {couponData.Isexpired.toString()}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {new Date(couponData.startDate).toLocaleDateString()}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {new Date(couponData.endDate).toLocaleDateString()}
            </p>
            {couponData.coupanfor === "product" && (
              <div>
                <h3>Applicable Products:</h3>
                <ul className="product-list">
                  {couponData.applicableProducts.map((product) => (
                    <li key={product._id}>
                      <div className="product-details">
                        <img
                          src={product.thumbnail}
                          alt={product.name}
                          className="product-thumbnail"
                        />
                        <div className="product-info">
                          <p>{product.name}</p>
                          <p>
                            <strong>Price:</strong> ₹{product.price}
                          </p>
                          <p>
                            <strong>Price After Discount:</strong> ₹
                            {product.PriceAfterDiscount}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {couponData.coupanfor === "category" && (
              <div>
                <h3>Applicable Categories:</h3>
                <ul className="">
                  {couponData.applicableCategories.map((product) => (
                    <li key={product._id}>
                      <div className="product-details">
                        <div className="product-info">
                          <p>
                            <strong>Categories Name :</strong> {product.name}
                          </p>
                          <p>
                            <strong>description:</strong> {product.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p>Loading coupon details...</p>
        )}
      </div>
    </>
  );
};

export default CouponDetails;
