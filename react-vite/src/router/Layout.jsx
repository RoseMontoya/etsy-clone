import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  console.log('IN LAYOUT JSX', isLoaded)
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  console.log('IN LAYOUT JSX USE EFFECT', isLoaded)
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation />
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}
