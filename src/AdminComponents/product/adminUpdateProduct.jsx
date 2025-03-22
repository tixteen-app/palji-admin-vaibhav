import "../../adminCss/adminUpdateProduct.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import uploadToCloudinary from "../../utils/cloudinaryUpload";
import { toast, ToastContainer } from "react-toastify";

function UpdateProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [updateloader, setUpdateLoader] = useState(false);
  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [nutritions, setNutritions] = useState([]);
  const [includes, setIncludes] = useState([]);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [showConfirm, setShowConfirm] = useState({ show: false, sizeId: null });
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubcategory] = useState("");

  const [imageInputs, setImageInputs] = useState([0]); // Track input fields

  const handleAddMoreImageInput = () => {
    setImageInputs([...imageInputs, imageInputs.length]); // Add new input field
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    subcategory: "",
    brand: "",
    image: [],
    thumbnail: "",
    discountPercentage: "",
    productType: "",
    Tax: "",
    PriceAfterDiscount: "",
    height: "",
    width: "",
    length: "",
  });
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/get-single-product/${productId}`, "GET");
      console.log(response.data.product)

      const productData = await response?.data?.product;
      await setProduct(productData);
      await setSizes(response?.data?.sizes);
      await setNutritions(response?.data?.productNuturitions || []);
      await setIncludes(response?.data?.include || []);

      // Set form data with the product details
      await setFormData({
        name: productData?.name,
        description: productData?.description,
        price: productData?.price,
        quantity: productData?.quantity,
        category: productData?.category?._id,
        subcategory: productData?.subcategory?._id,
        brand: productData?.brand,
        image: productData?.image,
        thumbnail: productData?.thumbnail,
        discountPercentage: productData?.discountPercentage,
        productType: productData?.productType,
        Tax: productData?.Tax,
        PriceAfterDiscount: productData?.PriceAfterDiscount,
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [productId]);
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
  useEffect(() => {
    fetchCategory();
  }, []);

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "category") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        subcategory: "", // Reset subcategory when category changes
      }));
    }
  };



  // nutrition
  const handleNutritionChange = (e, index, field) => {
    const updatedNutritions = [...nutritions];
    updatedNutritions[index][field] = e.target.value;
    setNutritions(updatedNutritions);
  };
  const handleAddMoreNutrition = () => {
    setNutritions([...nutritions, { nutrition: "", value: "" }]);
  };

  // const handleDeleteNutrition = async (nutritionId) => {
  //   if (nutritionId) {
  //     try {
  //       await makeApi(`/api/delete-nutrition/${nutritionId}`, "DELETE");
  //     } catch (error) {
  //       console.error("Error deleting nutrition:", error);
  //     }
  //   }
  //   setNutritions(nutritions.filter((_, index) => index !== nutritionId));
  // };
  const handleDeleteNutrition = async (nutritionId, index) => {
    try {
      if (nutritionId) {
        // If nutrition has an _id, it exists in the database, so delete it via API
        await makeApi(`/api/delete-nutrition/${nutritionId}`, "DELETE");
      }
      // Remove the nutrition from the local state
      setNutritions(nutritions.filter((_, i) => i !== index));
      toast.success("Size deleted successfully!");

    } catch (error) {
      console.error("Error deleting nutrition:", error);
    }
  };

  // include
  const handleIncludeChange = (e, index, field) => {
    const updatedIncludes = [...includes];
    updatedIncludes[index][field] = e.target.value;
    setIncludes(updatedIncludes);
  };
  const handleAddMoreInclude = () => {
    setIncludes([...includes, { include: "" }]);
  };

  // const handleDeleteInclude = async (includeId) => {
  //   try {
  //     await makeApi(`/api/delete-include/${includeId}`, "DELETE");
  //     setIncludes(includes.filter((include) => include._id !== includeId));
  //   } catch (error) {
  //     console.error("Error deleting include:", error);
  //   }
  // };
  const handleDeleteInclude = async (includeId, index) => {
    try {
      if (includeId) {
        // If include has an _id, it exists in the database, so delete it via API
        await makeApi(`/api/delete-include/${includeId}`, "DELETE");
      }
      // Remove the include from the local state
      setIncludes(includes.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting include:", error);
    }
  };

  // size
  const handleSizeChange = (e, index, field) => {
    const updatedSizes = [...sizes];
    updatedSizes[index][field] = e.target.value;

    // Assuming 'field' could be 'price' or 'discountPercentage'
    if (field === 'price' || field === 'discountPercentage') {
      const price = parseFloat(updatedSizes[index].price) || 0; // Ensure price is a number
      const discountPercentage = parseFloat(updatedSizes[index].discountPercentage) || 0; // Ensure discountPercentage is a number
      updatedSizes[index].FinalPrice = calculateFinalPrice(price, discountPercentage);
    }

    setSizes(updatedSizes);
  };
  const calculateFinalPrice = (price, discountPercentage) => {
    return price - (price * (discountPercentage / 100));
  };

  const handleAddMoreSizes = () => {
    setSizes([...sizes, { size: "null", sizetype: "null",  price: '', discountPercentage: 0, FinalPrice: '' }]);
  };

  // const handleDeleteSize = async (sizeId) => {
  //   try {
  //     await makeApi(`/api/delete-productsize/${sizeId}`, "DELETE");
  //     setSizes(sizes.filter((size) => size._id !== sizeId));
  //     setShowConfirm({ show: false, sizeId: null });
  //   } catch (error) {
  //     console.error("Error deleting size:", error);
  //   }
  // };
  const handleDeleteSize = async (sizeId, index) => {
    try {
      if (sizeId) {
        // If size has an _id, it exists in the database, so delete it via API
        await makeApi(`/api/delete-productsize/${sizeId}`, "DELETE");
      }
      // Remove the size from the local state
      setSizes(sizes.filter((_, i) => i !== index));
      setShowConfirm({ show: false, sizeId: null }); // Reset confirmation dialog
    } catch (error) {
      console.error("Error deleting size:", error);
    }
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    try {
      const url = await uploadToCloudinary(file, setUploadProgress);
      if (type === "thumbnail") {
        setFormData({ ...formData, thumbnail: url });
      } else {
        setFormData({ ...formData, image: [...formData.image, url] });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = formData.image.filter((_, i) => i !== index);
    setFormData({ ...formData, image: updatedImages });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const updatedFormData = { ...formData };
  //     if (!updatedFormData.subcategory) {
  //       delete updatedFormData.subcategory;
  //     }
  //     setUpdateLoader(true);
  //     // await makeApi(`/api/update-product/${productId}`, "PUT", formData);
  //     await makeApi(`/api/update-product/${productId}`, "PUT", updatedFormData);
  //     for (const nutrition of nutritions) {
  //       if (nutrition._id) {
  //         await makeApi(`/api/update-nutrition/${nutrition._id}`, "PUT", nutrition);
  //       } else if (nutrition.nutrition && nutrition.value) {
  //         await makeApi(`/api/add-nutrition`, "POST", {
  //           productId,
  //           ...nutrition,
  //         });
  //       }
  //     }
  //     for (const size of sizes) {
  //       if (size._id) {
  //         await makeApi(`/api/update-productsize/${size._id}`, "PUT", size);
  //       } else {
  //         await makeApi(`/api/add-productsize`, "POST", {
  //           productId,
  //           ...size,
  //         });
  //       }
  //     }

  //     for (const include of includes) {
  //       if (include._id) {
  //         await makeApi(`/api/update-include/${include._id}`, "PUT", include);
  //       } else if (include.include) {
  //         await makeApi(`/api/include-product`, "POST", {
  //           productId,
  //           ...include,
  //         });
  //       }
  //     }
  //     toast("product update successfully")
  //     console.log("Product updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //   } finally {
  //     fetchProduct()
  //     setUpdateLoader(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let requiredFields = [];
  console.log(formData);
    if (!formData.name) requiredFields.push("Name");
    if (!formData.category) requiredFields.push("Category");
    if (!formData.thumbnail) requiredFields.push("Thumbnail");
   
  
    // Validate product sizes
    for (let i = 0; i < sizes.length; i++) {
      const { height, width, length } = sizes[i];
      if (!height || !width || !length) {
        toast.error(`Please provide height, width, and length for all product sizes.`);
        return;
      }
    }
  
    // If required fields are missing, show an error message
    if (requiredFields.length > 0) {
      const fieldNames = requiredFields.join(", ");
      toast.error(`Please fill all required fields: ${fieldNames}`);
      return;
    }
  
    try {
      const updatedFormData = { ...formData };
      if (!updatedFormData.subcategory) {
        delete updatedFormData.subcategory;
      }
  
      setUpdateLoader(true);
  
      // Update product details
      await makeApi(`/api/update-product/${productId}`, "PUT", updatedFormData);
  
      // Update or add nutrition details
      for (const nutrition of nutritions) {
        if (nutrition._id) {
          await makeApi(`/api/update-nutrition/${nutrition._id}`, "PUT", nutrition);
        } else if (nutrition.nutrition && nutrition.value) {
          await makeApi(`/api/add-nutrition`, "POST", {
            productId,
            ...nutrition,
          });
        }
      }
  
      // Update or add product sizes
      for (const size of sizes) {
        if (size._id) {
          await makeApi(`/api/update-productsize/${size._id}`, "PUT", size);
        } else {
          await makeApi(`/api/add-productsize`, "POST", {
            productId,
            ...size,
          });
        }
      }
  
      // Update or add included items
      for (const include of includes) {
        if (include._id) {
          await makeApi(`/api/update-include/${include._id}`, "PUT", include);
        } else if (include.include) {
          await makeApi(`/api/include-product`, "POST", {
            productId,
            ...include,
          });
        }
      }
  
      toast.success("Product updated successfully!");
      console.log("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    } finally {
      fetchProduct();
      setUpdateLoader(false);
      toast.success("Product updated successfully!");

    }
  };
  

  const handleRemoveImageInput = (index) => {
    const updatedInputs = imageInputs.filter((_, i) => i !== index);
    setImageInputs(updatedInputs);
  };

  return (
    <>
    <ToastContainer/>
      {loading ? (
        <Loader />
      ) : (
        <div className="p-1">
          <div className="add-product-container">
            {/* Header Section */}
            <div className="header-section">
              <div className="back_arrow_div">
                <Link to={"/admin/allproducts"} className="back_arrow_add_product">
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
              <div className="add_product_text">Update Product</div>
              <ToastContainer position="top-center" autoClose={2000} />
            </div>

            <form onSubmit={handleSubmit} className="form_section_for_add_product">
              {/* General Information Section */}
              <div className="section-wrapper">
                <div>
                  <h3 className="add_product_text_new">Product Name</h3>
                </div>
                <div className="add_product_input_fileds">
                  <input
                    type="text"
                    className="add_product_input_filed_new"
                    placeholder="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="section-wrapper">
                <div>
                  <h3 className="add_product_text_new">Product Description</h3>
                </div>
                <div className="add_product_input_fileds">
                  <input
                    type="text"
                    className="add_product_input_filed_new"
                    placeholder="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Images Section */}
              <div className="section-wrapper">
                <div className="update_product_Image_section ">
                  <label>Thumbnail:</label>
                  <div className="add_product_input_fileds">

                    <input
                      type="file"
                      className=" add_product_input_filed_new"

                      onChange={(e) => handleImageUpload(e, "thumbnail")}
                    />
                  </div>
                  {formData.thumbnail && (
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail"
                      className="update_product_image_thumbnail"
                      width={150}
                      height={150}
                    />
                  )}
                </div>

                <div className="section-wrapper">
                  <div>
                    <h3 className="add_product_text_new">Product Images</h3>
                  </div>
                  <div className="add_product_input_fileds d-flex pt-3">
                    <div className="add_more_products_items_div_input_field">
                      {imageInputs.map((input, index) => (
                        <div key={index} className="add_product_input_fileds">
                          <input
                            type="file"
                            className="add_product_input_filed_new"
                            onChange={(e) => handleImageUpload(e, index)}
                          />
                          {uploadProgress[index] !== undefined && (
                            <div className="upload-progress">
                              {uploadProgress[index]}%
                              {uploadProgress[index] < 100 && <div className="loader"></div>}
                            </div>
                          )}
                          {/* <button
                            type="button"
                            className="remove_btton_add_product mt-3"
                            onClick={() => handleRemoveImageInput(index)}
                          >
                            Remove
                          </button> */}
                        </div>
                      ))}
                    </div>
                    <div className="add_more_products_items_div_button_field">
                      {/* <button
                        type="button"
                        className="add_new_itms_Add_product_new_button"
                        onClick={handleAddMoreImageInput}
                      >
                        <span className="pe-5">+</span>
                        Add More
                      </button> */}
                    </div>
                  </div>
                  <div className="product_images_div_add_product">
                    {formData.image.map((image, index) => (
                      image && (
                        <div className="" key={index}>
                          <div className="product_images_div_add_product_card">
                            <div
                              className="remove_image_Add_product"
                              onClick={() => handleImageRemove(index)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                fill="currentColor"
                                className="bi bi-dash"
                                viewBox="0 0 16 16"
                              >
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
              </div>
              <select
                className="add_product_input_filed"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {formData?.category && (
                <select
                  className="add_product_input_filed"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                >
                  <option value="">Select Subcategory</option>
                  {categories
                    .find((cat) => cat._id === formData.category)
                    ?.subcategories?.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    ))}
                </select>
              )}


              {/* Sizes Section */}
              {/* <div className="section-wrapper">
                <h3>Product Sizes</h3>
                {sizes.map((size, index) => (
                  <div className="size-wrapper add_product_input_fileds" key={index}>
                    <div className="input-group-for-size">
                      <label htmlFor={`size-${index}`} className="product_add_label">Size</label>
                      <input
                        type="text"
                        className="add_product_input_filed_for_size"
                        id={`size-${index}`}
                        placeholder="Size"
                        value={size.size}
                        onChange={(e) => handleSizeChange(e, index, "size")}
                      />
                    </div>

                    <div className="input-group-for-size">
                      <label htmlFor={`sizetype-${index}`} className="product_add_label">Size Type</label>
                      <select
                        id={`sizetype-${index}`}
                        value={size.sizetype}
                        onChange={(e) => handleSizeChange(e, index, "sizetype")}
                        className="add_product_input_filed_for_size"
                      >
                        <option value="null" >select size type</option>
                        <option value="Kg">Kg</option>
                        <option value="Gram">Gram</option>
                        <option value="Litre">Litre</option>
                        <option value="ML">ML</option>
                        <option value="Pound">Pound</option>
                        <option value="Meter">Meter</option>
                      </select>
                    </div>

                    <div className="input-group-for-size">
                      <label htmlFor={`quantity-${index}`} className="product_add_label">Quantity</label>
                      <input
                        type="text"
                        className="add_product_input_filed_for_size"
                        id={`quantity-${index}`}
                        placeholder="Quantity"
                        value={size.quantity}
                        onChange={(e) => handleSizeChange(e, index, "quantity")}
                      />
                    </div>

                    <div className="input-group-for-size">
                      <label htmlFor={`price-${index}`} className="product_add_label">Price</label>
                      <input
                        type="text"
                        className="add_product_input_filed_for_size"
                        id={`price-${index}`}
                        placeholder="Price"
                        value={size.price}
                        onChange={(e) => handleSizeChange(e, index, "price")}
                      />
                    </div>

                    <div className="input-group-for-size">
                      <label htmlFor={`discountPercentage-${index}`} className="product_add_label">Discount Percentage</label>
                      <input
                        type="text"
                        className="add_product_input_filed_for_size"
                        id={`discountPercentage-${index}`}
                        placeholder="Discount Percentage"
                        value={size.discountPercentage}
                        onChange={(e) => handleSizeChange(e, index, "discountPercentage")}
                      />
                    </div>

                    <div className="input-group-for-size">
                      <label htmlFor={`FinalPrice-${index}`} className="product_add_label">Final Price</label>
                      <input
                        type="text"
                        className="add_product_input_filed_for_size"
                        id={`FinalPrice-${index}`}
                        placeholder="Final Price"
                        value={calculateFinalPrice(size.price, size.discountPercentage)}
                        onChange={(e) => handleSizeChange(e, index, "FinalPrice")}
                      />
                    </div>

                    <div className="input-group-for-size">
                      <label htmlFor={`height-${index}`} className="product_add_label">Height</label>
                      <input
                        type="text"
                        className="add_product_input_filed_for_size"
                        id={`height-${index}`}
                        placeholder="Height"
                        value={size.height}
                        onChange={(e) => handleSizeChange(e, index, "height")}
                      />
                    </div>

                    <div className="input-group-for-size">
                      <label htmlFor={`width-${index}`} className="product_add_label">Width</label>
                      <input
                        type="text"
                        className="add_product_input_filed_for_size"
                        id={`width-${index}`}
                        placeholder="Width"
                        value={size.width}
                        onChange={(e) => handleSizeChange(e, index, "width")}
                      />
                    </div>

                    <div className="input-group-for-size">
                      <label htmlFor={`length-${index}`} className="product_add_label">Length</label>
                      <input
                        type="text"
                        className="add_product_input_filed_for_size"
                        id={`length-${index}`}
                        placeholder="Length"
                        value={size.length}
                        onChange={(e) => handleSizeChange(e, index, "length")}
                      />
                    </div>

                    {size._id && (
                      <button
                        type="button"
                        className="remove_btton_add_product"
                        onClick={() => setShowConfirm({ show: true, sizeId: size._id })}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="add_new_itms_Add_product_new_button"
                  onClick={handleAddMoreSizes}
                >
                  <span className="pe-5">+</span>
                  Add More Sizes
                </button>
              </div> */}
              <div className="section-wrapper size_section_edit_page_new">
  <h3>Product Sizes</h3>
  {sizes.map((size, index) => (
    <div className="size-wrapper add_product_input_fileds" key={index}>
      <div className="input-group-for-size">
        <label htmlFor={`size-${index}`} className="product_add_label">Size</label>
        <input
          type="text"
          className="add_product_input_filed_for_size"
          id={`size-${index}`}
          placeholder="Size"
          value={size.size}
          onChange={(e) => handleSizeChange(e, index, "size")}
        />
      </div>

      <div className="input-group-for-size">
        <label htmlFor={`sizetype-${index}`} className="product_add_label">Size Type</label>
        <select
          id={`sizetype-${index}`}
          value={size.sizetype}
          onChange={(e) => handleSizeChange(e, index, "sizetype")}
          className="add_product_input_filed_for_size"
        >
          <option value="null">Select size type</option>
          <option value="Kg">Kg</option>
          <option value="Gram">Gram</option>
          <option value="Litre">Litre</option>
          <option value="ML">ML</option>
          <option value="Pound">Pound</option>
          <option value="Meter">Meter</option>
        </select>
      </div>

      {/* <div className="input-group-for-size">
        <label htmlFor={`quantity-${index}`} className="product_add_label">Quantity</label>
        <input
          type="text"
          className="add_product_input_filed_for_size"
          id={`quantity-${index}`}
          placeholder="Quantity"
          value={size.quantity}
          onChange={(e) => handleSizeChange(e, index, "quantity")}
        />
      </div> */}

      <div className="input-group-for-size">
        <label htmlFor={`price-${index}`} className="product_add_label">Price</label>
        <input
          type="text"
          className="add_product_input_filed_for_size"
          id={`price-${index}`}
          placeholder="Price"
          value={size.price}
          onChange={(e) => handleSizeChange(e, index, "price")}
        />
      </div>

      <div className="input-group-for-size">
        <label htmlFor={`discountPercentage-${index}`} className="product_add_label">Discount Percentage</label>
        <input
          type="text"
          className="add_product_input_filed_for_size"
          id={`discountPercentage-${index}`}
          placeholder="Discount Percentage"
          value={size.discountPercentage}
          onChange={(e) => handleSizeChange(e, index, "discountPercentage")}
        />
      </div>

      <div className="input-group-for-size">
        <label htmlFor={`FinalPrice-${index}`} className="product_add_label">Final Price</label>
        <input
          type="text"
          className="add_product_input_filed_for_size"
          id={`FinalPrice-${index}`}
          placeholder="Final Price"
          value={calculateFinalPrice(size.price, size.discountPercentage)}
          onChange={(e) => handleSizeChange(e, index, "FinalPrice")}
        />
      </div>

      <div className="input-group-for-size">
        <label htmlFor={`height-${index}`} className="product_add_label">Height</label>
        <input
          type="text"
          className="add_product_input_filed_for_size"
          id={`height-${index}`}
          placeholder="Height"
          value={size.height}
          onChange={(e) => handleSizeChange(e, index, "height")}
        />
      </div>

      <div className="input-group-for-size">
        <label htmlFor={`width-${index}`} className="product_add_label">Width</label>
        <input
          type="text"
          className="add_product_input_filed_for_size"
          id={`width-${index}`}
          placeholder="Width"
          value={size.width}
          onChange={(e) => handleSizeChange(e, index, "width")}
        />
      </div>

      <div className="input-group-for-size">
        <label htmlFor={`length-${index}`} className="product_add_label">Length</label>
        <input
          type="text"
          className="add_product_input_filed_for_size"
          id={`length-${index}`}
          placeholder="Length"
          value={size.length}
          onChange={(e) => handleSizeChange(e, index, "length")}
        />
      </div>
<div>
      <button
        type="button"
        className="remove_btton_add_product "
        onClick={() => {
          if (size._id) {
            setShowConfirm({ show: true, sizeId: size._id });
          } else {
            handleDeleteSize(null, index); // Delete locally if no _id exists
          }
        }}
      >
        Delete
      </button>
      </div>
    </div>
  ))}
  <button
    type="button"
    className="add_new_itms_Add_product_new_button"
    onClick={handleAddMoreSizes}
  >
    <span className="pe-5">+</span>
    Add More Sizes
  </button>
</div>

              {/* Nutrition Section */}
              {/* <div className="section-wrapper">
                <h3>Nutrition Facts</h3>
                {nutritions.map((nutrition, index) => (
                  <div className="size-wrapper pt-3" key={index}>
                    <div className="input-group-for-size">
                      <input
                        type="text"
                        className="add_product_input_filed_for_size"
                        placeholder="Nutrition"
                        value={nutrition.nutrition}
                        onChange={(e) => handleNutritionChange(e, index, "nutrition")}
                      />
                    </div>
                    <div className="input-group-for-size">
                      <input
                        type="text"
                        className="add_product_input_filed_for_size"
                        placeholder="Value"
                        value={nutrition.value}
                        onChange={(e) => handleNutritionChange(e, index, "value")}
                      />
                    </div>
                    {nutrition._id && (
                      <button
                        type="button"
                        className="remove_btton_add_product"
                        onClick={() => handleDeleteNutrition(nutrition._id)}
                      >
                        Delete Nutrition
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="add_new_itms_Add_product_new_button mt-2"
                  onClick={handleAddMoreNutrition}
                >
                  <span className="pe-5">+</span>
                  Add More Nutrition
                </button>
              </div> */}
              <div className="section-wrapper">
  <h3>Nutrition Facts</h3>
  {nutritions.map((nutrition, index) => (
    <div className="size-wrapper pt-3" key={index}>
      <div className="input-group-for-size">
        <input
          type="text"
          className="add_product_input_filed_for_size"
          placeholder="Nutrition"
          value={nutrition.nutrition}
          onChange={(e) => handleNutritionChange(e, index, "nutrition")}
        />
      </div>
      <div className="input-group-for-size">
        <input
          type="text"
          className="add_product_input_filed_for_size"
          placeholder="Value"
          value={nutrition.value}
          onChange={(e) => handleNutritionChange(e, index, "value")}
        />
      </div>
      <button
        type="button"
        className="remove_btton_add_product"
        onClick={() => handleDeleteNutrition(nutrition._id, index)}
      >
        Delete Nutrition
      </button>
    </div>
  ))}
  <button
    type="button"
    className="add_new_itms_Add_product_new_button mt-2"
    onClick={handleAddMoreNutrition}
  >
    <span className="pe-5">+</span>
    Add More Nutrition
  </button>
</div>

              {/* Includes Section */}
              {/* <div className="section-wrapper">
                <h3>Includes</h3>
                {includes.map((include, index) => (
                  <div className="size-wrapper pt-3" key={index}>
                    <div className="input-group-for-size">
                      <input
                        type="text"
                        className="add_product_input_filed_for_size"
                        placeholder="Include"
                        value={include.include}
                        onChange={(e) => handleIncludeChange(e, index, "include")}
                      />
                    </div>
                    {include._id && (
                      <button
                        type="button"
                        className="remove_btton_add_product"
                        onClick={() => handleDeleteInclude(include._id)}
                      >
                        Delete Include
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="add_new_itms_Add_product_new_button mt-2"
                  onClick={handleAddMoreInclude}
                >
                  <span className="pe-5">+</span>
                  Add More Includes
                </button>
              </div> */}
              <div className="section-wrapper">
                <h3>Includes</h3>
                {includes.map((include, index) => (
                  <div className="size-wrapper pt-3" key={index}>
                    <div className="input-group-for-size">
                      <input
                        type="text"
                        className="add_product_input_filed_for_size"
                        placeholder="Include"
                        value={include.include}
                        onChange={(e) => handleIncludeChange(e, index, "include")}
                      />
                    </div>
                    <button
                      type="button"
                      className="remove_btton_add_product"
                      onClick={() => handleDeleteInclude(include._id, index)}
                    >
                      Delete Include
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="add_new_itms_Add_product_new_button mt-2"
                  onClick={handleAddMoreInclude}
                >
                  <span className="pe-5">+</span>
                  Add More Includes
                </button>
              </div>

              {/* Submit Button */}
              <div className="submit_form_Add_product_admin">
                {updateloader ? (
                  <Loader />
                ) : (
                  <button type="submit" className="add_product_button">
                    Update Product
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Size Popup */}
      {showConfirm.show && (
        <div className="confirm-delete-popup">
          <p>Are you sure you want to delete this size?</p>
          <div>
            <button
              onClick={() => handleDeleteSize(showConfirm.sizeId)}
              className="btn btn-danger"
            >
              Yes
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowConfirm({ show: false, sizeId: null })}
            >
              No
            </button>
          </div>
        </div>
      )}
    </>

  );
}

export default UpdateProduct;

