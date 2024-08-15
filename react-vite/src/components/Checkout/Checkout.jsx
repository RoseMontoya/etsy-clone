import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { clearCart, getAllCartItems } from "../../redux/cart";
import { useDispatch } from "react-redux";
import { updateInventory } from "../../redux/product";
import { useEffect } from "react";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all cart items when the component mounts
        dispatch(getAllCartItems());
    }, [dispatch]);

    const handleCompleteTransaction = () => {
        // Call the backend to update the inventory
        dispatch(updateInventory())
            .then(() => {
                // Clear the cart after successful inventory update
                dispatch(clearCart());
                // Navigate to the success page
                navigate("/successful-transaction");
            });
    };

    return (
        <>
            <button onClick={handleCompleteTransaction}>Complete Transaction</button>
        </>
    );
}

export default Checkout;