import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkAllProducts } from "../../redux/product"
import { Link } from "react-router-dom"
import "./ProductList.css"


function ProductList() {
    const dispatch = useDispatch();
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [inventory, setinventory] = useState("");
    // const [price, setprice] = useState("");
    // const [category_id, setcategory_id] = useState({});
    // const [seller_id, setseller_id] = useState({});
    const productsObj = useSelector((state) => state.products?.allProducts)

    const products = productsObj? Object.values(productsObj) : []

    useEffect(() => {
        if (!products.length) {
            dispatch(thunkAllProducts());
        }
    }, [dispatch, products]);

    if (!productsObj) return <h2>Loading...</h2>;

    return (
    <div className="product_container">
        {products.length? products.map((product) => (
            <div key={product?.id} className="product_small_container">
                <Link key={product?.id} to={`/products/${product?.id}`}>
                    <img src={product.product_images[0].url} alt={product.title}/>
                <p>{product.title}</p>
                <p>${product.price}</p>
                </Link>
            </div>
        )): <h2>No products to sell. Please check back later.</h2>}
    </div>
    )
}

export default ProductList;
