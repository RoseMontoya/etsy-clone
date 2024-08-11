import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { productById } from "../../redux/product"
import ProductReviews from "../ProductReviews"

function ProductDetails() {
    const {productId} = useParams()
    const dispatch = useDispatch()
    const product = useSelector(state => state.products.productById?.[productId])
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (!product) {
             dispatch(productById(productId))
                .then(res => {
                    if (res.error) {
                        setErrors(res)
                    }
                })
        }
    }, [dispatch, productId, product])

    // Check if there were errors on the fetch
    if (errors.error) {
        const message = errors.error.message
        return <h2 style={{padding: '1em', textAlign: 'center'}}>{message}</h2>
    }

    // Check if product is loaded
    if (!product) {
        return <div>Loading...</div>;
    }

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
