// React Imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";

// Redux Imports
import {
  addProductImage,
  updateProductImage,
  deleteProductImage,
  productById,
  editProduct,
} from "../../redux";

// Design Imports
import "./ProductForm.css";

function EditProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inventory, setInventory] = useState();
  const [price, setPrice] = useState();
  const [categoryId, setCategoryId] = useState();
  const [previewImage, setPreviewImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [errors, setErrors] = useState({});

  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
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

  useEffect(() => {
    if (!product) {
      dispatch(productById(productId));
    } else {
      setTitle(product.title || "");
      setDescription(product.description || "");
      setInventory(product.inventory || "");
      setPrice(product.price.toFixed(2) || "");
      setCategoryId(product.category_id || "");
    }
  }, [dispatch, productId, product]);

  useEffect(() => {
    if (!previewImage) {
      setPreviewImage(images[0] || "");
      setImage1(images[1] || "");
      setImage2(images[2] || "");
      setImage3(images[3] || "");
      setImage4(images[4] || "");
      setImage5(images[5] || "");
    }
  }, [images, previewImage]);

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

    const updated_product = {
      id: product.id,
      title,
      description,
      inventory: Number(inventory),
      price: Number(price),
      category_id: Number(categoryId),
      seller_id: user.id,
    };

    const imagesUpdate = [previewImage];
    const imagesDelete = [];
    const imagesAdd = [];

    if (image1.url && images[1]) {
      imagesUpdate.push(image1);
    } else if (!image1.url && images[1]) {
      imagesDelete.push(image1);
    } else if (image1.url && !images[1]) {
      imagesAdd.push(image1);
    }

    if (image2.url && images[2]) {
      imagesUpdate.push(image2);
    } else if (!image2.url && images[2]) {
      imagesDelete.push(image2);
    } else if (image2.url && !images[2]) {
      imagesAdd.push(image2);
    }

    if (image3.url && images[3]) {
      imagesUpdate.push(image3);
    } else if (!image3.url && images[3]) {
      imagesDelete.push(image3);
    } else if (image3.url && !images[3]) {
      imagesAdd.push(image3);
    }

    if (image4.url && images[4]) {
      imagesUpdate.push(image4);
    } else if (!image4.url && images[4]) {
      imagesDelete.push(image4);
    } else if (image4.url && !images[4]) {
      imagesAdd.push(image4);
    }

    if (image5.url && images[5]) {
      imagesUpdate.push(image5);
    } else if (!image5.url && images[5]) {
      imagesDelete.push(image5);
    } else if (image5.url && !images[5]) {
      imagesAdd.push(image5);
    }

    dispatch(editProduct(updated_product))
      .then((res) => {
        imagesAdd.map(async (image) => {
          const newImage = {
            product_id: res.id,
            url: image.url,
            preview: false,
          };
          dispatch(addProductImage(newImage, user.id));
        });
        imagesUpdate.map(async (image) => {
          dispatch(updateProductImage(image, user.id));
        });
        imagesDelete.map(async (image) => {
          dispatch(deleteProductImage(image));
        });

        if (res.errors) {
          setErrors(res.errors);
        } else {
          navigate(`/products/${res.id}`);
        }
      })
      .catch((err) => {
        console.error("Failed to update product:", err);
      });
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
      <form onSubmit={handleSubmit} className="product_form" encType="multipart/form-data">
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
            onChange={(e) => setPrice(e.target.value)}
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
              <option value="">Select a category</option>
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
            value={previewImage.url}
            onChange={(e) =>
              setPreviewImage({ ...previewImage, url: e.target.value })
            }
            required
          />
          {previewImage.url ? (
            <img
              className="previewImagesize"
              src={previewImage.url}
              alt="Preview if Image is valid"
            />
          ) : null}
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image1.url}
            onChange={(e) => setImage1({ ...image1, url: e.target.value })}
          />
          {image1.url ? (
            <img
              className="previewImagesize"
              src={image1.url}
              alt="Preview if Image is valid"
            />
          ) : null}
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image2.url}
            onChange={(e) => setImage2({ ...image2, url: e.target.value })}
          />
          {image2.url ? (
            <img
              className="previewImagesize"
              src={image2.url}
              alt="Preview if Image is valid"
            />
          ) : null}
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image3.url}
            onChange={(e) => setImage3({ ...image3, url: e.target.value })}
          />
          {image3.url ? (
            <img
              className="previewImagesize"
              src={image3.url}
              alt="Preview if Image is valid"
            />
          ) : null}
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image4.url}
            onChange={(e) => setImage4({ ...image4, url: e.target.value })}
          />
          {image4.url ? (
            <img
              className="previewImagesize"
              src={image4.url}
              alt="Preview if Image is valid"
            />
          ) : null}
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image5.url}
            onChange={(e) => setImage5({ ...image5, url: e.target.value })}
          />
          {image5.url ? (
            <img
              className="previewImagesize"
              src={image5.url}
              alt="Preview if Image is valid"
            />
          ) : null}
        </div>
        <button type="submit">Update Your Product</button>
      </form>
    </main>
  );
}

export default EditProductForm;
