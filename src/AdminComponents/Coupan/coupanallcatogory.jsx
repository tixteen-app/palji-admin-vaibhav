import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../adminCss/catogory/getallcatogory.css";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
import { Link } from "react-router-dom";
import ConfirmationModal from "../product/admindeleteproduct";
function GetallCoupan() {
  console.log("coupan");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await makeApi("/api/get-all-coupan", "GET");
        if (response.status === 200) {
          setCategories(response.data.coupan);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);
  const handleDeleteConfirm = () => {
    if (deleteProductId) {
      deleteProduct(deleteProductId);
      setDeleteProductId(null);
    }
  };
  const deleteProduct = async (productId) => {
    try {
      console.log(productId);
      const response = await makeApi(
        `/api/delete-coupan/${productId}`,
        "DELETE"
      );
      console.log(response);
      setCategories(categories.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-5" >
          <div className="admin_add_product_button_div">
            <Link to="/admin/add-coupan">
              <div className="admin_add_product_button">Add Coupan</div>
            </Link>
          </div>
          <div className="category-list">
            <div className="category-list-header">All Coupan</div>
            <div className="category-list-header"> Total Coupan : {categories?.length}</div>
            <ul className="category_list_ul">
              {categories.map((category) => (
                <li key={category._id}>
                  <div>
                    <h3>Coupan for :{category?.coupanfor}</h3>
                    <h3>Name :{category?.name}</h3>
                    <p> Code : {category?.Coupancode}</p>
                    <p> Discount Percentage : {category?.discountPercentage}%</p>
                    <p> Isexpired : {category?.Isexpired?.toString()}</p>
                    <p> Start Date : {category?.startDate}</p>
                    <p> End Date : {category?.endDate}</p>
                  </div>
                  <div>
                    <div className="all_products_page_button">
                      <Link to={`/admin/update-coupan/${category._id}`}>
                        <button className="edit_button_all_product">
                          Edit
                        </button>
                      </Link>
                      <Link to={`/admin/coupan-details/${category._id}`}>
                        <button className=" btn btn-primary">
                          View details
                        </button>
                      </Link>

                      <button
                        onClick={() => setDeleteProductId(category._id)}
                        className="delete_button_all_product"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <ConfirmationModal
              isOpen={deleteProductId !== null}
              onClose={() => setDeleteProductId(null)}
              onConfirm={handleDeleteConfirm}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default GetallCoupan;
