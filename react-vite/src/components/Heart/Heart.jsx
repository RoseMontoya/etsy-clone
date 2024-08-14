import { useDispatch } from "react-redux";
import { useState } from "react";
import { addFavorite, removeFavorite } from "../../redux/favorite";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa"
import "./Heart.css";

function Heart({initial, favoriteId, productId}) {
    const dispatch = useDispatch();
    const [ favorited, setFavorited ] = useState(initial);

    const handleUnfavorite = (favoriteId) => {
        dispatch(removeFavorite(favoriteId))
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
        <div className="heart" onClick={() => handleUnfavorite(favoriteId)}><FaHeart /></div>: <div className="heart" onClick={() => handleFavorite(productId)}><FaRegHeart /></div>}
    </div>)
}

export default Heart;

