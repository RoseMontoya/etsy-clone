import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

  const products = useSelector((state) => state.products?.productByUserId);

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
    if (!products) {
      dispatch(productByUserId());
    }
  }, [dispatch, products]);

  if (products?.length === 0)
    return (
      <>
        <p>No product yet... Please create one</p>
        <span>
          <Link to="/products/new">Add new product</Link>
        </span>
        <div></div>
        <a href="/">Home</a>
      </>
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
    await dispatch(deleteProduct(productId));
    await dispatch(productByUserId());
    closeModal();
  };

  return (
    <div>
      <span>
        <Link to="/products/new">Add new product</Link>
      </span>
      <div className="product_manage_container">
        {products?.map((product) => (
          <div key={product.id} className="product_manage_single_container">
            <Link to={`/products/${product.id}`}>
              <img src={product.preview_image} alt={product.title} />
              <p>{product.title}</p>
              <p>{product.inventory} in stock</p>
              <p>${parseInt(product.price).toFixed(2)}</p>
            </Link>
            <div>
              <button
                className="drop_down_button"
                ref={buttonRef}
                onClick={(e) => toggleMenu(e, product.id)}
              >
                <IoSettingsOutline />
              </button>
              {showDropDownId === product.id && (
                <div className="drop_down_container">
                  <button className="drop_down_item">
                    <Link to={`/products/${product.id}/edit`}>Edit</Link>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product.id)}
                    className="drop_down_item"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductManage;
