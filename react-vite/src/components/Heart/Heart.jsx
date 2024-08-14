import { useDispatch } from "react-redux";
import { useState } from "react";
import { addFavorite, removeFavorite } from "../../redux/favorite";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa"
import "./Heart.css";

function Heart({initial, productId}) {
    const dispatch = useDispatch();
    const [ favorited, setFavorited ] = useState(initial);

    const handleUnfavorite = (productId) => {
        dispatch(removeFavorite(productId))
        .then(res => {
            setFavorited(false)
        })
      };
    
    const handleFavorite = (productId) => {
        dispatch(addFavorite(productId))
        .then(res => {
            setFavorited(true)
        })
    };

    return (
    <div>
        {favorited? 
        <div className="heart" onClick={() => handleUnfavorite(productId)}><FaHeart /></div>: <div className="heart" onClick={() => handleFavorite(productId)}><FaRegHeart /></div>}
    </div>)
}

export default Heart;

