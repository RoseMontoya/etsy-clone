// React Imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

// Redux Imports
import {
  addProduct,
  addProductImage,
  productByUserId,
} from "../../redux";

// Design Imports
import "./ProductForm.css";

function NewProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inventory, setInventory] = useState(0);
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [image1Url, setImage1Url] = useState("");
  const [image2Url, setImage2Url] = useState("");
  const [image3Url, setImage3Url] = useState("");
  const [image4Url, setImage4Url] = useState("");
  const [image5Url, setImage5Url] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.session.user);
  if (!user) return <Navigate to="/" replace={true} />;

  const validateForm = () => {
    const errorObj = {};

    if (!title) errorObj.title = "Title is required.";
    if (!description) errorObj.description = "Description is required.";
    if (description.length < 10)
      errorObj.description =
        "Description must be at least 10 characters long. Please provide more details on your product.";
    if (inventory <= 0)
      errorObj.inventory =
        "Inventory must be at least 1. Please enter a positive value.";
    if (price <= 0) errorObj.price = "Price must be greater than zero.";
    if (!categoryId) errorObj.category = "Category is required.";

    const imageUrlValid = /\.(jpeg|jpg|gif|png)$/;
    if (!previewImageUrl.match(imageUrlValid)) {
      errorObj.previewImageUrl =
        "A valid image URL is required for the preview image.";
    }

    return errorObj;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.values(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});

    const new_product = {
      title,
      description,
      inventory: Number(inventory),
      price: Number(price),
      category_id: Number(categoryId),
      seller_id: user.id,
    };

    const result = await dispatch(addProduct(new_product));

    const productId = result.id;
    let imageArray = [
      {
        product_id: productId,
        url: previewImageUrl,
        preview: true,
      },
    ];
    if (image1Url)
      imageArray.push({
        product_id: productId,
        url: image1Url,
        preview: false,
      });
    if (image2Url)
      imageArray.push({
        product_id: productId,
        url: image2Url,
        preview: false,
      });
    if (image3Url)
      imageArray.push({
        product_id: productId,
        url: image3Url,
        preview: false,
      });
    if (image4Url)
      imageArray.push({
        product_id: productId,
        url: image4Url,
        preview: false,
      });
    if (image5Url)
      imageArray.push({
        product_id: productId,
        url: image5Url,
        preview: false,
      });

    await Promise.all(
      imageArray.map((image) => dispatch(addProductImage(image, user.id)))
    );
    dispatch(productByUserId());

    if (result.errors) {
      setErrors(result.errors);
    } else {
      navigate(`/products/${productId}`);
    }
  };

  const formatDecimal = (input) => {
    let value = parseFloat(input.value);
    if (!isNaN(value)) {
      input.value = value.toFixed(2);
    }
    return input.value;
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className="product_form">
        <div>
          <label>
            <h3>Title</h3>
          </label>
          <p>Include keywords that buyers would use to search for this item.</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div>
          <label>
            <h3>Description</h3>
          </label>
          <p>
            Tell the world all about your item and why they’ll love it. Buyers
            will only see the first few lines unless they expand the
            description.
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div>
          <label>
            <h3>Inventory</h3>
          </label>
          <p>
            Keep your product availability up-to-date to ensure customers know
            when your item is in stock.
          </p>
          <input
            type="number"
            min="1"
            step="1"
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
            onBlur={(e) => {
              const formated = parseInt(e.target.value);
              setInventory(formated);
            }}
          />
          {errors.inventory && <p className="error">{errors.inventory}</p>}
        </div>
        <div>
          <label>
            <h3>Price</h3>
          </label>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <input
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            step="0.01"
            onBlur={(e) => {
              const formated = formatDecimal(e.target);
              setPrice(formated);
            }}
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>
        <div>
          <label>
            <h3>Category</h3>
          </label>
          <p>
            Categorize your product accurately to help customers find it more
            easily.
          </p>
          <div className="select-container">
            <select
              name="category_id"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="0">Select a category</option>
              <option value="1">Home & Living</option>
              <option value="2">Accessories</option>
              <option value="3">Crafting</option>
              <option value="4">Jewelry</option>
              <option value="5">Clothing</option>
            </select>
          </div>
          {errors.categoryId && <p className="error">{errors.categoryId}</p>}
        </div>
        <div>
          <label>
            <h3>Preview Image URL</h3>
          </label>
          <p>Submit at least one photo to publish your product.</p>
          <input
            type="text"
            value={previewImageUrl}
            onChange={(e) => setPreviewImageUrl(e.target.value)}
          />

          {previewImageUrl ? (
            <img
              className="previewImagesize"
              src={previewImageUrl}
              alt="Preview if Image is valid"
            />
          ) : null}
          {errors.previewImageUrl && (
            <p className="error">{errors.previewImageUrl}</p>
          )}
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image1Url}
            onChange={(e) => setImage1Url(e.target.value)}
          />

          {image1Url ? (
            <img
              className="previewImagesize"
              src={image1Url}
              alt="Preview if Image is valid"
            />
          ) : null}
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image2Url}
            onChange={(e) => setImage2Url(e.target.value)}
          />

          {image2Url ? (
            <img
              className="previewImagesize"
              src={image2Url}
              alt="Preview if Image is valid"
            />
          ) : null}
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image3Url}
            onChange={(e) => setImage3Url(e.target.value)}
          />

          {image3Url ? (
            <img
              className="previewImagesize"
              src={image3Url}
              alt="Preview if Image is valid"
            />
          ) : null}
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image4Url}
            onChange={(e) => setImage4Url(e.target.value)}
          />

          {image4Url ? (
            <img
              className="previewImagesize"
              src={image4Url}
              alt="Preview if Image is valid"
            />
          ) : null}
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image5Url}
            onChange={(e) => setImage5Url(e.target.value)}
          />

          {image5Url ? (
            <img
              className="previewImagesize"
              src={image5Url}
              alt="Preview if Image is valid"
            />
          ) : null}
        </div>
        <button type="submit">Publish Your Product</button>
      </form>
    </main>
  );
}

export default NewProductForm;
