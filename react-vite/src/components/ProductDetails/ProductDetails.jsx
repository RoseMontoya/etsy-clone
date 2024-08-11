import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { productById, thunkAllProducts } from "../../redux/product"
import ProductReviews from "../ProductReviews"

function ProductDetails() {
    const {productId} = useParams()
    const dispatch = useDispatch()
    const product = useSelector(state => state.products?.allProducts?.[productId])
    // const product = useSelector(state => state.products.allProducts?.[productId])

    // console.log(product)
    // const product = products[productId]

    useEffect(() => {
        // if (!product) {
        //     dispatch(thunkAllProducts())
        // }
        dispatch(productById(productId))
    }, [dispatch, productId])

    // Check if product is loaded
    if (!product) {
        return <div>Loading...</div>;
    }

    // console.log("BEFORE RETURN", product)
    return (
        <>
            <h1>Product Details</h1>
            <p>ID: {product?.id}</p>
            <p>Name: {product?.title}</p>
            <p>Description: {product?.description}</p>
            <p>Inventory: {product?.inventory}</p>
            <ProductReviews productId={productId}/>
        </>
    )
}

export default ProductDetails;
