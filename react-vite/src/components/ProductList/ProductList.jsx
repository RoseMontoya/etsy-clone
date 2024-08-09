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
    let products = useSelector((state) => {
        console.log(state);
        return state.products.allProducts
    })

    products = Object.values(products)

    useEffect(() => {
        dispatch(thunkAllProducts());
    }, [dispatch]);

    if (!products) return null;

    // ! This needs to be refactored!! map should be inside of a return object.
    return products.map((product) => (
        <>
        <a href={`/products/${product?.id}`}>Check out the product!</a>
        <div className="product_small_container" key={product?.id}>
            <p>{product.title}</p>
            <p>${product.price}</p>
        </div>
        </>
    ))
}

export default ProductList;
