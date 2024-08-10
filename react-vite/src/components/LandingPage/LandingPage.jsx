import {Link} from 'react-router-dom'

function LandingPage(){
    return (
        <>
            <h2>There&apos;s a Person Behind Every Piece</h2>
            <p>Fall in love with original finds from standout small shops around the world.</p>
            <button >Discover more</button>
            <Link to="/products">AllProducts</Link>

        </>
    )
}

export default LandingPage
