import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAllProducts } from "../../redux/product";
import { Link, useNavigate } from "react-router-dom";
import Stars from "../Star/Stars";
import Heart from "../Heart/Heart"
import { addToCart } from "../../redux/cart";
import { getAllCartItems } from "../../redux/cart";
import { favoritesByUserId } from "../../redux/favorite";
import "./ProductList.css";


function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsObj = useSelector((state) => state.products?.allProducts);
  const user = useSelector((state) => state.session.user);
  const products = productsObj ? Object.values(productsObj) : [];
  const favoritesObj = useSelector(state => state.favorites?.[user.id])
  const favProducts = favoritesObj? Object.values(favoritesObj).map(fav => fav.product.id): [];



  useEffect(() => {
    if (!productsObj) {
      dispatch(thunkAllProducts());
    }
    if (!favoritesObj && user) {
      dispatch(favoritesByUserId(user.id))
    }
  }, [dispatch, productsObj, favoritesObj, user]);

  if (!productsObj) return <h2>Loading...</h2>;


  const handleAddToCart = (product) => {
    const cartItem = {
      product_id: product.id,
      quantity: 1,
      gift: false,
      cart_id: user.cart_id,
      product: product, // The entire product object
    };
    dispatch(addToCart(cartItem)).then(() => {
      dispatch(getAllCartItems()).then(() => {
        navigate("/cart"); // Redirect to the cart page after updating the cart
      });
    });
  };
  return (
    <div className="product_container">
      {products.length ? (
        products.map((product) => (
          <div key={product?.id} className="product_small_container">
            <Heart initial={favProducts.includes(product.id)? true: false} productId={product.id}/>
            <Link key={product?.id} to={`/products/${product?.id}`}>
              <img src={product.preview_image} alt={product.title} />
              <p>{product.title}</p>
              <div className="inline">
              <Stars rating={product.seller.seller_rating}/><span>({product.seller.review_count})</span></div>
              <p className="bold">${product.price.toFixed(2)}</p> 
              <p>{product.seller.username}</p>
            </Link>
            <button onClick={() => handleAddToCart(product)}>
              + Add to cart
            </button>
          </div>
        ))
      ) : (
        <h2>No products to sell. Please check back later.</h2>
      )}
    </div>
  );
}

export default ProductList;
