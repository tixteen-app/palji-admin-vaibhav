// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../adminCss/catogory/getallcatogory.css";
// import { makeApi } from "../../api/callApi";
// import Loader from "../../components/loader/loader";
// import { Link } from "react-router-dom";
// import ConfirmationModal from "../product/admindeleteproduct";
// function GetallCoupan() {
//   console.log("coupan");
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [deleteProductId, setDeleteProductId] = useState(null);

//   useEffect(() => {
//     async function fetchCategories() {
//       try { 
//         setLoading(true);
//         const response = await makeApi("/api/get-all-coupan", "GET");
//         if (response.status === 200) {
//           setCategories(response.data.coupan);
//         }
//       } catch (error) {
//         console.log("Error fetching categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchCategories();
//   }, []);
//   const handleDeleteConfirm = () => {
//     if (deleteProductId) {
//       deleteProduct(deleteProductId);
//       setDeleteProductId(null);
//     }
//   };
//   const deleteProduct = async (productId) => {
//     try {
//       console.log(productId);
//       const response = await makeApi(
//         `/api/delete-coupan/${productId}`,
//         "DELETE"
//       );
//       console.log(response);
//       setCategories(categories.filter((product) => product._id !== productId));
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="mt-5" >
//           <div className="admin_add_product_button_div">
//             <Link to="/admin/add-coupan">
//               <div className="admin_add_product_button">Add Coupan</div>
//             </Link>
//           </div>
//           <div className="category-list">
//             <div className="category-list-header">All Coupan</div>
//             <div className="category-list-header"> Total Coupan : {categories?.length}</div>
//             <ul className="category_list_ul">
//               {categories.map((category) => (
//                 <li key={category._id}>
//                   <div>
//                     <h3>Coupan for :{category?.coupanf or}</h3>
//                     <h3>Name :{category?.name}</h3>
//                     <p> Code : {category?.Coupancode}</p>
//                     <p> Discount Percentage : {category?.discountPercentage}%</p>
//                     <p> Isexpired : {category?.Isexpired?.toString()}</p>
//                     <p> Start Date : {category?.startDate}</p>
//                     <p> End Date : {category?.endDate}</p>
//                   </div>
//                   <div>
//                     <div className="all_products_page_button">
//                       <Link to={`/admin/update-coupan/${category._id}`}>
//                         <button className="edit_button_all_product">
//                           Edit
//                         </button>
//                       </Link>
//                       <Link to={`/admin/coupan-details/${category._id}`}>
//                         <button className=" btn btn-primary">
//                           View details
//                         </button>
//                       </Link>

//                       <button
//                         onClick={() => setDeleteProductId(category._id)}
//                         className="delete_button_all_product"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <ConfirmationModal
//               isOpen={deleteProductId !== null}
//               onClose={() => setDeleteProductId(null)}
//               onConfirm={handleDeleteConfirm}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default GetallCoupan;


// import React, { useState, useEffect } from 'react';
// import { makeApi } from "../../api/callApi";
// import Loader from "../../components/loader/loader";
// import { Link } from "react-router-dom";
// import "../../adminCss/catogory/allcoupannew.css";


// const AddCategory = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [newCategory, setNewCategory] = useState({ name: '', subcategory: '', pincodes: [] });
//   const [tempPincode, setTempPincode] = useState('');
//   const [categories, setCategories] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [deleteCategoryId, setDeleteCategoryId] = useState(null);



//   const [name, setName] = useState("");

