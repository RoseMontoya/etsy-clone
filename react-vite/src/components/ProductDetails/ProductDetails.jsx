import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ProductDetails() {
    const {productId} = useParams()
    const [product, setProduct] = useState({})

    // console.log(productId)
    
    useEffect(() => {
        const fetchDetails = async (productId) => {
            productId = parseInt(productId)
            // console.log("INSIDE FETCH", typeof productId)
            const data = await fetch(`/api/products/${productId}`)
            const product = await data.json()
            // console.log("PRODUCT DETAILS", product)
            return product
        }

        const prod = fetchDetails(productId)
        setProduct(prod)
    }, [])

    // Check if product is loaded
    if (!product) {
        return <div>Loading...</div>; // Or any loading indicator you prefer
    }
    
    console.log("BEFORE RETURN", product)
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