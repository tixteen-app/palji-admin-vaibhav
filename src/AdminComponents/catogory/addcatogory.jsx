
// import React, { useState } from "react";
// import "../../adminCss/catogory/AddCategory.css";
// import { makeApi } from "../../api/callApi";
// import { Link } from "react-router-dom";

// const AddCategory = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [subcategories, setSubcategories] = useState([]);
//   const [pinCodes, setPinCodes] = useState([""]); // Pin codes as an array
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await makeApi("/api/create-category", "POST", {
//         name,
//         description,
//         subcategorieslist: subcategories,
//         availablePinCodes: pinCodes.filter((code) => code.trim() !== ""), // Filter out empty pin codes
//       });
//         alert("Category added successfully");
//         // setName("");
//         // setDescription("");
//         // setSubcategories([{ name: "", description: "" }]);
//         // setPinCodes([""]); 
//     } catch (error) {
//       console.error("Error adding category:", error);
//       setErrorMessage("Error adding category. Please try again.");
//     }
//   };

//   const handleSubcategoryChange = (index, field, value) => {
//     const updatedSubcategories = subcategories.map((subcategory, i) =>
//       i === index ? { ...subcategory, [field]: value } : subcategory
//     );
//     setSubcategories(updatedSubcategories);
//   };

//   const addSubcategory = () => {
//     setSubcategories([...subcategories, { name: "", description: "" }]);
//   };

//   const removeSubcategory = (index) => {
//     const updatedSubcategories = subcategories.filter((_, i) => i !== index);
//     setSubcategories(updatedSubcategories);
//   };

//   const handlePinCodeChange = (index, value) => {
//     const updatedPinCodes = pinCodes.map((pinCode, i) =>
//       i === index ? value : pinCode
//     );
//     setPinCodes(updatedPinCodes);
//   };

//   const addPinCode = () => {
//     setPinCodes([...pinCodes, ""]);
//   };

//   const removePinCode = (index) => {
//     const updatedPinCodes = pinCodes.filter((_, i) => i !== index);
//     setPinCodes(updatedPinCodes);
//   };

//   return (
//     <>
//       <div>
//         <Link to={"/admin/all-categories"}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="26"
//             height="36"
//             fill="currentColor"
//             className="bi bi-arrow-left back_arrow_icon back_button_add_category"
//             viewBox="0 0 16 16"
//           >
//             <path
//               fillRule="evenodd"
//               d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
//             />
//           </svg>
//         </Link>
//       </div>
//       <div className="add-category">
//         <h2>Add Category</h2>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="description">Description:</label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>

//           {/* Pin Codes Section */}
//           <div className="form-group">
//             <h3>Available Pin Codes</h3>
//             {pinCodes.map((pinCode, index) => (
//               <div key={index} className="pincode-entry">
//                 <input
//                   type="text"
//                   value={pinCode}
//                   onChange={(e) => handlePinCodeChange(index, e.target.value)}
//                   placeholder="Enter pin code"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removePinCode(index)}
//                   className="btn btn-danger remove-button"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button type="button" onClick={addPinCode} className="btn btn-warning">
//               Add Pin Code
//             </button>
//           </div>

//           {/* Subcategory Section */}
//           <div className="subcategory-section">
//             <h2 className="text-center">Subcategories</h2>
//             {subcategories.map((subcategory, index) => (
//               <div key={index} className="subcategory-form">
//                 <div className="form-group">
//                   <label htmlFor={`subcategory-name-${index}`}>Subcategory Name:</label>
//                   <input
//                     type="text"
//                     id={`subcategory-name-${index}`}
//                     value={subcategory.name}
//                     onChange={(e) =>
//                       handleSubcategoryChange(index, "name", e.target.value)
//                     }
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor={`subcategory-description-${index}`}>
//                     Subcategory Description:
//                   </label>
//                   <textarea
//                     id={`subcategory-description-${index}`}
//                     value={subcategory.description}
//                     onChange={(e) =>
//                       handleSubcategoryChange(index, "description", e.target.value)
//                     }
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => removeSubcategory(index)}
//                   className="btn btn-danger"
//                 >
//                   Remove Subcategory
//                 </button>
//               </div>
//             ))}
//             <button type="button" onClick={addSubcategory} className="btn btn-warning my-4">
//               Add Subcategory
//             </button>
//           </div>

//           <div className="text-center">
//             <button
//               type="submit"
//               className="admin_add_product_button add_category_button"
//             >
//               Add Category
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddCategory;

import React, { useState } from "react";
import "../../adminCss/catogory/AddCategory.css";
import { makeApi } from "../../api/callApi";
import { Link } from "react-router-dom";
import uploadToCloudinary from "../../utils/cloudinaryUpload";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageUpload = async (file, setImageState) => {
    try {
      const imageUrl = await uploadToCloudinary(file, setUploadProgress);
      setImageState(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("Failed to upload image. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await makeApi("/api/create-category", "POST", {
        name,
        image,
        subcategorieslist: subcategories,
      });

      alert("Category added successfully");
      setName("");
      setImage(null);
      setSubcategories([]);
    } catch (error) {
      console.error("Error adding category:", error);
      setErrorMessage("Error adding category. Please try again.");
    }
  };

  const handleSubcategoryChange = (index, field, value) => {
    const updatedSubcategories = subcategories.map((subcategory, i) =>
      i === index ? { ...subcategory, [field]: value } : subcategory
    );
    setSubcategories(updatedSubcategories);
  };

  const addSubcategory = () => {
    setSubcategories([...subcategories, { name: "", image: null }]);
  };

  const removeSubcategory = (index) => {
    const updatedSubcategories = subcategories.filter((_, i) => i !== index);
    setSubcategories(updatedSubcategories);
  };

  return (
    <div className="add-category">
      <h2>Add Category</h2>
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
          <label htmlFor="image">Category Image:</label>
          <input
            type="file"
            id="image"
            onChange={(e) => handleImageUpload(e.target.files[0], setImage)}
            required
          />
          {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
        </div>

        {/* Subcategory Section */}
        <div className="subcategory-section">
          <h3>Subcategories</h3>
          {subcategories.map((subcategory, index) => (
            <div key={index} className="subcategory-form">
              <div className="form-group">
                <label htmlFor={`subcategory-name-${index}`}>
                  Subcategory Name:
                </label>
                <input
                  type="text"
                  id={`subcategory-name-${index}`}
                  value={subcategory.name}
                  onChange={(e) =>
                    handleSubcategoryChange(index, "name", e.target.value)
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`subcategory-image-${index}`}>
                  Subcategory Image:
                </label>
                <input
                  type="file"
                  id={`subcategory-image-${index}`}
                  onChange={(e) =>
                    handleImageUpload(e.target.files[0], (imageUrl) =>
                      handleSubcategoryChange(index, "image", imageUrl)
                    )
                  }
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => removeSubcategory(index)}
                className="btn btn-danger"
              >
                Remove Subcategory
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSubcategory}
            className="btn btn-warning my-4"
          >
            Add Subcategory
          </button>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="admin_add_product_button add_category_button"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
