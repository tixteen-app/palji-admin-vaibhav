import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../adminCss/coupna/createCoupan.css";
import { makeApi } from "../../api/callApi";
import { Link } from "react-router-dom";

const AddCoupan = () => {
  const [Loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const [Coupancode, setCoupancode] = useState("");
  const [discountPercentage, setdiscountPercentage] = useState("");
  const [Coupanfor, setCoupanfor] = useState("");
  const [applicableCategories, setapplicableCategories] = useState([]);
  const [applicableProducts, setapplicableProducts] = useState([]);
  const [minimumOrderValue, setminimumOrderValue] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [CoupanForList, setCoupanForList] = useState([
    "all",
    "minimumOrderValue",
    // "category",
    // "product",
  ]);

  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCoupanFor, setSelectedCoupanFor] = useState();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //   const response = await axios.post('/api/add-category', { name, description });
      const response = await makeApi("/api/create-coupan", "POST", {
        name,
        Coupancode,
        discountPercentage,
        coupanfor: selectedCoupanFor,
        applicableCategories,
        applicableProducts,
        minimumOrderValue,
        startDate,
        endDate,
      });
      if (response.status === 201) {
        console.log(response);
        alert("Coupan added successfully");
        setName("");
        setCoupancode("");
        setdiscountPercentage("");
        setCoupanfor("");
        setapplicableCategories([]);
        setapplicableProducts([]);
        setminimumOrderValue("");
        setStartDate("");
        setEndDate("");
      }
    } catch (error) {
      console.error("Error adding Coupan:", error);
      setErrorMessage("Error adding Coupan. Please try again.");
    }
  };
  
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await makeApi("/api/get-all-categories", "GET");
        if (response.status === 200) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    async function fetchAllProducts() {
      try {
        setLoading(true);
        const response = await makeApi("/api/get-all-products", "GET");
        if (response.status === 200) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
    fetchAllProducts();
  }, []);
  const handleCategoryChange = (categoryId) => {
    const updatedCategories = [...applicableCategories];
    if (updatedCategories.includes(categoryId)) {
      // If already selected, remove it
      const index = updatedCategories.indexOf(categoryId);
      updatedCategories.splice(index, 1);
    } else {
      updatedCategories.push(categoryId);
    }
    setapplicableCategories(updatedCategories);
  };
  const handleproductChange = (productId) => {
    const updatedProducts = [...applicableProducts];
    if (updatedProducts.includes(productId)) {
      // If already selected, remove it
      const index = updatedProducts.indexOf(productId);
      updatedProducts.splice(index, 1);
    } else {
      updatedProducts.push(productId);
    }
    setapplicableProducts(updatedProducts);
  }
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
      <div className="add-category">
        <div className="add_category_div">Add Category</div>
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
            <label htmlFor="Coupancode">Coupancode:</label>
            <input
              type="text"
              id="Coupancode"
              value={Coupancode}
              onChange={(e) => setCoupancode(e.target.value.toUpperCase())}
              required
              style={{ textTransform: 'uppercase' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="discountPercentage">discountPercentage:</label>
            <input
              type="number"
              id="discountPercentage"
              value={discountPercentage}
              onChange={(e) => setdiscountPercentage(e.target.value)}
              required
            />
          </div>
          <div>
            <select
              className="add_product_input_filed add_product_dropdown"
              // value={CoupanFor}
              onChange={(e) => setSelectedCoupanFor(e.target.value)}
              required
            >
              <option value="">Coupan For</option>
              {CoupanForList.map((Coupan) => (
                <option key={Coupan} value={Coupan}>
                  {Coupan}
                </option>
              ))}
            </select>
          </div>

          {selectedCoupanFor && selectedCoupanFor === "category" && (
            <div>
              <label htmlFor="applicableCategories">
                applicableCategories:
              </label>
              <div className="category_list_for_add_coupan_parent">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="d-flex gap-5 category_list_for_add_coupan"
                  >
                    <input
                      type="checkbox"
                      id={category._id}
                      value={category._id}
                      checked={applicableCategories.includes(category._id)}
                      onChange={() => handleCategoryChange(category._id)}
                    />
                    <label htmlFor={category._id}>{category.name}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedCoupanFor && selectedCoupanFor === "product" && (
            <div>
              <label htmlFor="applicableCategories">
                applicable products:
              </label>
              <div className="category_list_for_add_coupan_parent">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="d-flex gap-5 category_list_for_add_coupan"
                  >
                    <input
                      type="checkbox"
                      id={product._id}
                      value={product._id}
                      checked={applicableProducts.includes(product._id)}
                      onChange={() => handleproductChange(product._id)}
                    />
                    <label htmlFor={product._id}>{product.name}</label>
                    {/* add thumbnil */}
                    <div className="" > <img src={product.thumbnail} alt={product.name} width="80px" height="80px" /> </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedCoupanFor && selectedCoupanFor == "minimumOrderValue" && (
            <div className="form-group">
              <label htmlFor="discountPercentage"> Minimum Order Value:</label>
              <input
                type="number"
                id="minimumOrderValue"
                value={minimumOrderValue}
                onChange={(e) => setminimumOrderValue(e.target.value)}
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
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="admin_add_product_button add_category_button"
          >
            Add Coupan
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCoupan;
