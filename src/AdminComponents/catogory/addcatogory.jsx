import "../../adminCss/catogory/AddCategory.css";
import React, { useState, useEffect } from 'react';
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import { Link } from "react-router-dom";

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
    const [description, setDescription] = useState("");
    const [tax, setTax] = useState();
    const [subcategories, setSubcategories] = useState([]);
    const [pinCodes, setPinCodes] = useState([""]); // Pin codes as an array
    const [errorMessage, setErrorMessage] = useState("");

    const [deletedSubcategoryIds, setDeletedSubcategoryIds] = useState([]);


    async function fetchCategories() {
        try {
            setLoading(true);
            const response = await makeApi("/api/get-all-categories", "GET");
            setCategories(response?.data?.categories);

        } catch (error) {
            console.log("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
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
                const response = await makeApi(`/api/delete-category/${deleteCategoryId}`, "DELETE");
                setCategories(categories.filter((cat) => cat._id !== deleteCategoryId));
                setDeleteCategoryId(null);
                setShowDeleteModal(false);
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await makeApi("/api/create-category", "POST", {
                name,
                description,
                tax,
                subcategorieslist: subcategories,
                availablePinCodes: pinCodes.filter((code) => code.trim() !== ""), // Filter out empty pin codes
            });
            setName("");
            setDescription("");
            setTax();
            setSubcategories([{ name: "", description: "" }]);
            setPinCodes([""]);
        } catch (error) {
            console.error("Error adding category:", error);
            setErrorMessage("Error adding category. Please try again.");
        } finally {
            setLoading(false);
            setShowModal(false);
            fetchCategories();
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            // First delete any subcategories that were removed
            if (deletedSubcategoryIds.length > 0) {
                await Promise.all(
                    deletedSubcategoryIds.map(id =>
                        makeApi(`/api/delete-sub-category/${id}`, "DELETE")
                    )
                );
            }

            // Then update the category and remaining subcategories
            const response = await makeApi(`/api/update-category/${editCategoryId}`, "PUT", {
                name,
                description,
                tax,
                subcategorieslist: subcategories,
                availablePinCodes: pinCodes.filter((code) => code.trim() !== ""),
            });

            // Reset state
            setName("");
            setDescription("");
            setTax();
            setSubcategories([{ name: "", description: "" }]);
            setPinCodes([""]);
            setDeletedSubcategoryIds([]);
            setShowEditModal(false);
            fetchCategories();
        } catch (error) {
            console.error("Error updating category:", error);
            setErrorMessage("Error updating category. Please try again.");
        }
    };

    const handleSubcategoryChange = (index, field, value) => {
        const updatedSubcategories = subcategories.map((subcategory, i) =>
            i === index ? { ...subcategory, [field]: value } : subcategory
        );
        setSubcategories(updatedSubcategories);
    };

    const addSubcategory = () => {
        setSubcategories([...subcategories, { name: "", description: "" }]);
    };

    // const removeSubcategory = (index) => {
    //     const updatedSubcategories = subcategories.filter((_, i) => i !== index);
    //     setSubcategories(updatedSubcategories);
    // };
    const removeSubcategory = (index) => {
        const subcategoryToRemove = subcategories[index];
        if (subcategoryToRemove._id) {
            // If it has an ID, it's an existing subcategory that should be deleted
            setDeletedSubcategoryIds([...deletedSubcategoryIds, subcategoryToRemove._id]);
        }
        // Remove from the UI
        const updatedSubcategories = subcategories.filter((_, i) => i !== index);
        setSubcategories(updatedSubcategories);
    };

    const handlePinCodeChange = (index, value) => {
        const updatedPinCodes = pinCodes.map((pinCode, i) =>
            i === index ? value : pinCode
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

    const handleEditClick = (category) => {
        setEditCategoryId(category._id);
        setName(category.name);
        setTax(category.tax || 0);
        setDescription(category.description || "");
        // Set subcategories from category.subcategories (not subcategorieslist)
        setSubcategories(category.subcategories?.map(sub => ({
            _id: sub._id, // Include the _id for existing subcategories
            name: sub.name,
            description: sub.description || ""
        })) || []);
        // Set pin codes (ensure it's never empty)
        setPinCodes(category.availablePinCodes?.length > 0
            ? [...category.availablePinCodes]
            : [""]);
        setShowEditModal(true);
    };
    return (
        <div className="new_add_cat_Addcategory">
            <div className="new_add_cat_upperBtn">
                <button onClick={() => setShowModal(true)}>Add Category</button>
            </div>

            <div className="new_add_cat_lowerSection">
                <div className="new_add_cat_categoryHeading">
                    <h4>All Categories</h4>
                </div>

                <div className="new_add_cat_categoryGrid">
                    {categories.map((cat, index) => (
                        <div className="new_add_cat_categoryItem" key={index}>
                            <div className="new_add_cat_categoryUpper">
                                <div className="new_add_cat_cuLeft">
                                    <p>{cat.name}</p>
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
                                    <p>Available Pin Codes:</p>
                                    <p>{cat.availablePinCodes.length > 0 ? cat.availablePinCodes.join(', ') : "No Pin Codes Available"}</p>
                                </div>
                            </div>
                            <p>tax:{cat.tax}</p>

                        </div>
                    ))}
                </div>
            </div>

            {/* Add Category Modal */}
            {showModal && (
                <div className="new_add_cat_modal-overlay">
                    <div className="">
                        <form onSubmit={handleSubmit} className='new_add_coupan_form'>
                            <div className='main_add_new_popup_heading_div'>
                                <div onClick={() => setShowModal(false)} style={{ cursor: "pointer" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                    </svg>
                                </div>
                                <div className="add_coupan_heading">Add category</div>
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
                                    <label htmlFor="name">Tax:</label>
                                    <input
                                        type="number"
                                        id="tax"
                                        value={tax}
                                        onChange={(e) => setTax(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group-for-add-coupan">
                                    <label>Available Pin Codes</label>
                                    <br />
                                    {pinCodes.map((pinCode, index) => (
                                        <div key={index} className="form-group-for-add-coupan div_popup_input_div">
                                            <div className="popup_input_div_new">
                                                <input
                                                    type="text"
                                                    value={pinCode}
                                                    onChange={(e) => handlePinCodeChange(index, e.target.value)}
                                                    placeholder="Enter pin code"
                                                    className="add_product_input_filed_new"
                                                />
                                            </div>
                                            <div className="add_more_products_items_div_button_field popup_button_div_new">
                                                <button
                                                    type="button"
                                                    className="remove_item_button"
                                                    onClick={() => removePinCode(index)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addPinCode} className="add_item_button_new_popup">
                                        Add Pin Code
                                    </button>
                                </div>

                                <div className="form-group-for-add-coupan">
                                    <label>Subcategories</label>
                                    <br />
                                    {subcategories.map((subcategory, index) => (
                                        <div key={index} className="form-group-for-add-coupan div_popup_input_div">
                                            <div className="popup_input_div_new">
                                                <input
                                                    type="text"
                                                    id={`subcategory-name-${index}`}
                                                    value={subcategory.name}
                                                    onChange={(e) =>
                                                        handleSubcategoryChange(index, "name", e.target.value)
                                                    }
                                                    className="add_product_input_filed_new"
                                                    placeholder="Enter subcategory name"
                                                />
                                            </div>
                                            <div className="add_more_products_items_div_button_field popup_button_div_new">
                                                <button
                                                    type="button"
                                                    className="remove_item_button"
                                                    onClick={() => removeSubcategory(index)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addSubcategory} className="add_item_button_new_popup">
                                        Add Subcategory
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="add_coupan_button_new"
                                >
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Category Modal */}
            {showEditModal && (
                <div className="new_add_cat_modal-overlay">
                    <div className="">
                        <form onSubmit={handleEditSubmit} className='new_add_coupan_form'>
                            <div className='main_add_new_popup_heading_div'>
                                <div onClick={() => setShowEditModal(false)} style={{ cursor: "pointer" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                    </svg>
                                </div>
                                <div className="add_coupan_heading">Edit category</div>
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
                                    <label htmlFor="name">Tax:</label>
                                    <input
                                        type="number"
                                        id="name"
                                        value={tax}
                                        onChange={(e) => setTax(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group-for-add-coupan">
                                    <label>Available Pin Codes</label>
                                    <br />
                                    {pinCodes.map((pinCode, index) => (
                                        <div key={index} className="form-group-for-add-coupan div_popup_input_div">
                                            <div className="popup_input_div_new">
                                                <input
                                                    type="text"
                                                    value={pinCode}
                                                    onChange={(e) => handlePinCodeChange(index, e.target.value)}
                                                    placeholder="Enter pin code"
                                                    className="add_product_input_filed_new"
                                                />
                                            </div>
                                            <div className="add_more_products_items_div_button_field popup_button_div_new">
                                                <button
                                                    type="button"
                                                    className="remove_item_button"
                                                    onClick={() => removePinCode(index)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addPinCode} className="add_item_button_new_popup">
                                        Add Pin Code
                                    </button>
                                </div>
                                {/* In your edit modal */}
<div className="form-group-for-add-coupan">
  <label>Subcategories</label>
  <br />
  {subcategories.map((subcategory, index) => (
    <div key={subcategory._id || index} className="form-group-for-add-coupan div_popup_input_div">
      <div className="popup_input_div_new">
        <input
          type="text"
          value={subcategory.name}
          onChange={(e) => handleSubcategoryChange(index, "name", e.target.value)}
          placeholder="Enter subcategory name"
          className="add_product_input_filed_new"
        />
       
      </div>
      <div className="add_more_products_items_div_button_field popup_button_div_new">
        <button
          type="button"
          className="remove_item_button"
          onClick={() => removeSubcategory(index)}
        >
          X
        </button>
      </div>
    </div>
  ))}
  <button type="button" onClick={addSubcategory} className="add_item_button_new_popup">
    Add Subcategory
  </button>
</div>
                                <button
                                    type="submit"
                                    className="add_coupan_button_new"
                                >
                                    Update Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Category Confirmation Modal */}
            {showDeleteModal && (
                <div className="new_add_cat_modal-overlay">
                    <div className="new_add_cat_modal">
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete this category?</p>
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