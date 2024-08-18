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

  if (!productsObj) return <h2>Loading...</h2>

  if (products?.length === 0)
    return (
      <main>
        <p>No product yet... Please create one</p>
        <span>
          <Link to="/products/new">Add new product</Link>
        </span>
        <div></div>
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
          <p>{user.first_name}&apos;s Listings</p>
        </div>
        <div>
          <Link to="/products/new">Add new product</Link>
        </div>
      </div>
      <div className="grid_container">
        {products?.map((product) => (
          <div key={product.id} className="grid-item">
            <Link to={`/products/${product.id}`}>
            <div className="image_container">
              <img src={product.preview_image} alt={product.title} />
            </div>
            <div className="grid-item-detail">
              <p>{product.title}</p>
              <p>{product.inventory} in stock</p>
              <p className="grid_price">${parseInt(product.price).toFixed(2)}</p>
            </div>


            </Link>
            <div>
              <p
                className="drop_down_setting"
                ref={buttonRef}
                onClick={(e) => toggleMenu(e, product.id)}
              >
                <IoSettingsOutline />
              </p>
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
            </div>
          </div>
        ))}
      </div>
    </div>
    </main>
  );
}

export default ProductManage;
