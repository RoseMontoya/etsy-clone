import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { thunkAllProducts } from "../../redux/product";
import { addToCart, getAllCartItems } from "../../redux/cart";
import { favoritesByUserId } from "../../redux/favorite";
import { Heart, Stars, OwnProductConflictModal } from "../SubComponents";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import { useModal } from "../../context/Modal"; // Import the modal context

import { FaPlus } from "react-icons/fa6";

// Helper Imports
import { Loading } from "../SubComponents";

function ProductsByCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { setModalContent } = useModal(); // Use the modal context to trigger the login modal
  const productsObj = useSelector((state) => state.products?.allProducts);
  const user = useSelector((state) => state.session.user);
  const rawProducts = productsObj ? Object.values(productsObj) : [];
  const products = rawProducts.filter(
    (product) => product.category_id === Number(categoryId)
  );
  const favoritesObj = useSelector((state) => state.favorites?.[user?.id]);
  const favProducts = favoritesObj
    ? Object.values(favoritesObj).map((fav) => fav.product_id)
    : [];

  useEffect(() => {
    if (!productsObj) {
      dispatch(thunkAllProducts());
    }
    if (!favoritesObj && user) {
      dispatch(favoritesByUserId(user?.id));
    }
  }, [dispatch, productsObj, favoritesObj, user]);

  if (!productsObj) return <Loading />;

  if (products.length === 0)
    return (
      <main>
        <div className="center-in-page">
          <h2>No products for sell. Please check back later.</h2>
        </div>
      </main>
    );

  const handleAddToCart = (product) => {
    if (!user) {
      // If the user is not logged in, open the login modal
      setModalContent(<LoginFormModal />);
      return;
    }
    const cartItem = {
      product_id: product.id,
      quantity: 1,
      gift: false,
      cart_id: user.cart_id,
      product: product, // The entire product object
    };
    if (user.id === cartItem.product.seller.id) {
      setModalContent(<OwnProductConflictModal />);
      return;
    }
    dispatch(addToCart(cartItem)).then(() => {
      dispatch(getAllCartItems()).then(() => {
        navigate("/cart"); // Redirect to the cart page after updating the cart
      });
    });
  };

  return (
    <main className="prod-list">
      <div className="grid_container">
        {products
          .sort((a, b) => b.id - a.id)
          .map((product) => (
            <div key={product?.id} className="grid-item">
              <div>
                {user ? (
                  <Heart
                    initial={favProducts.includes(product.id) ? true : false}
                    productId={product.id}
                    sellerId={product.seller.id}
                  />
                ) : (
                  <OpenModalMenuItem
                    itemText={
                      <Heart
                        initial={false}
                        productId={product.id}
                        sellerId={product.seller.id}
                      />
                    }
                    modalComponent={
                      <LoginFormModal text={"Before you do that..."} />
                    }
                  />
                )}
                <Link key={product?.id} to={`/products/${product?.id}`}>
                  <div className="image_container">
                    <img src={product.preview_image} alt={product.title} />
                  </div>
                  <div className="product-details">
                    <p className="title">{product.title}</p>
                    <div className="rating">
                      {product.seller.review_count > 0 ? (
                        <Stars rating={product.seller.seller_rating} />
                      ) : (
                        <p className="bold">New </p>
                      )}
                      <span className="count">
                        ({product.seller.review_count})
                      </span>
                    </div>
                    <p style={{ fontSize: "14px" }}>
                      {product.seller.username}
                    </p>
                    <p className="bold">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              </div>
              <div>
                {user ? (
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaPlus /> Add to cart
                  </button>
                ) : (
                  <OpenModalMenuItem
                    className="signed_off_button"
                    itemText="+ Add to cart"
                    modalComponent={
                      <LoginFormModal text={"Before you do that..."} />
                    }
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default ProductsByCategory;
