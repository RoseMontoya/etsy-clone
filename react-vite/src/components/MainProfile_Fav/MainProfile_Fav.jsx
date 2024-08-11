import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAllProducts } from "../../redux/product";
import { Link } from "react-router-dom";

import "./MainProfile.css";
function HomePage() {
  const dispatch = useDispatch();
  let product = useSelector((state) => {
    console.log(state);
    return state.product.allProducts;
  });
  console.log("Product from MainProfile", product);
  useEffect(() => {
    dispatch(thunkAllProducts());
  }, [dispatch]);
  if (!products) return null;
  return <>Welcome back,</>;
}
export default HomePage;
