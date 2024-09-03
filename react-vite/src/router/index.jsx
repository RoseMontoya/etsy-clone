import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../components/LandingPage";
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
import Homeliving from "../components/NavButtonComponent/HomeLiving";
import Accessories from "../components/NavButtonComponent/Accessories";
import Crafting from "../components/NavButtonComponent/Crafting";
import Clothing from "../components/NavButtonComponent/Clothing";
import Jewelry from "../components/NavButtonComponent/Jewelry";

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
        path: "/products/homeliving",
        element: <Homeliving />,
      },
      {
        path: "/products/accessories",
        element: <Accessories />,
      },
      {
        path: "/products/crafting",
        element: <Crafting />,
      },
      {
        path: "/products/clothing",
        element: <Clothing />,
      },
      {
        path: "/products/jewelry",
        element: <Jewelry />,
      },
    ],
  },
]);
