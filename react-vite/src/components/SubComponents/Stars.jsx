import { TiStarOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";

function Stars({onClick, rating}){

    return (
        <div className='stars'>
            <div
                onClick={() => onClick(1)}
                className='star'
            >
                {rating >= 1? <TiStarFullOutline/> : <TiStarOutline/>}
            </div>
            <div
                onClick={() => onClick(2)}
                className='star'
            >
                {rating >= 2? <TiStarFullOutline/> : <TiStarOutline/>}
            </div>
            <div
                onClick={() => onClick(3)}
                className='star'
            >
                {rating >= 3? <TiStarFullOutline/> : <TiStarOutline/>}
            </div>
            <div
                onClick={() => onClick(4)}
                className='star'
            >
                {rating >= 4? <TiStarFullOutline/> : <TiStarOutline/>}
            </div>
            <div
                onClick={() => onClick(5)}
                className='star'
            >
                {rating >= 5? <TiStarFullOutline/> : <TiStarOutline/>}
            </div>
        </div>
    )
}

export default Stars
