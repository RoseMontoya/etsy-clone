import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import ProductList from "../components/ProductList";
import Layout from "./Layout";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import HomePage from "../components/HomePage";

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
        path: "products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      { path: "home", element: <HomePage /> },
    ],
  },
]);
