import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAllProducts } from "../../redux/product";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/cart";
import "./ProductList.css";
import { getAllCartItems } from "../../redux/cart";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsObj = useSelector((state) => state.products?.allProducts);
  const user = useSelector((state) => state.session.user);
  const products = productsObj ? Object.values(productsObj) : [];

  useEffect(() => {
    if (!productsObj) {
      dispatch(thunkAllProducts());
    }
  }, [dispatch, productsObj]);

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
            <Link key={product?.id} to={`/products/${product?.id}`}>
              <img src={product.preview_image} alt={product.title} />
              <p>{product.title}</p>
              <p>${product.price}</p>
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
