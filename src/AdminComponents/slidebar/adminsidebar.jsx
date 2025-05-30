// import React, { useState } from "react";
// import "../../adminCss/sidebar/adminsidebar.css";
// import { Link, useNavigate } from "react-router-dom";
// import Logo from "./logo.png";

// function Adminsidebar() {
//   const [selectedItem, setSelectedItem] = useState("");
//   const [isOpen, setIsOpen] = useState(true);
//   const navigate = useNavigate(); // useNavigate for redirecting after logout

//   const handleMenuItemClick = (itemName) => {
//     setSelectedItem(itemName);
//   };

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Adjust the key name to match your token key
//     navigate("/"); // Redirect to the login page after logout
//   };

//   return (
//     <div className={`main_admin_sidebar ${isOpen ? "open" : "closed"}`}>
//       <div className="admin_sidebar_second">
//         <div className="admin_sidebar">
//           {/* Sidebar Header */}
//           <div className="admin_sidebar_header">
//               <Link to="/admin/admin-dashboard">
//             <div className="admin_sidebar_header_logo">
//               <img
//                 alt="logo"
//                 src={Logo}
//                 className="admin_sidebar_header_logo_img"
//               />
//             </div>
//               </Link>
//           </div>

//           {/* Sidebar Menu */}
//           <div className="admin_sidebar_menu">
//             <div className="admin_sidebar_menu_list">
//               <Link className="Link_tag" to={"/admin/admin-dashboard"}>
//                 <div
//                   className={`admin_sidebar_menu_items ${
//                     selectedItem === "Dashboard" ? "selected" : ""
//                   }`}
//                   onClick={() => handleMenuItemClick("Dashboard")}
//                 >
//                   Dashboard
//                 </div>
//               </Link>
//               <Link className="Link_tag" to={"/admin/allproducts"}>
//                 <div
//                   className={`admin_sidebar_menu_items ${
//                     selectedItem === "All Products" ? "selected" : ""
//                   }`}
//                   onClick={() => handleMenuItemClick("All Products")}
//                 >
//                   Products
//                 </div>
//               </Link>
//               <Link className="Link_tag" to={"/admin/all-orders"}>
//                 <div
//                   className={`admin_sidebar_menu_items ${
//                     selectedItem === "All Orders" ? "selected" : ""
//                   }`}
//                   onClick={() => handleMenuItemClick("All Orders")}
//                 >
//                   Orders
//                 </div>
//               </Link>
//               <Link className="Link_tag" to={"/admin/all-categories"}>
//                 <div
//                   className={`admin_sidebar_menu_items ${
//                     selectedItem === "All Category" ? "selected" : ""
//                   }`}
//                   onClick={() => handleMenuItemClick("All Category")}
//                 >
//                   Category
//                 </div>
//               </Link>
//               <Link className="Link_tag" to={"/admin/all-coupan"}>
//                 <div
//                   className={`admin_sidebar_menu_items ${
//                     selectedItem === "All Coupon" ? "selected" : ""
//                   }`}
//                   onClick={() => handleMenuItemClick("All Coupon")}
//                 >
//                   Coupon
//                 </div>
//               </Link>
//               <Link className="Link_tag" to={"/admin/pincode"}>
//                 <div
//                   className={`admin_sidebar_menu_items ${
//                     selectedItem === "pincode" ? "selected" : ""
//                   }`}
//                   onClick={() => handleMenuItemClick("pincode")}
//                 >
//                   pincode
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Logout Button */}
//         {/* <div className="admin_sidebar_logout">
//           <button className="btn btn-danger" onClick={handleLogout}>
//             Logout
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default Adminsidebar;


import React, { useState } from "react";
import "../../adminCss/sidebar/adminsidebar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./logo.png";

function Adminsidebar() {
  const [selectedItem, setSelectedItem] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleMenuItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={`main_admin_sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="admin_sidebar_second">
        <div className="admin_sidebar">
          {/* Sidebar Header */}
          <div className="admin_sidebar_header">
            <Link to="/admin/admin-dashboard">
              <div className="admin_sidebar_header_logo">
                <img
                  alt="logo"
                  src={Logo}
                  className="admin_sidebar_header_logo_img"
                />
              </div>
            </Link>
          </div>

          {/* Sidebar Menu */}
          <div className="admin_sidebar_menu">
            <div className="admin_sidebar_menu_list">
              <Link className="Link_tag" to={"/admin/admin-dashboard"}>
                <div
                  className={`admin_sidebar_menu_items ${
                    selectedItem === "Dashboard" ? "selected" : ""
                  }`}
                  onClick={() => handleMenuItemClick("Dashboard")}
                >
                  Dashboard
                </div>
              </Link>
              <Link className="Link_tag" to={"/admin/allproducts"}>
                <div
                  className={`admin_sidebar_menu_items ${
                    selectedItem === "All Products" ? "selected" : ""
                  }`}
                  onClick={() => handleMenuItemClick("All Products")}
                >
                  Products
                </div>
              </Link>
              <Link className="Link_tag" to={"/admin/all-orders"}>
                <div
                  className={`admin_sidebar_menu_items ${
                    selectedItem === "All Orders" ? "selected" : ""
                  }`}
                  onClick={() => handleMenuItemClick("All Orders")}
                >
                  Orders
                </div>
              </Link>
              <Link className="Link_tag" to={"/admin/all-categories"}>
                <div
                  className={`admin_sidebar_menu_items ${
                    selectedItem === "All Category" ? "selected" : ""
                  }`}
                  onClick={() => handleMenuItemClick("All Category")}
                >
                  Category
                </div>
              </Link>
              <Link className="Link_tag" to={"/admin/all-coupan"}>
                <div
                  className={`admin_sidebar_menu_items ${
                    selectedItem === "All Coupon" ? "selected" : ""
                  }`}
                  onClick={() => handleMenuItemClick("All Coupon")}
                >
                  Coupon
                </div>
              </Link>
              <Link className="Link_tag" to={"/admin/pincode"}>
                <div
                  className={`admin_sidebar_menu_items ${
                    selectedItem === "pincode" ? "selected" : ""
                  }`}
                  onClick={() => handleMenuItemClick("pincode")}
                >
                  pincode
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="admin_sidebar_logout">
          <button className="logout_button" onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="logout_icon"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Adminsidebar;