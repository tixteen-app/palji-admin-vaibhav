import React, { useState, useEffect } from "react";
import "../../adminCss/allproduct.css";
import { makeApi } from "../../api/callApi";
import { Link } from "react-router-dom";
import ConfirmationModal from "./admindeleteproduct";

import Loader from "../../components/loader/loader";

const Allproduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockQuery, setStockQuery] = useState("");
  const [ResultPerPage, setResultPerPage] = useState(30000);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [toalProduct, setToalProduct] = useState(0);
  const [productType, setProductType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await makeApi(
          `/api/get-all-products?name=${searchQuery}&category=${category}&IsOutOfStock=${stockQuery}&productType=${productType}&perPage=${ResultPerPage}&page=${currentPage}`,
          "GET"
        );
        setProducts(response.data.products);
        setToalProduct(response.data.totalProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, category, stockQuery, currentPage, ResultPerPage, productType]);

  useEffect(() => {
    const a = Math.ceil(toalProduct / ResultPerPage);
    setTotalPages(a);
  }, [products, ResultPerPage]);

  const deleteProduct = async (productId) => {
    try {
      const response = await makeApi(
        `/api/delete-product/${productId}`,
        "DELETE"
      );
      console.log(response);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteProductId) {
      deleteProduct(deleteProductId);
      setDeleteProductId(null);
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await makeApi("/api/get-all-categories", "GET");
        if (response.status === 200) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div>
        <div className="admin_add_product_button_div">
          <Link to="/admin/add-product">
            <div className="admin_add_product_button">Add product</div>
          </Link>
        </div>
        {/* filter bar */}
        <div className="main_admin_all_product_filter_bar">
          <div className="inputBox_container">
            <input
              className="inputBox"
              id="inputBox"
              type="text"
              value={searchQuery}
              placeholder="Search For Products"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <select
              className="add_product_input_filed add_product_dropdown"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>Select Category</option>
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="add_product_input_filed add_product_dropdown"
              value={ResultPerPage}
              onChange={(e) => setResultPerPage(e.target.value)}
            >
              <option value={20} disabled>Result Per page</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={150}>150</option>
              <option value={300}>300</option>
              <option value={450}>450</option>
              <option value={600}>600</option>
              <option value={1000}>1000</option>
            </select>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div>
              <div className="text-center">
                {products.length === 0 && (
                  <img src="https://prenixfurniture.com/image/noproduct.jpg" alt="no product" className="w-50 img-fluid" />
                )}
              </div>
            </div>
            <div className="product-list">

              {products.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="text-center p-2 admin_all_product_image_div" >
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className={product.quantity === 0 ? "bw-image admin_all_product_image" : "admin_all_product_image"}
                    />
                  </div>
                  <div className="product-info">
                    <div className="text-center" style={{ fontWeight: "bold" }} >{product.name}</div>
                    <div><b>Category:</b> {product?.category?.name}</div>
                  </div>
                  <div className="all_products_page_button">
                    <div>
                    <Link to={`/admin/product-update/${product._id}`} target="_blank">
                      <button className="edit_button_all_product"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg></button>
                    </Link>
                    </div>
                    <div>
                    <button
                      onClick={() => setDeleteProductId(product._id)}
                      className="delete_button_all_product"
                      style={{ backgroundColor: "#e41010b5" }}
                    >
                      {/* Delete */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </button>
                    </div>
                    <div className="all_products_page_view_button_div" >
                      <Link to={`/admin/product-details/${product._id}`}>
                        <button className="view_button_all_product">View</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        )}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={pageNumber === currentPage ? "active" : ""}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={deleteProductId !== null}
        onClose={() => setDeleteProductId(null)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default Allproduct;
