import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
// import Navigation from "../components";
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
