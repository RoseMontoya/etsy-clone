import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productById } from "../../redux/product";
import { favoritesByUserId, addFavorite } from "../../redux/favorite";
import ProductReviews from "../ProductReviews";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ReviewFormModal from "../ReviewFormModal";
import "./ProductDetails.css";
import { Stars, Heart } from "../SubComponents";
// import Heart from "../Heart/Heart";
import { FaGreaterThan } from "react-icons/fa6";
import { FaLessThan } from "react-icons/fa6";
import { getAllCartItems } from "../../redux/cart";
import { addToCart } from "../../redux/cart";

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);

  const product = useSelector(
    (state) => state.products.productById?.[productId]
  );

  const images = []
  if (product?.product_images) {
    const imgA = Object.values(product.product_images)
    imgA.forEach(img => {
      if (img.preview) {
        images.unshift(img)
      } else {
        images.push(img)
      }
    })
  }

  const [mainImage, setMainImage] = useState(product?.preview_image);
  const [mainImgId, setMainImgId] = useState(0);

  const reviewsObj = useSelector(
    (state) => state.reviews.reviewsByProdId?.[productId]
  );
  const reviews = reviewsObj ? Object.values(reviewsObj) : [];
  let userReview;
  if (reviewsObj)
    userReview = Object.values(reviewsObj).filter(
      (review) => review.user === user?.username
    );

  const favoritesObj = useSelector((state) => state.favorites?.[user.id]);
  const favProduct = favoritesObj
    ? Object.values(favoritesObj).reduce(
        (fav, current) =>
          current.product_id === +productId ? (fav = [current]) : fav,
        []
      )
    : [];

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
    if (!favoritesObj && user) {
      dispatch(favoritesByUserId(user.id));
    }
    if (product) {
      setMainImage(product.preview_image)
      setMainImgId(0)
    }
  }, [dispatch, productId, product, favoritesObj, user]);

  // Check if there were errors on the fetch
  if (errors.error) {
    const message = errors.error.message;
    return <h2 style={{ padding: "1em", textAlign: "center" }}>{message}</h2>;
  }

  // Check if product is loaded
  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddFavorite = (productId) => {
    dispatch(addFavorite(productId)).then((res) => {
      const popUpSaved = document.getElementById("add_fav");
      popUpSaved.style.display = "block";
      setTimeout(() => {
        popUpSaved.style.display = "none";
      }, 2000);
    });
  };

  const handleAddToCart = () => {
    const cartItem = {
      product_id: product.id,
      quantity: 1, // Or whatever quantity you need
      gift: false,
      cart_id: user.cart_id, // If you have an existing cart ID
      product: product, // The entire product object
    };

    dispatch(addToCart(cartItem)).then(() => {
      dispatch(getAllCartItems()).then(() => {
        navigate("/cart"); // Redirect to the cart page after updating the cart
      });
    });
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

  const imageSelect = (image) => {
    const oldUrl = image.url;
    setMainImage(image.url);
    let newid;
    images.forEach((img, i) => {
      if (oldUrl === img.url) {
        newid = i;
      }
    });
    setMainImgId(newid);
  };

  const backClick = () => {
    if (mainImgId == 0) {
      setMainImage(images[images.length - 1].url);
      setMainImgId(images.length - 1);
    } else {
      setMainImage(images[mainImgId - 1].url);
      setMainImgId(mainImgId - 1);
    }
  };

  const forwardClick = () => {
    if (mainImgId == images.length - 1) {
      setMainImage(images[0].url);
      setMainImgId(0);
    } else {
      setMainImage(images[mainImgId + 1].url);
      setMainImgId(mainImgId + 1);
    }
  };

  return (
    <main>
      <div id="product-details">
        <div id="image-container">
          <div id="image-sidebar">
            {images.map((image) => (
              <div
                className="small-image"
                key={image.id}
                onClick={() => imageSelect(image)}
              >
                <img className="image" src={image.url} alt={image.id} />
              </div>
            ))}
          </div>
          <div className="main-image">
            <button className="circ than" id="less" onClick={() => backClick()}>
              <FaLessThan />
            </button>
            <img src={mainImage} className="image" />
            <Heart initial={favProduct.length} productId={productId} />
            <button id="greater" className="circ than" onClick={forwardClick}>
              <FaGreaterThan />
            </button>
          </div>
        </div>
        <div id="details">
          <div>
            <p
              className={`${product?.inventory > 5 ? "hidden" : "red bold"}`}
            >{`Only ${product.inventory} left in stock!`}</p>
            <p className="bold" style={{ fontSize: "24px" }}>
              ${product.price.toFixed(2)}
            </p>
            <p>{product?.title}</p>
            <div>
              <p className="bold inline">{product.seller.username} </p>
              <Stars rating={product.seller.seller_rating} />
            </div>
            <div>
              <button>Buy It Now</button>
              <button
                className="black-button"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="invisible-button"
                onClick={() => handleAddFavorite(product.id)}
              >
                Add to Collection
              </button>
            </div>
            <div>
              <p>Item Details</p>
              <p>{product?.description}</p>
            </div>
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
      <ProductReviews productId={productId} />
    </main>
  );
}

export default ProductDetails;
