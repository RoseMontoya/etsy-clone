import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { productById } from "../../redux/product"
import ProductReviews from "../ProductReviews"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import ReviewFormModal from "../ReviewFormModal"
import './ProductDetails.css'

function ProductDetails() {
    const {productId} = useParams()
    const dispatch = useDispatch()
    const product = useSelector(state => state.products.productById?.[productId])
    const [errors, setErrors] = useState({})
    const [mainImage, setMainImage] = useState(product?.preview_image)

    useEffect(() => {
        if (!product) {
            dispatch(productById(productId))
            .then(res => {
                if (res.error) {
                    setErrors(res)
                } else {
                    setMainImage(res.preview_image)
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


    const imageSelect = image => {
        setMainImage(image.url)
    }

    return (
        <>
            <h1>Product Details</h1>
            <p>ID: {product?.id}</p>
            <p>Name: {product?.title}</p>
            <div className="main-image"><img src={mainImage} className="image"/></div>
            {product.product_images.map(image => (
                <div className="small-image" key={image.id} onClick={() => imageSelect(image)}>
                    <img className="image" src={image.url} alt={image.id}/>
                </div>
            ))}
            <p>Description: {product?.description}</p>
            <p>Inventory: {product?.inventory}</p>
            <OpenModalMenuItem
                className=""
                itemText="Post Your Review!"
                modalComponent={<ReviewFormModal productId={product.id} formType={'create'}/>}
            />
            <ProductReviews productId={productId}/>
        </>
    )
}

export default ProductDetails;
