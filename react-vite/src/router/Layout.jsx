// React Imports
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, ScrollRestoration } from "react-router-dom";

// Redux/Component Imports
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux";
import { Footer, Navigation } from "../components";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <ScrollRestoration />
        <Navigation />
        {isLoaded && <Outlet />}
        <Modal />
        <Footer />
      </ModalProvider>
    </>
  );
}
