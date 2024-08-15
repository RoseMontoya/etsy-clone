import "./Checkout.css"
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/cart";
import { useDispatch } from "react-redux";

function Checkout(){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleCompleteTransaction = () => {
        dispatch(clearCart())
        .then(() => {
            navigate("/successful-transaction")
        })
    };

    return (
        <>
            <button onClick={handleCompleteTransaction}>Complete Transaction</button>
        </>
    )
}

export default Checkout;