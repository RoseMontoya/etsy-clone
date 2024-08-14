import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector} from 'react-redux'
import { productById } from "../../redux/product"
import ProductReviews from "../ProductReviews"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import ReviewFormModal from "../ReviewFormModal"
import './ProductDetails.css'
import Stars from "../Star/Stars"
import { FaRegHeart } from "react-icons/fa"
{/* <FaRegHeart /> */}



function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(
    (state) => state.products.productById?.[productId]
  );
  const [errors, setErrors] = useState({});
  const [mainImage, setMainImage] = useState(product?.preview_image);
  const user = useSelector((state) => state.session.user);
  const reviewsObj = useSelector(
    (state) => state.reviews.reviewsByProdId?.[productId]
  );

  const reviews = reviewsObj ? Object.values(reviewsObj) : [];

  let userReview;
  if (reviewsObj)
    userReview = Object.values(reviewsObj).filter(
      (review) => review.user === user?.username
    );

  useEffect(() => {
    if (!product) {
      dispatch(productById(productId)).then((res) => {
        if (res.error) {
          setErrors(res);
        } else {
          setMainImage(res.preview_image);
        }
      });
    }
  }, [dispatch, productId, product]);

  // Check if there were errors on the fetch
  if (errors.error) {
    const message = errors.error.message;
    return <h2 style={{ padding: "1em", textAlign: "center" }}>{message}</h2>;
  }

  // Check if product is loaded
  if (!product) {
    return <div>Loading...</div>;
  }

  const imageSelect = (image) => {
    setMainImage(image.url);
  };

  const showReview = () => {
    // Check if user is logged in
    // Check if user already has review
    // Check if product belongs to user
    if (user && product.seller.id !== user.id && !userReview?.length) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div id="product-details">
        {/* <div id="image-container">
          <div id="image-sidebar">
            {product.product_images.map((image) => (
              <div
                className="small-image"
                key={image.id}
                onClick={() => imageSelect(image)}
              >
                <img className="image" src={image.url} alt={image.id} />
              </div>
            ))}
          </div>
          <div>
            <button className="circ">{"<"}</button>
          </div>
          <div className="main-image">
            <img src={mainImage} className="image" />
          </div>
          <div>
            <button className="circ">{">"}</button>
          </div>
        </div> */}
        <div>
          <p
            className={`${product?.inventory > 5 ? "hidden" : "red bold"}`}
          >{`Only ${product.inventory} left in stock!`}</p>
          <p className="bold" style={{ fontSize: "24px" }}>
            ${product.price.toFixed(2)}
          </p>
          <p>{product?.title}</p>
          <div>
              <p className="bold inline">
                {product.seller.username}{" "}
              </p>
              <Stars rating={product.seller.seller_rating} />
          </div>
          <div>
            <button>Buy It Now</button>
            <button>Add to Cart</button>
            <button>Add to Collection</button>
          </div>
          <div>
            <p>Item Details</p>
            <p>{product?.description}</p>
          </div>
        </div>
      </div>
      <OpenModalMenuItem
        className={`${showReview() ? "" : "hidden"}`}
        itemText={`${
          reviews.length
            ? "Post Your Review!"
            : "Be the first to leave a review!"
        }`}
        modalComponent={
          <ReviewFormModal productId={product.id} formType={"create"} />
        }
      />
      {/* <ProductReviews productId={productId} /> */}
    </>
  );
}

export default ProductDetails;
