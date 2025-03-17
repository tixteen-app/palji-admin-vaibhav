import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../adminCss/coupna/createCoupan.css";
import { makeApi } from "../../api/callApi";
import { Link, useParams } from "react-router-dom";

const UpdateCoupan = () => {
  const { Id } = useParams(); // Fetching ID from URL
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [coupanCode, setCoupanCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [coupanFor, setCoupanFor] = useState("");
  const [applicableCategories, setApplicableCategories] = useState([]);
  const [applicableProducts, setApplicableProducts] = useState([]);
  const [minimumOrderValue, setMinimumOrderValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   async function fetchCoupanDetails() {
  //     try {
  //       const response = await makeApi(`/api/get-coupan-by-Id/${Id}`, "GET");
  //       if (response.status === 200) {
  //       console.log(response.data.coupan);

  //         const data = response.data.coupan;
  //         setName(data.name);
  //         setCoupanCode(data.Coupancode);
  //         setDiscountPercentage(data.discountPercentage);
  //         setCoupanFor(data.coupanfor);
  //         setApplicableCategories(data.applicableCategories);
  //         setApplicableProducts(data.applicableProducts);
  //         setMinimumOrderValue(data.minimumOrderValue);
  //         setStartDate(data.startDate);
  //         setEndDate(data.endDate);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching coupon details:", error);
  //       setErrorMessage("Error fetching coupon details. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   async function fetchCategories() {
  //     try {
  //       const response = await makeApi("/api/get-all-categories", "GET");
  //       if (response.status === 200) {
  //         setCategories(response.data.categories);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   }
  //   async function fetchAllProducts() {
  //     try {
  //       const response = await makeApi("/api/get-all-products", "GET");
  //       if (response.status === 200) {
  //         setProducts(response.data.products);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   }
  //   fetchCoupanDetails();
  //   fetchCategories();
  //   fetchAllProducts();
  // }, [Id]);

  useEffect(() => {
    async function fetchCoupanDetails() {
      try {
        const response = await makeApi(`/api/get-coupan-by-Id/${Id}`, "GET");
        if (response.status === 200) {
          const data = response.data.coupan;
          setName(data.name);
          setCoupanCode(data.Coupancode);
          setDiscountPercentage(data.discountPercentage);
          setCoupanFor(data.coupanfor);
          setApplicableCategories(data.applicableCategories.map(product => product._id));
          // Initialize applicableProducts with IDs of selected products
          setApplicableProducts(data.applicableProducts.map(product => product._id));
          setMinimumOrderValue(data.minimumOrderValue);
          setStartDate(data.startDate);
          setEndDate(data.endDate);
        }
      } catch (error) {
        console.error("Error fetching coupon details:", error);
        setErrorMessage("Error fetching coupon details. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  
    // Fetch categories and products
    async function fetchCategories() {
      try {
        const response = await makeApi("/api/get-all-categories", "GET");
        if (response.status === 200) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  
    async function fetchAllProducts() {
      try {
        const response = await makeApi("/api/get-all-products", "GET");
        if (response.status === 200) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  
    // Fetch data on component mount
    fetchCoupanDetails();
    fetchCategories();
    fetchAllProducts();
  }, [Id]); // Make sure to include Id in the dependency array to fetch data when Id changes
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await makeApi(`/api/update-coupan/${Id}`, "PUT", {
        name,
        Coupancode: coupanCode,
        discountPercentage,
        coupanfor: coupanFor,
        applicableCategories,
        applicableProducts,
        minimumOrderValue,
        startDate,
        endDate,
      });
      if (response.status === 200) {
        console.log(response);
        alert("Coupon updated successfully");
      }
    } catch (error) {
      console.error("Error updating Coupon:", error);
      setErrorMessage("Error updating Coupon. Please try again.");
    }
  };

  const handleCategoryChange = (categoryId) => {
    const updatedCategories = [...applicableCategories];
    if (updatedCategories.includes(categoryId)) {
      // If already selected, remove it
      const index = updatedCategories.indexOf(categoryId);
      updatedCategories.splice(index, 1);
    } else {
      updatedCategories.push(categoryId);
    }
    setApplicableCategories(updatedCategories);
  };

  const handleProductChange = (productId) => {
    const updatedProducts = [...applicableProducts];
    if (updatedProducts.includes(productId)) {
      // If already selected, remove it
      const index = updatedProducts.indexOf(productId);
      updatedProducts.splice(index, 1);
    } else {
      updatedProducts.push(productId);
    }
    setApplicableProducts(updatedProducts);
  };

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
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </Link>
      </div>
      <div className="add-category">
        <div className="add_category_div">Update Coupon</div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Coupancode">Coupon Code:</label>
            <input
              type="text"
              id="Coupancode"
              value={coupanCode}
              onChange={(e) => setCoupanCode(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="discountPercentage">Discount Percentage:</label>
            <input
              type="number"
              id="discountPercentage"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              required
            />
          </div>
         
          <h4>{coupanFor}</h4>
          {coupanFor === "category" && (
            <div>
              <label>Applicable Categories:</label>
              <div className="category_list_for_add_coupan_parent">
              {categories.map((category) => (
                <div key={category._id}
                  className="d-flex gap-5 category_list_for_add_coupan"
                >
                  <input
                    type="checkbox"
                    id={category._id}
                    checked={applicableCategories.includes(category._id)}
                    onChange={() => handleCategoryChange(category._id)}
                  />
                  <label htmlFor={category._id}>{category.name}</label>
                </div>
              ))}
              </div>
            </div>
          )}
          {coupanFor === "product" && (
            <div>
              <label>Applicable Products:</label>
              <div className="category_list_for_add_coupan_parent">

              {products.map((product) => (
                <div key={product._id}
                className="d-flex gap-5 category_list_for_add_coupan"
                
                >
                  <input
                    type="checkbox"
                    id={product._id}
                    checked={applicableProducts.includes(product._id)}
                    onChange={() => handleProductChange(product._id)}
                  />
                  <label htmlFor={product._id}>{product.name}</label>
                </div>
              ))}
              </div>
            </div>
          )}
          {coupanFor === "minimumOrderValue" && (
            <div className="form-group">
              <label htmlFor="minimumOrderValue">Minimum Order Value:</label>
              <input
                type="number"
                id="minimumOrderValue"
                value={minimumOrderValue}
                onChange={(e) => setMinimumOrderValue(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              // required
            />
          </div>
          <button
            type="submit"
            className="admin_add_product_button add_category_button"
          >
            Update Coupon
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateCoupan;
