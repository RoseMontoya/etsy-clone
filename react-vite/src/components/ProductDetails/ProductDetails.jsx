import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { productById } from "../../redux/product"

function ProductDetails() {
    const {productId} = useParams()
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.productById)
    // const products = useSelector(state => state.products.allProducts)

    const product = products[productId]
    console.log(product)

    useEffect(() => {

        dispatch(productById(productId))
    }, [dispatch, productId])

    // Check if product is loaded
    if (!product) {
        return <div>Loading...</div>; // Or any loading indicator you prefer
    }

    // console.log("BEFORE RETURN", product)
    return (
        <>
            <h1>Product Details</h1>
            <p>ID: {product.id}</p>
            <p>Name: {product.title}</p>
            <p>Description: {product.description}</p>
            <p>Inventory: {product.inventory}</p>
        </>
    )
}

export default ProductDetails;
