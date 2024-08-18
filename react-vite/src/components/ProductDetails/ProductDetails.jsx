import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux imports
import { productById } from "../../redux/product";
import { favoritesByUserId } from "../../redux/favorite";
import { getAllCartItems, addToCart } from "../../redux/cart";

// component imports
import ProductReviews from "../ProductReviews";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ReviewFormModal from "../ReviewFormModal";
import { useModal } from "../../context/Modal"; // Import the modal context
import LoginFormModal from "../LoginFormModal";
import { Stars, Heart, OwnProductConflictModal } from "../SubComponents";

// Design imports
import "./ProductDetails.css";
import { FaGreaterThan } from "react-icons/fa6";
import { FaLessThan } from "react-icons/fa6";

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const { setModalContent } = useModal(); // Use the modal context to trigger the login modal
  const product = useSelector(
    (state) => state.products.productById?.[productId]
  );

  // Orders images so preview is at top of list
  const images = [];
  if (product?.product_images) {
    const imgA = Object.values(product.product_images);
    imgA.forEach((img) => {
      if (img.preview) {
        images.unshift(img);
      } else {
        images.push(img);
      }
    });
  }

  // state for main image
  const [mainImage, setMainImage] = useState(product?.preview_image);
  const [mainImgId, setMainImgId] = useState(0);

  console.log('images', images, mainImgId)

  // Get reviews
  const reviewsObj = useSelector(
    (state) => state.reviews.reviewsByProdId?.[productId]
  );
  const reviews = reviewsObj ? Object.values(reviewsObj) : []


  let userReview;
  if (reviewsObj)
    userReview = Object.values(reviewsObj).filter(
      (review) => review.user === user?.username
    );

  // Get Favorites
  const favoritesObj = useSelector((state) => state.favorites?.[user?.id]);
  const favProduct = favoritesObj
    ? Object.values(favoritesObj).reduce(
        (fav, current) =>
          current.product_id === +productId ? (fav = [current]) : fav,
        []
      )
    : [];

  useEffect(() => {
    // if product hasn't been loaded, dispatch thunk to load data.
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
      dispatch(favoritesByUserId(user?.id));
    }

    // When product is loaded, set main image initial to preveiw image
    if (product) {
      setMainImage(product.preview_image);
      setMainImgId(0);
    }
  }, [dispatch, productId, product, favoritesObj, user]);

  // Check if there were errors on the fetch
  if (errors.error) {
    const message = errors.error.message;
    return <h2 style={{ padding: "1em", textAlign: "center" }}>{message}</h2>;
  }

  // Check if product is loaded
  if (!product) { return (<main>
      <div className="center-loading">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p>Loading...</p>
            </div>
        </main>)
  }


  const handleAddToCart = () => {
    if (!user) {
      // If the user is not logged in, open the login modal
      setModalContent(<LoginFormModal />);
      return;
    }
    const cartItem = {
      product_id: product.id,
      quantity: 1, // Or whatever quantity you need
      gift: false,
      cart_id: user.cart_id, // If you have an existing cart ID
      product: product, // The entire product object
    };

    if (user.id === cartItem.product.seller.id) {
      setModalContent(<OwnProductConflictModal />);
      return;
    }

    dispatch(addToCart(cartItem)).then(() => {
      dispatch(getAllCartItems()).then(() => {
        navigate("/cart"); // Redirect to the cart page after updating the cart
      });
    });
  };

  // See if user can submit review for product
  const showReview = () => {
    if (user && product.seller.id !== user.id && !userReview?.length) {
      return true;
    }
    return false;
  };

  // image select function for image carousel
  const imageSelect = (image) => {
    setMainImage(image.url);
    let newid;
    images.forEach((img, i) => {
      if (image.id === img.id) {
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
            {images.map((image, index) => (
              <div
                className={`small-image light-hover ${index === mainImgId? "selected" : "not-selected"}`}
                key={image.id}
                onClick={() => imageSelect(image)}
              >
                <img className="image" src={image.url} alt={image.id} />
              </div>
            ))}
          </div>

          <div className="main-image">
            <button className={`circ than ${images.length === 1? "hidden" : ""}`} id="less" onClick={() => backClick()}>
              <FaLessThan />
            </button>
            <div id="mainImg-container">
              <img src={mainImage} className="image" />
            </div>

            {user ? (
              <Heart
                initial={favProduct.length}
                productId={productId}
                sellerId={product.seller.id}
              />
            ) : (
              <OpenModalMenuItem
                itemText={<Heart initial={false} productId={product.id} />}
                modalComponent={<LoginFormModal />}
              />
            )}

            <button id="greater" className={`circ than ${images.length === 1? "hidden" : ""}`} onClick={forwardClick}>
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
            <p >{product?.title}</p>
            <div className="rating">
              <p style={{fontSize: '14px'}}>{product.seller.username} </p>
              {product.seller.review_count > 0 ? (
                <Stars rating={product.seller.seller_rating} />
              ) : (
                <p className="bold">New! </p>
              )}
            </div>
            <div>
              {user ? (
                <button
                  className="black-button detail-add-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              ) : (
                <OpenModalMenuItem
                  className="signed_off_button"
                  itemText="+ Add to cart"
                  modalComponent={<LoginFormModal />}
                />
              )}
            </div>
            <div id="item-details">
              <h3 style={{margin: '8px', fontSize: '1em'}}>Item Details</h3>
              <p>{product?.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div id="review-container">
        <OpenModalMenuItem
          className={`${showReview() ? "post-review-click" : "hidden"}`}
          itemText={`${
            reviews.length
              ? "Post Your Review!"
              : "Be the first to leave a review!"
          }`}
          modalComponent={
            <ReviewFormModal
              productId={product.id}
              formType={"create"}
              sellerId={product.seller.id}
            />
          }
        />
        <ProductReviews productId={productId} sellerId={product.seller.id} />
      </div>
    </main>
  );
}

export default ProductDetails;
