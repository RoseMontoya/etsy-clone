import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import "./ProductManage.css";
import { productByUserId, deleteProduct } from "../../redux/product";
import { IoSettingsOutline } from "react-icons/io5";
import ConfirmDeleteModal from "./ConfirmDeletionModal";
import { useModal } from "../../context/Modal";

function ProductManage() {
  const dispatch = useDispatch();
  const buttonRef = useRef();
  const { setModalContent, closeModal } = useModal();

  const [showDropDownId, setShowDropDownId] = useState(null); // Track the product ID

  const user = useSelector((state) => state.session.user);
  const productsObj = useSelector((state) => state.products?.productsCurrent);

  const products = productsObj? Object.values(productsObj): []


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
    if (!productsObj) {
      dispatch(productByUserId());
    }
  }, [dispatch, productsObj]);

  if (!user) return <Navigate to="/" replace={true} />;

  if (!productsObj) return (<main>
    <div className="center-loading">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p>Loading...</p>
          </div>
      </main>);

  if (products?.length === 0)
    return (
      <main>
        <div className="product-manage-empty">
        <h2>No product yet... Please create one</h2>
        <span className="empty-add">
          <Link to="/products/new"><button>Add new product</button></Link>

        </span>
        </div>
      </main>
    );

  const handleDeleteClick = (productId) => {
    setModalContent(
      <ConfirmDeleteModal
        onDelete={() => handleDeleteConfirm(productId)}
        onClose={closeModal}
      />
    );
  };

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
              <p className="grid_price price">${parseInt(product.price).toFixed(2)}</p>
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
