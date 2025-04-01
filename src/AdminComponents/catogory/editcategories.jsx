import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import "../../style/updatecategory.css";

function Editcategories() {
  const navigate = useNavigate();
  const { Id } = useParams();
  const [loading, setLoading] = useState(false);
  const [Updateloader, setUpdateLoader] = useState(false);
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [pinCodes, setPinCodes] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  
  // Fetch category data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await makeApi(`/api/get-single-category/${Id}`, "GET");
        const category = response.data.category;
        setProduct(category);
        setSubcategories(category.subcategories || []);
        setPinCodes(category.availablePinCodes || []);
        setFormData({
          name: category.name,
          description: category.description,
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [Id]);

  // Update category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoader(true);
      const updatedCategory = {
        ...formData,
        availablePinCodes: pinCodes.filter((code) => code.trim() !== ""), 
      };
      await makeApi(`/api/update-category/${Id}`, "PUT", updatedCategory);
      navigate("/admin/all-categories");
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setUpdateLoader(false);
    }
  };

  // Pin code handlers
  const handlePinCodeChange = (index, value) => {
    const updatedPinCodes = pinCodes.map((code, i) =>
      i === index ? value : code
    );
    setPinCodes(updatedPinCodes);
  };

  const addPinCode = () => {
    setPinCodes([...pinCodes, ""]);
  };

  const removePinCode = (index) => {
    const updatedPinCodes = pinCodes.filter((_, i) => i !== index);
    setPinCodes(updatedPinCodes);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="edut_catogry_container">
      {loading ? (
        <Loader />
      ) : (
        <div className="edut_catogry_main">
          <div className="edut_catogry_back_btn">
            <Link to={"/admin/all-categories"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="36"
                fill="currentColor"
                className="edut_catogry_back_arrow_icon"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
          </div>

          <div className="edut_catogry_form_container">
            <h2 className="edut_catogry_heading">Update Category</h2>
            <form onSubmit={handleSubmit} className="edut_catogry_form">
              <div className="edut_catogry_form_group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                  className="edut_catogry_input"
                />
              </div>
              <div className="edut_catogry_form_group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData?.description}
                  onChange={handleChange}
                  className="edut_catogry_textarea"
                />
              </div>

              {/* Pin Codes Section */}
              <div className="edut_catogry_form_group">
                <h3>Available Pin Codes</h3>
                {pinCodes.map((code, index) => (
                  <div key={index} className="edut_catogry_pincode_entry">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => handlePinCodeChange(index, e.target.value)}
                      placeholder="Enter pin code"
                      className="edut_catogry_input"
                    />
                    <button
                      type="button"
                      onClick={() => removePinCode(index)}
                      className="edut_catogry_delete_btn"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPinCode}
                  className="edut_catogry_add_pincode_btn"
                >
                  Add Pin Code
                </button>
              </div>

              <button type="submit" className="edut_catogry_submit_btn">
                {Updateloader ? <Loader /> : "Update Category"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Editcategories;