//   const [Coupancode, setCoupancode] = useState("");
//   const [discountPercentage, setdiscountPercentage] = useState("");
//   const [Coupanfor, setCoupanfor] = useState("");
//   const [applicableCategories, setapplicableCategories] = useState([]);
//   const [applicableProducts, setapplicableProducts] = useState([]);
//   const [minimumOrderValue, setminimumOrderValue] = useState();
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [CoupanForList, setCoupanForList] = useState([
//     "all",
//     "minimumOrderValue",
//   ]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [selectedCoupanFor, setSelectedCoupanFor] = useState();
//   const [products, setProducts] = useState([]);



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       //   const response = await axios.post('/api/add-category', { name, description });
//       const response = await makeApi("/api/create-coupan", "POST", {
//         name,
//         Coupancode,
//         discountPercentage,
//         coupanfor: selectedCoupanFor,
//         applicableCategories,
//         applicableProducts,
//         minimumOrderValue,
//         startDate,
//         endDate,
//       });
//       if (response.status === 201) {
//         console.log(response);
//         alert("Coupan added successfully");
//         setName("");
//         setCoupancode("");
//         setdiscountPercentage("");
//         setCoupanfor("");
//         setapplicableCategories([]);
//         setapplicableProducts([]);
//         setminimumOrderValue("");
//         setStartDate("");
//         setEndDate("");
//       }
//     } catch (error) {
//       console.error("Error adding Coupan:", error);
//       setErrorMessage("Error adding Coupan. Please try again.");
//     }
//   };

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         setLoading(true);
//         const response = await makeApi("/api/get-all-coupan", "GET");
//         setCategories(response?.data?.coupan);
//       } catch (error) {
//         console.log("Error fetching categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchCategories();
//   }, []);

//   const addCategory = () => {
//     if (!newCategory.name.trim()) return;
//     setCategories([...categories, newCategory]);
//     setNewCategory({ name: '', subcategory: '', pincodes: [] });
//     setShowModal(false);
//   };

//   const addPincode = () => {
//     if (tempPincode.trim()) {
//       setNewCategory({ ...newCategory, pincodes: [...newCategory.pincodes, tempPincode] });
//       setTempPincode('');
//     }
//   };

//   const removePincode = (index) => {
//     const updatedPincodes = newCategory.pincodes.filter((_, i) => i !== index);
//     setNewCategory({ ...newCategory, pincodes: updatedPincodes });
//   };

//   const handleDeleteConfirm = async () => {
//     if (deleteCategoryId) {
//       try {
//         const response = await makeApi(`/api/delete-coupan/${deleteCategoryId}`, "DELETE");
//         setCategories(categories.filter((cat) => cat._id !== deleteCategoryId));
//         setDeleteCategoryId(null);
//         setShowDeleteModal(false);
//       } catch (error) {
//         console.error("Error deleting category:", error);
//       }
//     }
//   };
//   const handleCategoryChange = (categoryId) => {
//     const updatedCategories = [...applicableCategories];
//     if (updatedCategories.includes(categoryId)) {
//       // If already selected, remove it
//       const index = updatedCategories.indexOf(categoryId);
//       updatedCategories.splice(index, 1);
//     } else {
//       updatedCategories.push(categoryId);
//     }
//     setapplicableCategories(updatedCategories);
//   };
//   const handleproductChange = (productId) => {
//     const updatedProducts = [...applicableProducts];
//     if (updatedProducts.includes(productId)) {
//       // If already selected, remove it
//       const index = updatedProducts.indexOf(productId);
//       updatedProducts.splice(index, 1);
//     } else {
//       updatedProducts.push(productId);
//     }
//     setapplicableProducts(updatedProducts);
//   }

//   return (
//     <div className="new_add_cat_Addcategory">
//       <div className="new_add_cat_upperBtn">
//         <button onClick={() => setShowModal(true)}>Add Coupon</button>
//       </div>

//       <div className="new_add_cat_lowerSection">
//         <div className="new_add_cat_categoryHeading">
//           <p>All Categories</p>
//         </div>

//         <div className="new_add_cat_categoryGrid">
//           {categories.map((cat, index) => {
//             return (
//               <div className="new_add_cat_categoryItem" key={index}>
//                 <div className="new_add_cat_categoryUpper">
//                   <div className="new_add_cat_cuLeft">
//                     <div style={{ textTransform: "capitalize" }}>{cat.coupanfor}</div>
//                     <p>code: <b> {cat.name}</b></p>
//                     <p><span>{cat.subcategory}</span></p>
//                   </div>
//                   <div className="new_add_cat_cuRight">
//                     <button className="new_add_cat_editBtn">Edit</button>
//                     <button className="new_add_cat_delBtn" onClick={() => {
//                       setDeleteCategoryId(cat._id);
//                       setShowDeleteModal(true);
//                     }}>Delete</button>
//                   </div>
//                 </div>
//                 <div className="new_add_cat_marginLine"></div>
//                 <div className="new_add_cat_categoryLower">
//                   <div className="new_add_cat_categoryL1">
//                     <p>Discount Percentage: <span className='snap_all_couapn' >{cat.discountPercentage}</span></p>
//                     <p>Expiry: <span className='snap_all_couapn'>{cat.Isexpired ? "Expired" : "Not Expired"}</span></p>


//                     <p className='pt-2'>Start: <span className='snap_all_couapn'>{cat.startDate}</span></p>
//                     <p className='pt-2'>End: <span className='snap_all_couapn'>{cat.endDate}</span></p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Add Category Modal */}
//       {showModal && (

//         <div className="new_add_cat_modal-overlay">
//           <div className="">

//             <form onSubmit={handleSubmit} className='new_add_coupan_form' >
//               <div className='main_add_new_popup_heading_div' >
//                 <div onClick={() => setShowModal(false)} style={{ cursor: "pointer" }}>
//                   <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
//                     <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
//                   </svg>
//                 </div>
//                 <div className="add_coupan_heading">Add Coupon</div>

//               </div>
//               <div className='add_coupan_second_div' >
//                 <div className="form-group-for-add-coupan">
//                   <label htmlFor="name">Name:</label>
//                   <input
//                     type="text"
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="form-group-for-add-coupan">
//                   <label htmlFor="Coupancode">Coupancode:</label>
//                   <input
//                     type="text"
//                     id="Coupancode"
//                     value={Coupancode}
//                     onChange={(e) => setCoupancode(e.target.value.toUpperCase())}
//                     required
//                     style={{ textTransform: 'uppercase' }}
//                   />
//                 </div>
//                 <div className="form-group-for-add-coupan">
//                   <label htmlFor="discountPercentage">discountPercentage:</label>
//                   <input
//                     type="number"
//                     id="discountPercentage"
//                     value={discountPercentage}
//                     onChange={(e) => setdiscountPercentage(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className='form-group-for-add-coupan'>
//                   <label htmlFor="discountPercentage">Coupon for:</label>

//                   <select
//                     className="add_product_input_filed add_product_dropdown"
//                     // value={CoupanFor}
//                     onChange={(e) => setSelectedCoupanFor(e.target.value)}
//                     required
//                   >
//                     <option value="">Coupan For</option>
//                     {CoupanForList.map((Coupan) => (
//                       <option key={Coupan} value={Coupan}>
//                         {Coupan}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {selectedCoupanFor && selectedCoupanFor == "minimumOrderValue" && (
//                   <div className="form-group-for-add-coupan">
//                     <label htmlFor="discountPercentage"> Minimum Order Value:</label>
//                     <input
//                       type="number"
//                       id="minimumOrderValue"
//                       value={minimumOrderValue}
//                       onChange={(e) => setminimumOrderValue(e.target.value)}
//                       required
//                     />
//                   </div>
//                 )}
//                 <div className="form-group-for-add-coupan">
//                   <label htmlFor="startDate">Start Date:</label>
//                   <input
//                     type="date"
//                     id="startDate"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="form-group-for-add-coupan">
//                   <label htmlFor="endDate">End Date:</label>
//                   <input
//                     type="date"
//                     id="endDate"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="add_coupan_button_new"
//                 >
//                   Add Coupan
//                 </button>
//               </div>

//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Category Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="new_add_cat_modal-overlay">
//           <div className="new_add_cat_modal">
//             <h2>Confirm Deletion</h2>
//             <p>Are you sure you want to delete this coupan?</p>
//             <div className="new_add_cat_modal-actions">
//               <button className="new_add_cat_modal-deleteBtn" onClick={handleDeleteConfirm}>Delete</button>
//               <button className="new_add_cat_modal-cancelBtn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddCategory;

import React, { useState, useEffect } from 'react';
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import { Link } from "react-router-dom";
import "../../adminCss/catogory/allcoupannew.css";

const AddCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', subcategory: '', pincodes: [] });
  const [tempPincode, setTempPincode] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);

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
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCoupanFor, setSelectedCoupanFor] = useState();
  const [products, setProducts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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

      setName("");
      setCoupancode("");
      setdiscountPercentage("");
      setCoupanfor("");
      setapplicableCategories([]);
      setapplicableProducts([]);
      setminimumOrderValue("");
      setStartDate("");
      setEndDate("");
      setShowModal(false);

    } catch (error) {
      console.error("Error adding Coupan:", error);
      setErrorMessage("Error adding Coupan. Please try again.");
    } finally {
      fetchCategories();
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await makeApi(`/api/update-coupan/${editCategoryId}`, "PUT", {
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
      if (response.status === 200) {
        alert("Coupan updated successfully");
        setName("");
        setCoupancode("");
        setdiscountPercentage("");
        setCoupanfor("");
        setapplicableCategories([]);
        setapplicableProducts([]);
        setminimumOrderValue("");
        setStartDate("");
        setEndDate("");
        setShowEditModal(false);
        fetchCategories();
      }
    } catch (error) {
      console.error("Error updating Coupan:", error);
      setErrorMessage("Error updating Coupan. Please try again.");
    }
  };

  const fetchCategories = async function () {
    try {
      setLoading(true);
      const response = await makeApi("/api/get-all-coupan", "GET");
      setCategories(response?.data?.coupan);
    } catch (error) {
      console.log("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteConfirm = async () => {
    if (deleteCategoryId) {
      try {
        const response = await makeApi(`/api/delete-coupan/${deleteCategoryId}`, "DELETE");
        setCategories(categories.filter((cat) => cat._id !== deleteCategoryId));
        setDeleteCategoryId(null);
        setShowDeleteModal(false);
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleEditClick = (coupon) => {
    setEditCategoryId(coupon._id);
    setName(coupon.name);
    setCoupancode(coupon.Coupancode);
    setdiscountPercentage(coupon.discountPercentage);
    setSelectedCoupanFor(coupon.coupanfor);
    setapplicableCategories(coupon.applicableCategories || []);
    setapplicableProducts(coupon.applicableProducts || []);
    setminimumOrderValue(coupon.minimumOrderValue || "");
    setStartDate(coupon.startDate || "");
    setEndDate(coupon.endDate || "");
    setShowEditModal(true);
  };

  return (
    <div className="new_add_cat_Addcategory">
      <div className="new_add_cat_upperBtn">
        <button onClick={() => setShowModal(true)}>Add Coupon</button>
      </div>

      <div className="new_add_cat_lowerSection">
        <div className="new_add_cat_categoryHeading">
          <h4>All Coupons</h4>
        </div>

        <div className="new_add_cat_categoryGrid">
          {categories.map((cat, index) => {
            return (
              <div className="new_add_cat_categoryItem" key={index}>
                <div className="new_add_cat_categoryUpper">
                  <div className="new_add_cat_cuLeft">
                    <div style={{ textTransform: "capitalize" }}>{cat.coupanfor}</div>
                    <p>code: <b> {cat.Coupancode}</b></p>
                    <p><span>{cat.subcategory}</span></p>
                  </div>
                  <div className="new_add_cat_cuRight">
                    <button className="new_add_cat_editBtn" onClick={() => handleEditClick(cat)}>Edit</button>
                    <button className="new_add_cat_delBtn" onClick={() => {
                      setDeleteCategoryId(cat._id);
                      setShowDeleteModal(true);
                    }}>Delete</button>
                  </div>
                </div>
                <div className="new_add_cat_marginLine"></div>
                <div className="new_add_cat_categoryLower">
                  <div className="new_add_cat_categoryL1">
                    <p>Discount Percentage: <span className='snap_all_couapn' >{cat.discountPercentage}</span></p>
                    <p>Expiry: <span className='snap_all_couapn'>{cat.Isexpired ? "Expired" : "Not Expired"}</span></p>
                    {/* <p className='pt-2'>Start: <span className='snap_all_couapn'>{cat.startDate}</span></p>
                    <p className='pt-2'>End: <span className='snap_all_couapn'>{cat.endDate}</span></p> */}
                    <p className='pt-2'>
                      Start: <span className='snap_all_couapn'>
                        {cat.startDate ? new Date(cat.startDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        }) : ""}
                      </span>
                    </p>

                    <p className='pt-2'>
                      End: <span className='snap_all_couapn'>
                        {cat.endDate ? new Date(cat.endDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        }) : ""}
                      </span>
                    </p>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Coupon Modal */}
      {showModal && (
        <div className="new_add_cat_modal-overlay">
          <div className="">
            <form onSubmit={handleSubmit} className='new_add_coupan_form'>
              <div className='main_add_new_popup_heading_div'>
                <div onClick={() => setShowModal(false)} style={{ cursor: "pointer" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                  </svg>
                </div>
                <div className="add_coupan_heading">Add Coupon</div>
              </div>
              <div className='add_coupan_second_div'>
                <div className="form-group-for-add-coupan">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group-for-add-coupan">
                  <label htmlFor="Coupancode">Coupon Code:</label>
                  <input
                    type="text"
                    id="Coupancode"
                    value={Coupancode}
                    onChange={(e) => setCoupancode(e.target.value.toUpperCase())}
                    required
                    style={{ textTransform: 'uppercase' }}
                  />
                </div>
                <div className="form-group-for-add-coupan">
                  <label htmlFor="discountPercentage">Discount Percentage:</label>
                  <input
                    type="number"
                    id="discountPercentage"
                    value={discountPercentage}
                    onChange={(e) => setdiscountPercentage(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group-for-add-coupan'>
                  <label htmlFor="discountPercentage">Coupon For:</label>
                  <select
                    className="add_product_input_filed add_product_dropdown"
                    value={selectedCoupanFor}
                    onChange={(e) => setSelectedCoupanFor(e.target.value)}
                    required
                  >
                    <option value="">Coupon For</option>
                    {CoupanForList.map((Coupan) => (
                      <option key={Coupan} value={Coupan}>
                        {Coupan}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedCoupanFor && selectedCoupanFor === "minimumOrderValue" && (
                  <div className="form-group-for-add-coupan">
                    <label htmlFor="minimumOrderValue">Minimum Order Value:</label>
                    <input
                      type="number"
                      id="minimumOrderValue"
                      value={minimumOrderValue}
                      onChange={(e) => setminimumOrderValue(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="form-group-for-add-coupan">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group-for-add-coupan">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="add_coupan_button_new">
                  Add Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Coupon Modal */}
      {showEditModal && (
        <div className="new_add_cat_modal-overlay">
          <div className="">
            <form onSubmit={handleEditSubmit} className='new_add_coupan_form'>
              <div className='main_add_new_popup_heading_div'>
                <div onClick={() => setShowEditModal(false)} style={{ cursor: "pointer" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                  </svg>
                </div>
                <div className="add_coupan_heading">Edit Coupon</div>
              </div>
              <div className='add_coupan_second_div'>
                <div className="form-group-for-add-coupan">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group-for-add-coupan">
                  <label htmlFor="Coupancode">Coupon Code:</label>
                  <input
                    type="text"
                    id="Coupancode"
                    value={Coupancode}
                    onChange={(e) => setCoupancode(e.target.value.toUpperCase())}
                    required
                    style={{ textTransform: 'uppercase' }}
                  />
                </div>
                <div className="form-group-for-add-coupan">
                  <label htmlFor="discountPercentage">Discount Percentage:</label>
                  <input
                    type="number"
                    id="discountPercentage"
                    value={discountPercentage}
                    onChange={(e) => setdiscountPercentage(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group-for-add-coupan'>
                  <label htmlFor="discountPercentage">Coupon For:</label>
                  <select
                    className="add_product_input_filed add_product_dropdown"
                    value={selectedCoupanFor}
                    onChange={(e) => setSelectedCoupanFor(e.target.value)}
                    required
                  >
                    <option value="">Coupon For</option>
                    {CoupanForList.map((Coupan) => (
                      <option key={Coupan} value={Coupan}>
                        {Coupan}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedCoupanFor && selectedCoupanFor === "minimumOrderValue" && (
                  <div className="form-group-for-add-coupan">
                    <label htmlFor="minimumOrderValue">Minimum Order Value:</label>
                    <input
                      type="number"
                      id="minimumOrderValue"
                      value={minimumOrderValue}
                      onChange={(e) => setminimumOrderValue(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="form-group-for-add-coupan">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group-for-add-coupan">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="add_coupan_button_new">
                  Update Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Coupon Confirmation Modal */}
      {showDeleteModal && (
        <div className="new_add_cat_modal-overlay">
          <div className="new_add_cat_modal">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this coupon?</p>
            <div className="new_add_cat_modal-actions">
              <button className="new_add_cat_modal-deleteBtn" onClick={handleDeleteConfirm}>Delete</button>
              <button className="new_add_cat_modal-cancelBtn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategory;