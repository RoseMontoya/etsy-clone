import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import ProductList from '../components/ProductList'
import Layout from './Layout';
import ProductDetails from '../components/ProductDetails';
import ProductManage from '../components/ProductManagePage/ProductManage';
import NewProductForm from '../components/ProductForm/CreateProduct';

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
        element: <ProductManage />
      },
      {
        path: "products/new",
        element: <NewProductForm />
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "products",
        element: <ProductList />,
      }
    ],
  },
]);
