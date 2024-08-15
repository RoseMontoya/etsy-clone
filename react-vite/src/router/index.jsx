import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import ProductList from "../components/ProductList";
import Layout from "./Layout";
import ProductDetails from "../components/ProductDetails";
import FavoritesPage from "../components/FavoritesPage/FavoritesPage";
import ProductManage from "../components/ProductManagePage/ProductManage";
import NewProductForm from "../components/ProductForm/CreateProduct";
import EditProductForm from "../components/ProductForm/EditProduct";
import Cart from "../components/Cart/Cart";
import Checkout from "../components/Checkout/Checkout";
import CompleteTransaction from "../components/CompleteTransaction/CompleteTransaction";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "products/current",
        element: <ProductManage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "products/new",
        element: <NewProductForm />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "products/:productId/edit",
        element: <EditProductForm />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "successful-transaction",
        element: <CompleteTransaction />,
      },
    ],
  },
]);
