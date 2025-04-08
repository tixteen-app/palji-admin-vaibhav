import React, { useState, useEffect } from "react";
import "../../adminCss/allproduct.css";
import { makeApi } from "../../api/callApi";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "./admindeleteproduct";
import Loader from "../../components/loader/loader";

const Allproduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize as true
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
  }, [toalProduct, ResultPerPage]);

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
        const response = await makeApi("/api/get-all-categories", "GET");
        if (response.status === 200) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle edit in new tab
  const handleEdit = (productId) => {
    window.open(`/admin/product-update/${productId}`, '_blank');
  };

  return (
    <>
      <div className="main_all_page_div_super">
        <div className="main_admin_all_product_filter_bar">
          <div className="inputBox_container search_box_all_product">
            <input
              className="inputBox"
              id="inputBox"
              type="text"
              value={searchQuery}
              placeholder="Search For Products"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="category_dropdown_all_product">
            <select
              className="add_product_input_filed add_product_dropdown"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="admin_add_product_button_new">
            <Link to="/admin/add-product" className="Link_tag">
              <div className="admin_add_product_button_new_main">
                <span style={{ marginRight: "10px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                </span>
                Add product
              </div>
            </Link>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            {products.length === 0 ? (
              <div className="text-center">
                <img
                  src="https://prenixfurniture.com/image/noproduct.jpg"
                  alt="no product"
                  className="w-50 img-fluid"
                />
              </div>
            ) : (
              <div className="product_list_new_all_product">
                {products.map((product) => (
                  <div key={product._id} className="main_new_all_prodduct_main_div">
                    <div className="new_all_product_image_div">
                      <img
                        src={product.thumbnail}
                        alt=""
                        className="new_all_product_image"
                      />
                    </div>
                    <div className="new_all_product_details_div">
                      <div>{product.name}</div>
                      <div> ₹{product.size[0]?.FinalPrice || 0} </div>
                    </div>
                    <div className="new_all_product_action_div">
                      <div className="new_all_product_action_edit_delete_div">
                        <div
                          className="new_all_product_action_edit"
                          onClick={() => {
                            navigate(`/admin/product-update/${product._id}`);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {/* <Link
                            to={`/admin/product-update/${product._id}`}
                            target="_blank"
                            className="Link_tag"
                          >
                            Edit
                          </Link> */}
                          <a
                            href={`/admin/product-update/${product._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="Link_tag"
                            onClick={(e) => {
                              // Prevent default is not actually needed here since we're using target="_blank"
                              e.stopPropagation(); // This prevents any parent click handlers from interfering
                            }}
                            style={{
                              textDecoration: 'none',
                              color: 'inherit',
                              display: 'block'
                            }}
                          >
                            Edit
                          </a>

                        </div>
                        <div
                          className="new_all_product_action_delete"
                          onClick={() => setDeleteProductId(product._id)}
                        >
                          Delete
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {!loading && products.length > 0 && (
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
        )}

        <ConfirmationModal
          isOpen={deleteProductId !== null}
          onClose={() => setDeleteProductId(null)}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </>
  );
};

export default Allproduct;