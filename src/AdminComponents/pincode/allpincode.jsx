
import React, { useState, useEffect } from 'react';
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import "../../adminCss/catogory/allcoupannew.css";

const Addpincode = () => {
  const [showModal, setShowModal] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [pincode, setpincode] = useState("");
  const [available, setavailable] = useState("true");
  const [CoupanForList, setCoupanForList] = useState([
    "true",
    "false",
  ]);
  const [selectedCoupanFor, setSelectedCoupanFor] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await makeApi("/api/create-pincode", "POST", {
        pincode,
        available
      });
      setpincode("");
      setavailable("");
    } catch (error) {
      console.error("Error adding Coupan:", error);
    } finally {
      fetchCategories();
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await makeApi(`/api/update-pincode/${editCategoryId}`, "PUT", {
        available,
        pincode,
      });
        alert("Coupan updated successfully");
        setpincode("");
        setavailable("");
        setShowEditModal(false);
        fetchCategories();
    } catch (error) {
      console.error("Error updating Coupan:", error);
    }
  };

  const fetchCategories = async function () {
    try {
      setLoading(true);
      const response = await makeApi("/api/get-all-pincode", "GET");
      setCategories(response?.data?.pincode);
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
        const response = await makeApi(`/api/delete-pincode/${deleteCategoryId}`, "DELETE");
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
    setpincode(coupon.pincode);
    setavailable(coupon.available);
    setShowEditModal(true);
  };

  return (
    <div className="new_add_cat_Addcategory">
      <div className="new_add_cat_upperBtn">
        <button onClick={() => setShowModal(true)}>Add Pincode</button>
      </div>

      <div className="new_add_cat_lowerSection">
        <div className="new_add_cat_categoryHeading">
          <h4>All Serviceable pincode</h4>
        </div>

        <div className="new_add_cat_categoryGrid">
          {categories.map((cat, index) => {
            return (
              <div className="new_add_cat_categoryItem" key={index}>
                <div className="new_add_cat_categoryUpper">
                <div className="new_add_cat_categoryLower">
                  <div className="new_add_cat_categoryL1">
                    <p>Serviceable pincode: <span className='snap_all_couapn' >{cat.pincode}</span></p>
              
                  </div>
                </div>
                  <div className="new_add_cat_cuRight">
                    <button className="new_add_cat_editBtn" onClick={() => handleEditClick(cat)}>Edit</button>
                    <button className="new_add_cat_delBtn" onClick={() => {
                      setDeleteCategoryId(cat._id);
                      setShowDeleteModal(true);
                    }}>Delete</button>
                  </div>
                </div>
                {/* <div className="new_add_cat_marginLine"></div> */}
               
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
                <div className="add_coupan_heading">Add pincode</div>
              </div>
              <div className='add_coupan_second_div'>
                <div className="form-group-for-add-coupan">
                  <label htmlFor="name">Pincode:</label>
                  <input
                    type="text"
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setpincode(e.target.value)}
                    required
                  />
                </div>
              
               

                <button type="submit" className="add_coupan_button_new">
                  Add pincode
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
                  <label htmlFor="name">pincode:</label>
                  <input
                    type="text"
                    id="name"
                    value={pincode}
                    onChange={(e) => setpincode(e.target.value)}
                    required
                  />
                </div>
                
                <button type="submit" className="add_coupan_button_new">
                  Update Pincode
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

export default Addpincode;