import React, { useState, useEffect } from "react";
import "../../adminCss/product/adminaddProduct.css";
import { makeApi } from "../../api/callApi";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import fetchCategory  from "../../utils/CFunctions";
import uploadToCloudinary from "../../utils/cloudinaryUpload.js";


function AdminaddProduct() {
  const [categories, setCategories] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [discountPercentage, setDiscountPercentage] = useState("0");
  const [quantity, setQuantity] = useState();
  const [images, setImages] = useState([{}]);
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [productType, setProductType] = useState("Domestic");
  const [uploadProgress, setUploadProgress] = useState({});
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
  const [productSizes, setProductSizes] = useState([{ size: '', sizetype: 'KG',  price: '', discountPercentage: 0, FinalPrice: '', height: '', width: '', length: '' }]);
  const [productNuturitions, setProductNuturitions] = useState([{ nutrition: '', value: '' }]);
  const [deliverables, setDeliverables] = useState([]);
  const [subcategory, setSubcategory] = useState();

  const handleSizeChange = (index, event) => {
    const { name, value } = event.target;
    const updatedSizes = [...productSizes];

    // Update the value of the changed field
    updatedSizes[index][name] = parseFloat(value) || value;

    // Recalculate FinalPrice if price or discountPercentage is changed
    if (name === 'price' || name === 'discountPercentage') {
      const { price, discountPercentage } = updatedSizes[index];
      updatedSizes[index].FinalPrice = calculateFinalPrice(price, discountPercentage);
    }

    setProductSizes(updatedSizes);
  };

  const handleNutritionChange = (index, event) => {
    const { name, value } = event.target;
    const updatedNutritions = [...productNuturitions];

    updatedNutritions[index][name] = value;
    setProductNuturitions(updatedNutritions);
  };

  const calculateFinalPrice = (price, discountPercentage) => {
    return price - (price * (discountPercentage / 100));
  };

  const handleAddSize = () => {
    setProductSizes([...productSizes, { size: '', sizetype: '',  price: '', discountPercentage: 0, FinalPrice: '', height: '', width: '', length: '' }]);
  };

  const handleAddNutrition = () => {
    setProductNuturitions([...productNuturitions, { nutrition: '', value: '' }]);
  };

  const handleRemoveSize = (index) => {
    const values = [...productSizes];
    values.splice(index, 1);
    setProductSizes(values);
  };

  const handleRemoveNutrition = (index) => {
    const values = [...productNuturitions];
    values.splice(index, 1);
    setProductNuturitions(values);
  };

  const fetchCategory = async function fetchCategories() {
    try {
      setLoading(true);
      const response = await makeApi("/api/get-all-categories", "GET");
      setCategories(response.data.categories);
    } catch (error) {
      console.log("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [];
    if (!name) requiredFields.push("Name");
    // if (!price) requiredFields.push("Price");
    // if (!quantity) requiredFields.push("Quantity");
    if (!category) requiredFields.push("Category");
    if (!thumbnail) requiredFields.push("Thumbnail");
    if (images.length === 0 || images.includes("")) requiredFields.push("Product Images");

    for (let i = 0; i < productSizes.length; i++) {
      const { height, width, length } = productSizes[i];
      if (!height || !width || !length) {
        toast.error(`Please provide height, width, and length for all product sizes.`);
        return;
      }
    }

    if (requiredFields.length > 0) {
      const fieldNames = requiredFields.join(", ");
      toast.error(`Please fill all required fields: ${fieldNames}`);
      return;
    }

    try {
      // Add condition for subcategory
      const payload = {
        name,
        description,
        price,
        discountPercentage: discountPercentage || 0,
        quantity: quantity || 0,
        image: images,
        thumbnail,
        category,
        brand,
        size,
        productType,
        productSizes,
        productNuturitions,
        deliverables
      };

      // Only add subcategory to payload if it's not empty or just spaces
      if (subcategory && subcategory.trim() !== "") {
        payload.subcategory = subcategory;
      }


      const response = await makeApi("/api/create-product", "POST", payload);
      setName("");
      setDescription("");
      setPrice("");
      setDiscountPercentage("");
      setQuantity("");
      setImages([""]);
      setThumbnail("");
      setCategory("");
      setSubcategory("");
      setBrand("");
      setSize("");
      setProductType("Domestic");
      setProductSizes([{ size: '', sizetype: '', quantity: '' }]);
      setProductNuturitions([{ nutrition: '', value: '' }]);
      setDeliverables([]);

    } catch (error) {
      console.error("Error adding product:", error);
    }finally{
      setLoading(false);
      toast("Product update successfully");
    }
  };
  // include
  const handleAddDeliverable = () => {
    setDeliverables([...deliverables, '']);
  };

  const handleRemoveDeliverable = (index) => {
    const newDeliverables = deliverables.filter((_, i) => i !== index);
    setDeliverables(newDeliverables);
  };

  const handleDeliverableChange = (e, index) => {
    const newDeliverables = [...deliverables];
    newDeliverables[index] = e.target.value;
    setDeliverables(newDeliverables);
  };



  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  const handleAddMoreImages = () => {
    setImages([...images, ""]);
  };

  useEffect(() => {
    setLoading(true);
    try {
      fetchCategory()
    } catch (error) {
      console.log("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }

  }, []);

  const handleImageUpload = async (event, index) => {
    try {
      const file = event.target.files[0];

      if (file) {
        const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
        const imageURL = uploadedImageUrl;
        handleImageChange(index, imageURL);

      }
    } catch (error) {
      console.log("Image upload error", error);
    }
  };

  const handleThumbnailUpload = async (event) => {
    try {
      const file = event.target.files[0];

      if (file) {
        const uploadedImageUrl = await uploadToCloudinary(file, setUploadProgress);
        const imageURL = uploadedImageUrl;
        setThumbnail(imageURL);
        setThumbnailUploadProgress(100);
      }
    } catch (error) {
      console.log("Thumbnail upload error", error);
    }
  };
  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div className="p-1">
      <div className="add-product-container">
        {/* header */}
        <div className="header-section">
          <div className="back_arrow_div" >
            <Link to={"/admin/allproducts"} className="back_arrow_add_product" >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="36"
                fill="currentColor"
                className="bi bi-arrow-left back_arrow_icon"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
          </div>
          <div className="add_product_text">Add Product</div>
          <ToastContainer />
        </div>

        <form onSubmit={handleSubmit} className="form_section_for_add_product">

          {/* Name & Description */}
          <div className="section-wrapper">
            <div>
              <h3 className="add_product_text_new" >Product Name</h3>
            </div>
            <div className="add_product_input_fileds" >
              <input
                type="text"
                className="add_product_input_filed_new"
                placeholder="Name"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="section-wrapper">
            <div>
              <h3 className="add_product_text_new" >Product Description</h3>
            </div>
            <div className="add_product_input_fileds" >
              <input
                type="text"
                className="add_product_input_filed_new"
                placeholder="description"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          {/* Images & Thumbnail */}
          <div className="section-wrapper">
            <div>
              <h3 className="add_product_text_new" >Product Images</h3>
            </div>
            <div className="add_product_input_fileds" >
              <div className="add_more_products_items_div_input_field">
                {images.map((image, index) => (
                  <div className="d-flex">
                    <div key={index} className="add_product_input_fileds w-100">
                      <div className="w-75 " >
                        <input
                          type="file"
                          className="add_product_input_filed_new w-100"
                          onChange={(event) => handleImageUpload(event, index)}
                        />
                      </div>
                    </div>

                    <div className="add_more_products_items_div_button_field ms-3" >
                      <button className='add_new_itms_Add_product_remove_button' onClick={() => handleRemoveImage(index)}>
                        Remove
                      </button>
                    </div>

                  </div>
                ))}


              </div>
              <div className="add_more_products_items_div_button_field" >
                <button
                  type="button"
                  className="add_new_itms_Add_product_new_button "
                  onClick={handleAddMoreImages}
                >
                  <span className="pe-5" >+</span>
                  Add More
                </button>
              </div>
            </div>
            <div className="product_images_div_add_product">
              {images.map((image, index) => (
                image && (
                  <div className="" key={index}>
                    <div className="product_images_div_add_product_card">
                      <div className="remove_image_Add_product" onClick={() => handleRemoveImage(index)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                        </svg>
                      </div>
                      <img
                        loading="lazy"
                        src={image}
                        alt={`Product ${index + 1}`}
                      />
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          <div className="section-wrapper">
            <div>
              <h3 className="add_product_text_new">Product Thumbnail</h3>
            </div>
            <div className="add_more_products_items_div_input_field add_product_input_fileds">

              <div className="file-upload-form">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="file-upload-input"
                  onChange={handleThumbnailUpload}
                />
                {thumbnailUploadProgress > 0 && (
                  <div className="upload-progress">
                    {thumbnailUploadProgress}%
                    {thumbnailUploadProgress < 100 && <div className="loader"></div>}
                  </div>
                )}
              </div>
            </div>
            {thumbnail && (
              <img
                loading="lazy"
                src={thumbnail}
                alt="Thumbnail"
                width={150}
                height={150}
              />
            )}

          </div>


          {/* Additional Details */}
          <h3>Additional Details</h3>

          <div className="section-wrapper add_product_input_fileds">
            <div>
              <h3 className="add_product_text_new" >Category</h3>
            </div>
            <div className="add_more_products_items_div add_product_input_fileds">
              <select
                className="add_product_input_filed"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {category && (
                <select
                  className="add_product_input_filed"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  <option value="">Select Subcategory</option>
                  {categories.find(cat => cat._id === category).subcategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

          </div>

          {/* include */}
          <div className='add_product_input_fileds'>
            <h5>Includes</h5>

            {deliverables.map((deliverable, index) => (
              <div key={index} className='add_more_products_items_div pt-2 pb-2' >
                <div className="add_more_products_items_div_input_field " >
                  <input type="text" value={deliverable} className='add_product_input_filed_new' placeholder="Include" onChange={(e) => handleDeliverableChange(e, index)} />
                </div>
                <div className="add_more_products_items_div_button_field ms-3" >
                  <button className='add_new_itms_Add_product_remove_button' onClick={() => handleRemoveDeliverable(index)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button type="button" className="add_new_itms_Add_product_new_button"
              style={{ width: "200px" }} onClick={handleAddDeliverable}>
              Add Include
            </button>
          </div>
          {/* Product Sizes */}
          <h3>Product Sizes</h3>
          <div className="section-wrapper add_product_input_fileds">
            {productSizes.map((size, index) => (
              <div className="size-wrapper add_product_input_fileds" key={index}>
                {/* Existing Size Input */}
                <div className="input-group-for-size">
                  <label htmlFor={`size-${index}`} className="product_add_label">Size</label>
                  <input
                    type="text"
                    name="size"
                    className="add_product_input_filed_for_size"
                    id={`size-${index}`}
                    placeholder="Size"
                    value={size.size}
                    onChange={(event) => handleSizeChange(index, event)}
                    required
                  />
                </div>

                {/* Updated Size Type Dropdown */}
                <div className="input-group-for-size">
                  <label htmlFor={`sizetype-${index}`} className="product_add_label">Size Type</label>
                  <select
                    name="sizetype"
                    id={`sizetype-${index}`}
                    value={size.sizetype}
                    onChange={(event) => handleSizeChange(index, event)}
                    className="add_product_input_filed_for_size"
                  >
                    <option value="KG">Kg</option>
                    <option value="Gram">Gram</option>
                    <option value="Litre">Litre</option>
                    <option value="ML">ML</option>
                    <option value="Pound">Pound</option>
                    <option value="Meter">Meter</option>
                  </select>
                </div>

                {/* Existing Quantity Input */}
                {/* <div className="input-group-for-size">
                  <label htmlFor={`quantity-${index}`} className="product_add_label">Stock</label>
                  <input
                    type="number"
                    name="quantity"
                    className="add_product_input_filed_for_size"
                    id={`quantity-${index}`}
                    placeholder="Stock"
                    value={size.quantity}
                    onChange={(event) => handleSizeChange(index, event)}
                  />
                </div> */}

                {/* Existing Price Input */}
                <div className="input-group-for-size">
                  <label htmlFor={`price-${index}`} className="product_add_label">Price</label>
                  <input
                    type="number"
                    className="add_product_input_filed_for_size"

                    name="price"
                    id={`price-${index}`}
                    placeholder="Price"
                    value={size.price}
                    onChange={(event) => handleSizeChange(index, event)}
                  />
                </div>

                {/* Existing Discount Percentage Input */}
                <div className="input-group-for-size">
                  <label htmlFor={`discountPercentage-${index}`} className="product_add_label">Discount Percentage</label>
                  <input
                    type="number"
                    name="discountPercentage"
                    className="add_product_input_filed_for_size"

                    id={`discountPercentage-${index}`}
                    placeholder="Discount Percentage"
                    value={size.discountPercentage}
                    onChange={(event) => handleSizeChange(index, event)}
                  />
                </div>

                {/* Final Price Input */}
                <div className="input-group-for-size">
                  <label htmlFor={`FinalPrice-${index}`} className="product_add_label">Final Price</label>
                  <input
                    type="number"
                    name="FinalPrice"
                    className="add_product_input_filed_for_size"

                    id={`FinalPrice-${index}`}
                    placeholder="Final Price"
                    value={calculateFinalPrice(size.price, size.discountPercentage)}
                    onChange={(event) => handleSizeChange(index, event)}
                  />
                </div>
                <br />
                {/* Height Input */}
                <div className="input-group-for-size">
                  <label htmlFor={`height-${index}`} className="product_add_label">Height</label>
                  <input
                    type="text"
                    className="add_product_input_filed_for_size"

                    name="height"
                    id={`height-${index}`}
                    placeholder="Height"
                    value={size.height}
                    onChange={(event) => handleSizeChange(index, event)}
                  />
                </div>

                {/* Width Input */}
                <div className="input-group-for-size">
                  <label htmlFor={`width-${index}`} className="product_add_label">Width</label>
                  <input
                    type="text"
                    name="width"
                    className="add_product_input_filed_for_size"

                    id={`width-${index}`}
                    placeholder="Width"
                    value={size.width}
                    onChange={(event) => handleSizeChange(index, event)}
                  />
                </div>

                {/* Length Input */}
                <div className="input-group-for-size">
                  <label htmlFor={`length-${index}`} className="product_add_label">Length</label>
                  <input
                    type="text"
                    name="length"
                    id={`length-${index}`}
                    className="add_product_input_filed_for_size"

                    placeholder="Length"
                    value={size.length}
                    onChange={(event) => handleSizeChange(index, event)}
                  />
                </div>

                {/* Remove Size Button */}
                <button
                  type="button"
                  className="remove_btton_add_product"
                  onClick={() => handleRemoveSize(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              className="add_new_itms_Add_product_new_button"
              onClick={handleAddSize}
            >
              <span className="pe-5" >+</span>
              Add More
            </button>
          </div>

          {/* Product Nutrition */}

          <h3>Nutrition Facts</h3>
          <div className="section-wrapper add_product_input_fileds">
            {productNuturitions.map((nutrition, index) => (
              <div className="size-wrapper pt-3" key={index}>
                <div className="input-group-for-size">

                  <input
                    type="text"
                    className="add_product_input_filed_for_size"
                    name="name"
                    placeholder="Name"
                    value={nutrition.name}
                    onChange={(event) => handleNutritionChange(index, event)}
                  />
                </div>
                <div className="input-group-for-size">
                  <input
                    className="add_product_input_filed_for_size"
                    type="text"
                    name="value"
                    placeholder="Value"
                    value={nutrition.value}
                    onChange={(event) => handleNutritionChange(index, event)}
                  />
                </div>
                <div className="input-group-for-size">
                  <button
                    className="remove_btton_add_product w-50"
                    onClick={() => handleRemoveNutrition(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              // className="btn btn-primary"
              className="add_new_itms_Add_product_new_button mt-2"

              onClick={handleAddNutrition}
            >
              <span className="pe-5" >+</span>

              Add More
            </button>
          </div>


          {/* Submit Button */}
          <div className="submit_form_Add_product_admin">
            <button type="submit" className="add_product_button">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );



}

export default AdminaddProduct;
