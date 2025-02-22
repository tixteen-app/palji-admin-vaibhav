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


import React, { useState, useEffect } from 'react';
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import { Link } from "react-router-dom";

const AddCategory = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', subcategory: '', pincodes: [] });
    const [tempPincode, setTempPincode] = useState('');
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);

    useEffect(() => {
        async function fetchCategories() {
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
        fetchCategories();
    }, []);

    const addCategory = () => {
        if (!newCategory.name.trim()) return;
        setCategories([...categories, newCategory]);
        setNewCategory({ name: '', subcategory: '', pincodes: [] });
        setShowModal(false);
    };

    const addPincode = () => {
        if (tempPincode.trim()) {
            setNewCategory({ ...newCategory, pincodes: [...newCategory.pincodes, tempPincode] });
            setTempPincode('');
        }
    };

    const removePincode = (index) => {
        const updatedPincodes = newCategory.pincodes.filter((_, i) => i !== index);
        setNewCategory({ ...newCategory, pincodes: updatedPincodes });
    };

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

    return (
        <div className="new_add_cat_Addcategory">
            <div className="new_add_cat_upperBtn">
                <button onClick={() => setShowModal(true)}>Add Coupon</button>
            </div>

            <div className="new_add_cat_lowerSection">
                <div className="new_add_cat_categoryHeading">
                    <p>All Categories</p>
                </div>

                <div className="new_add_cat_categoryGrid">
                    {categories.map((cat, index) => {
                      return (
                        <div className="new_add_cat_categoryItem" key={index}>
                          <div className="new_add_cat_categoryUpper">
                            <div className="new_add_cat_cuLeft">
                              <div style={{ textTransform: "capitalize" }}>{cat.coupanfor}</div>
                              <p>code: <b> {cat.name}</b></p>
                              <p><span>{cat.subcategory}</span></p>
                            </div>
                            <div className="new_add_cat_cuRight">
                              <button className="new_add_cat_editBtn">Edit</button>
                              <button className="new_add_cat_delBtn" onClick={() => {
                                setDeleteCategoryId(cat._id);
                                setShowDeleteModal(true);
                              } }>Delete</button>
                            </div>
                          </div>
                          <div className="new_add_cat_marginLine"></div>
                          <div className="new_add_cat_categoryLower">
                            <div className="new_add_cat_categoryL1">
                              <p>Discount Percentage: <span className='snap_all_couapn' >{cat.discountPercentage}</span></p>
                              <p>Expiry: <span className='snap_all_couapn'>{cat.Isexpired ? "Expired" : "Not Expired" }</span></p>


                              <p className='pt-2'>Start: <span className='snap_all_couapn'>{cat.startDate}</span></p>
                              <p className='pt-2'>End: <span className='snap_all_couapn'>{cat.endDate}</span></p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
            </div>

            {/* Add Category Modal */}
            {showModal && (
                <div className="new_add_cat_modal-overlay">
                    <div className="new_add_cat_modal">
                        <h2>Add Category</h2>
                        <input type="text" placeholder="Name" value={newCategory.name} 
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} />
                        <input type="text" placeholder="Subcategory" value={newCategory.subcategory} 
                            onChange={(e) => setNewCategory({ ...newCategory, subcategory: e.target.value })} />

                        <div className="new_add_cat_pincode-container">
                            {newCategory.pincodes.map((pincode, index) => (
                                <div key={index} className="new_add_cat_pincode-item">
                                    <span>{pincode}</span>
                                    <button onClick={() => removePincode(index)}>X</button>
                                </div>
                            ))}
                        </div>

                        <input type="text" placeholder="Enter Pin Code" value={tempPincode} 
                            onChange={(e) => setTempPincode(e.target.value)} />
                        <button className="new_add_cat_addPincodeBtn" onClick={addPincode}>+ Add Pin Code</button>

                        <button className="new_add_cat_submitBtn" onClick={addCategory}>Add Category</button>
                        <button className="new_add_cat_closeBtn" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}

            {/* Delete Category Confirmation Modal */}
            {showDeleteModal && (
                <div className="new_add_cat_modal-overlay">
                    <div className="new_add_cat_modal">
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete this coupan?</p>
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
