import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAllProducts } from "../../redux/product";
// import { Link } from "react-router-dom";

import "./MainProfile.css";
function HomePage() {
  const dispatch = useDispatch();
  let product = useSelector((state) => {
    return state.product.allProducts;
  });

  useEffect(() => {
    dispatch(thunkAllProducts());
  }, [dispatch]);
  if (!product) return null;
  return <>Welcome back,</>;
}
export default HomePage;
