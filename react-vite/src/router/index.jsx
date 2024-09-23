import { createBrowserRouter } from "react-router-dom";

// Component Imports
import Layout from "./Layout";
import {
  Cart,
  Checkout,
  CompleteTransaction,
  FavoritesPage,
  LandingPage,
  ProductDetails,
  NewProductForm,
  EditProductForm,
  ProductList,
  ProductManage,
} from "../components";
import ProductsByCategory from "../components/NavButtonComponent/ProductsByCategory";
import NotFoundPage from "../components/SubComponents/NotFound";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
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
      {
        path: "/products/categories/:categoryId",
        element: <ProductsByCategory />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
