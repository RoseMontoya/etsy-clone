import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkAllProducts } from "../../redux/product"
import "./ProductList.css"


function ProductList() {
    const dispatch = useDispatch();
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [inventory, setinventory] = useState("");
    // const [price, setprice] = useState("");
    // const [category_id, setcategory_id] = useState({});
    // const [seller_id, setseller_id] = useState({});
    const products = useSelector((state) => {
        console.log(state);
        return state.products.allProducts
    })
    
    useEffect(() => {
        dispatch(thunkAllProducts());
    }, [dispatch]);

    if (!products) return null;

    return products.map((product) => (
        <div className="product_small_container" key={product?.id}>
            <img src={product.product_images[0].url} alt={product.title} />
            <p>{product.title}</p>
            <p>${product.price}</p>
        </div>
    ))
}

export default ProductList;