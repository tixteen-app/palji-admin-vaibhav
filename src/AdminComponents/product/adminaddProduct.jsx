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
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([{}]);
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [productType, setProductType] = useState("Domestic");
  const [uploadProgress, setUploadProgress] = useState({});
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
  const [productSizes, setProductSizes] = useState([{ size: 'null', sizetype: 'null', quantity: '', price: '', discountPercentage: 0, FinalPrice: '', height: '', width: '', length: '' }]);
  const [productNuturitions, setProductNuturitions] = useState([{ nutrition: '', value: '' }]);
  const [deliverables, setDeliverables] = useState([]);
  const [subcategory, setSubcategory] = useState("");




  // size
  // const handleSizeChange = (index, event) => {
  //   const values = [...productSizes];
  //   values[index][event.target.name] = event.target.value;
  //   setProductSizes(values);
  // };
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

  // const handleNutritionChange = (index, event) => {
  //   const { name, value } = event.target;
  //   const updatedNutritions = [...productNuturitions];
  //   updatedNutritions[index][name] = parseFloat(value) || value;
  //   setProductNuturitions(updatedNutritions);
  // };
  const handleNutritionChange = (index, event) => {
    const { name, value } = event.target;
    const updatedNutritions = [...productNuturitions];

    // If you want to keep the original text value instead of parsing it
    updatedNutritions[index][name] = value; // Keep it as a string

    // If you still want to parse it as float when it is a number
    // updatedNutritions[index][name] = isNaN(value) ? value : parseFloat(value);

    setProductNuturitions(updatedNutritions);
  };


  const calculateFinalPrice = (price, discountPercentage) => {
    return price - (price * (discountPercentage / 100));
  };

  const handleAddSize = () => {
    setProductSizes([...productSizes, { size: '', sizetype: '', quantity: '', price: '', discountPercentage: 0, FinalPrice: '', height: '', width: '', length: '' }]);
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
    if (!productType) requiredFields.push("Product Type");
    if (images.length === 0 || images.includes("")) requiredFields.push("Product Images");

    if (requiredFields.length > 0) {
      const fieldNames = requiredFields.join(", ");
      toast.error(`Please fill all required fields: ${fieldNames}`);
      return;
    }

    try {
      const response = await makeApi("/api/create-product", "POST", {
        name,
        description,
        price,
        discountPercentage: discountPercentage || 0,
        quantity: quantity || 0,
        image: images,
        thumbnail,
        category,
        subcategory,
        brand,
        size,
        productType,
        productSizes,
        productNuturitions,
        deliverables
      });
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
  return (
    <div className="add-product-container">
      <div className="header-section">
        <Link to={"/admin/allproducts"}>
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
        <div className="add_product_text">Add Product</div>
        <ToastContainer />
      </div>

      <form onSubmit={handleSubmit} className="form-section">
        <div className='form_group'>
          <label className='form_label'>Includes:</label>
          {deliverables.map((deliverable, index) => (
            <div key={index} className='form_nested_group'>
              <input type="text" value={deliverable} className='form_nested_input' placeholder="Include" onChange={(e) => handleDeliverableChange(e, index)} />
              <button type="button" className='form_nested_button btn btn-danger ms-2' onClick={() => handleRemoveDeliverable(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="admin_add_product_button add_product_page_button m-3"
            style={{ width: "200px" }} onClick={handleAddDeliverable}>
            Add Include
          </button>
        </div>
        {/* Name & Description */}
        <div className="section-wrapper">
          <h3>Product Details</h3>
          <input
            type="text"
            className="add_product_input_filed"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="add_product_input_filed"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

      

        {/* Product Sizes */}
{/* <div className="section-wrapper">
  <h3>Product Sizes</h3>
  {productSizes.map((size, index) => (
    <div className="size-wrapper" key={index}>
      <div className="input-group">
        <label htmlFor={`size-${index}`} className="product_add_label">Size</label>
        <input
          type="text"
          name="size"
          id={`size-${index}`}
          placeholder="Size"
          value={size.size}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>

      <div className="input-group">
        <label htmlFor={`sizetype-${index}`} className="product_add_label">Size Type</label>
        <input
          type="text"
          name="sizetype"
          id={`sizetype-${index}`}
          placeholder="Size Type"
          value={size.sizetype}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>

      <div className="input-group">
        <label htmlFor={`quantity-${index}`} className="product_add_label">Stock</label>
        <input
          type="number"
          name="quantity"
          id={`quantity-${index}`}
          placeholder="Stock"
          value={size.quantity}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>

      <div className="input-group">
        <label htmlFor={`price-${index}`} className="product_add_label">Price</label>
        <input
          type="number"
          name="price"
          id={`price-${index}`}
          placeholder="Price"
          value={size.price}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>

      <div className="input-group">
        <label htmlFor={`discountPercentage-${index}`} className="product_add_label">Discount Percentage</label>
        <input
          type="number"
          name="discountPercentage"
          id={`discountPercentage-${index}`}
          placeholder="Discount Percentage"
          value={size.discountPercentage}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>

      <div className="input-group">
        <label htmlFor={`FinalPrice-${index}`} className="product_add_label">Final Price</label>
        <input
          type="number"
          name="FinalPrice"
          id={`FinalPrice-${index}`}
          placeholder="Final Price"
          value={calculateFinalPrice(size.price, size.discountPercentage)}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>
      <br/>

      <div className="input-group">
        <label htmlFor={`height-${index}`} className="product_add_label">Height</label>
        <input
          type="text"
          name="height"
          id={`height-${index}`}
          placeholder="Height"
          value={size.height}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>

      <div className="input-group">
        <label htmlFor={`width-${index}`} className="product_add_label">Width</label>
        <input
          type="text"
          name="width"
          id={`width-${index}`}
          placeholder="Width"
          value={size.width}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>

      <div className="input-group">
        <label htmlFor={`length-${index}`} className="product_add_label">Length</label>
        <input
          type="text"
          name="length"
          id={`length-${index}`}
          placeholder="Length"
          value={size.length}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>

      <button
        type="button"
        className="w-25 btn btn-danger"
        onClick={() => handleRemoveSize(index)}
      >
        Delete
      </button>
    </div>
  ))}

  <button
    type="button"
    className="btn btn-primary"
    onClick={handleAddSize}
  >
    Add More
  </button>
</div> */}
{/* Product Sizes */}
<div className="section-wrapper">
  <h3>Product Sizes</h3>
  {productSizes.map((size, index) => (
    <div className="size-wrapper" key={index}>
      {/* Existing Size Input */}
      <div className="input-group">
        <label htmlFor={`size-${index}`} className="product_add_label">Size</label>
        <input
          type="text"
          name="size"
          id={`size-${index}`}
          placeholder="Size"
          value={size.size}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>

      {/* Updated Size Type Dropdown */}
      <div className="input-group">
        <label htmlFor={`sizetype-${index}`} className="product_add_label">Size Type</label>
        <select
          name="sizetype"
          id={`sizetype-${index}`}
          value={size.sizetype}
          onChange={(event) => handleSizeChange(index, event)}
        >
          <option value="Kg" >null</option>
          <option value="Kg">Kg</option>
          <option value="Gram">Gram</option>
          <option value="Litre">Litre</option>
          <option value="ML">ML</option>
          <option value="Pound">Pound</option>
          <option value="Meter">Meter</option>
        </select>
      </div>

      {/* Existing Quantity Input */}
      <div className="input-group">
        <label htmlFor={`quantity-${index}`} className="product_add_label">Stock</label>
        <input
          type="number"
          name="quantity"
          id={`quantity-${index}`}
          placeholder="Stock"
          value={size.quantity}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>

      {/* Existing Price Input */}
      <div className="input-group">
        <label htmlFor={`price-${index}`} className="product_add_label">Price</label>
        <input
          type="number"
          name="price"
          id={`price-${index}`}
          placeholder="Price"
          value={size.price}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>

      {/* Existing Discount Percentage Input */}
      <div className="input-group">
        <label htmlFor={`discountPercentage-${index}`} className="product_add_label">Discount Percentage</label>
        <input
          type="number"
          name="discountPercentage"
          id={`discountPercentage-${index}`}
          placeholder="Discount Percentage"
          value={size.discountPercentage}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>

      {/* Final Price Input */}
      <div className="input-group">
        <label htmlFor={`FinalPrice-${index}`} className="product_add_label">Final Price</label>
        <input
          type="number"
          name="FinalPrice"
          id={`FinalPrice-${index}`}
          placeholder="Final Price"
          value={calculateFinalPrice(size.price, size.discountPercentage)}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>
      <br/>

      {/* Height Input */}
      <div className="input-group">
        <label htmlFor={`height-${index}`} className="product_add_label">Height</label>
        <input
          type="text"
          name="height"
          id={`height-${index}`}
          placeholder="Height"
          value={size.height}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>

      {/* Width Input */}
      <div className="input-group">
        <label htmlFor={`width-${index}`} className="product_add_label">Width</label>
        <input
          type="text"
          name="width"
          id={`width-${index}`}
          placeholder="Width"
          value={size.width}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>

      {/* Length Input */}
      <div className="input-group">
        <label htmlFor={`length-${index}`} className="product_add_label">Length</label>
        <input
          type="text"
          name="length"
          id={`length-${index}`}
          placeholder="Length"
          value={size.length}
          onChange={(event) => handleSizeChange(index, event)}
        />
      </div>

      {/* Remove Size Button */}
      <button
        type="button"
        className="w-25  btn btn-danger"
        onClick={() => handleRemoveSize(index)}
      >
        Delete
      </button>
    </div>
  ))}

  <button
    type="button"
    className="btn btn-primary"
    onClick={handleAddSize}
  >
    Add More
  </button>
</div>



        {/* Product Nutrition */}
        <div className="section-wrapper">
          <h3>Nutrition Facts</h3>
          {productNuturitions.map((nutrition, index) => (
            <div className="size-wrapper" key={index}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={nutrition.name}
                onChange={(event) => handleNutritionChange(index, event)}
              />
              <input
                type="text"
                name="value"
                placeholder="Value"
                value={nutrition.value}
                onChange={(event) => handleNutritionChange(index, event)}
              />
              <button
                type="button"
                className="w-25 btn btn-danger"
                onClick={() => handleRemoveNutrition(index)}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddNutrition}
          >
            Add More
          </button>
        </div>

        {/* Images & Thumbnail */}
        <div className="section-wrapper">
          <h3>Product Images</h3>
          {images.map((image, index) => (
            <div key={index}>
              <input
                type="file"
                className="add_product_input_filed add_product_input_filed_image"
                onChange={(event) => handleImageUpload(event, index)}
              />
              {uploadProgress[index] !== undefined && (
                <div className="upload-progress">
                  {uploadProgress[index]}%
                  {uploadProgress[index] < 100 && <div className="loader"></div>}
                </div>
              )}
              {image && (
                <img
                  loading="lazy"
                  src={image}
                  alt={`Product ${index + 1}`}
                  width={150}
                  height={150}
                />
              )}
            </div>
          ))}
          <button
            type="button"
            className="admin_add_product_button add_product_page_button"
            onClick={handleAddMoreImages}
          >
            Add More
          </button>
        </div>

        <div className="section-wrapper">
          <h3>Product Thumbnail</h3>
          <div className="file-upload-form">
            <label htmlFor="file" className="file-upload-label">
              <div className="file-upload-design">
                <svg viewBox="0 0 1024 1024" className="add_product_upload_image">
                  <path className="path1" d="M384 512m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"></path>
                  <path className="path2" d="M853.333333 725.333333v106.666667H170.666667v-106.666667H106.666667v106.666667c0 35.413333 28.586667 64 64 64h682.666666c35.413333 0 64-28.586667 64-64v-106.666667h-64z"></path>
                  <path className="path3" d="M469.333333 554.666667l85.333334-113.066667 128 170.666667H341.333333L213.333333 469.333333l170.666667-213.333333 85.333333 106.666667 149.333334-192h-448c-35.413333 0-64 28.586667-64 64v554.666666h64v-405.333333l128 149.333333 85.333333 106.666667z"></path>
                  <path className="path4" d="M725.333333 298.666667m-42.666666 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"></path>
                </svg>
              </div>
            </label>
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
        </div>

        {/* Additional Details */}
        <div className="section-wrapper">
          <h3>Additional Details</h3>

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

        {/* Submit Button */}
        <div className="submit-section">
          <button type="submit" className="admin_add_product_button">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );

}

export default AdminaddProduct;
