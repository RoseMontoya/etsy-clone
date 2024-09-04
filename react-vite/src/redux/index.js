import {
  deleteCartItem,
  updateCartItemQuantity,
  addToCart,
  clearCart,
  getAllCartItems,
} from "./cart";
import { favoritesByUserId, addFavorite, removeFavorite } from "./favorite";
import {
  thunkAllProducts,
  thunkRandomProduct,
  productById,
  productByUserId,
  addProduct,
  editProduct,
  deleteProduct,
  addProductImage,
  updateProductImage,
  deleteProductImage,
  updateInventory,
} from "./product";
import {
  getAllReviews,
  createReview,
  editReview,
  deleteReview,
} from "./review";
import {
  thunkAuthenticate,
  thunkLogin,
  thunkSignup,
  thunkLogout,
} from "./session";

export {
  // Cart exports
  deleteCartItem,
  updateCartItemQuantity,
  addToCart,
  clearCart,
  getAllCartItems,

  // Favorites exports
  favoritesByUserId,
  addFavorite,
  removeFavorite,

  // Product exports
  thunkAllProducts,
  thunkRandomProduct,
  productById,
  productByUserId,
  addProduct,
  editProduct,
  deleteProduct,
  addProductImage,
  updateProductImage,
  deleteProductImage,
  updateInventory,

  // Review exports
  getAllReviews,
  createReview,
  editReview,
  deleteReview,

  // Session exports
  thunkAuthenticate,
  thunkLogin,
  thunkSignup,
  thunkLogout,
};
