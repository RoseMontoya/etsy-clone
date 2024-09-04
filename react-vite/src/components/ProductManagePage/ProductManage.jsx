// React Imports
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

// Redux/Component Imports
import { productByUserId, deleteProduct } from "../../redux";
import ConfirmDeleteModal from "./ConfirmDeletionModal";
import { useModal } from "../../context/Modal";

// Design Imports
import { IoSettingsOutline } from "react-icons/io5";
import "./ProductManage.css";

// Helper Imports
import { Loading } from "../SubComponents";

function ProductManage() {
  const dispatch = useDispatch();
  const buttonRef = useRef();
  const { setModalContent, closeModal } = useModal();

  // Track which product's dropdown is open
  const [showDropDownId, setShowDropDownId] = useState(null); // Track the product ID

  // Get current user and products from Redux store
  const user = useSelector((state) => state.session.user);
  const productsObj = useSelector((state) => state.products?.productsCurrent);
  const products = productsObj ? Object.values(productsObj) : [];

  // Toggle the dropdown menu for the clicked product
  const toggleMenu = (e, productId) => {
    e.stopPropagation();
    if (showDropDownId === productId) {
      setShowDropDownId(null); // Close if the same product is clicked again
    } else {
      setShowDropDownId(productId); // Open the dropdown for the clicked product
    }
  };

  useEffect(() => {
    if (!showDropDownId) return;

    const handleClickOutside = (e) => {
      e.stopPropagation();
      setShowDropDownId(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDropDownId]);

  useEffect(() => {
    // Fetch user's products if not already loaded
    if (!productsObj) {
      dispatch(productByUserId());
    }
  }, [dispatch, productsObj]);

  if (!user) return <Navigate to="/" replace={true} />;

  // Display loading spinner while products are being fetched
  if (!productsObj) return <Loading />;

  // Display message when there are no products
  if (products?.length === 0)
    return (
      <main>
        <div className="product-manage-empty">
          <h2>No product yet... Please create one</h2>
          <span className="empty-add">
            <Link to="/products/new">
              <button>Add new product</button>
            </Link>
          </span>
        </div>
      </main>
    );

  // Handle click event to open confirmation modal for deleting a product
  const handleDeleteClick = (productId) => {
    setModalContent(
      <ConfirmDeleteModal
        onDelete={() => handleDeleteConfirm(productId)}
        onClose={closeModal}
      />
    );
  };

  // Function to handle the deletion confirmation
  const handleDeleteConfirm = async (productId) => {
    await dispatch(deleteProduct(productId, user.id));
    closeModal();
  };

  return (
    <main>
      <div>
        <div className="product_manage_header">
          <div className="favorite_profile">
            <img src={user.profile_url} alt={user.username} />
            <h2>Your Listings</h2>
          </div>
          <div>
            <Link to="/products/new">Add new product</Link>
          </div>
        </div>
        <div className="grid_container">
          {products?.map((product) => (
            <div key={product.id} className="grid-item" id="man-prod-grid-item">
              <Link to={`/products/${product.id}`}>
                <div className="image_container">
                  <img src={product.preview_image} alt={product.title} />
                </div>
                <div className="grid-item-detail">
                  <p className="title">{product.title}</p>
                  <p>{product.inventory} in stock</p>
                  <p className="grid_price price">
                    ${parseInt(product.price).toFixed(2)}
                  </p>
                </div>
              </Link>

              <div className="man-prod-options">
                {showDropDownId === product.id && (
                  <div className="drop_down_container">
                    <p className="drop_down_item">
                      <Link to={`/products/${product.id}/edit`}>Edit</Link>
                    </p>
                    <p
                      onClick={() => handleDeleteClick(product.id)}
                      className="drop_down_item"
                    >
                      Delete
                    </p>
                  </div>
                )}
                <p
                  className="drop_down_setting"
                  ref={buttonRef}
                  onClick={(e) => toggleMenu(e, product.id)}
                >
                  <IoSettingsOutline />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ProductManage;
