import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  addProductImage,
  productByUserId,
} from "../../redux/product";
import "./ProductForm.css";

function NewProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inventory, setInventory] = useState(0);
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(1);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [image1Url, setImage1Url] = useState("");
  const [image2Url, setImage2Url] = useState("");
  const [image3Url, setImage3Url] = useState("");
  const [image4Url, setImage4Url] = useState("");
  const [image5Url, setImage5Url] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.session.user);
  const handleSubmit = async (e) => {
    e.preventDefault();

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
    navigate(`/products/${productId}`);
  };
  return (
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
          required
        />
      </div>
      <div>
        <label>
          <h3>Description</h3>
        </label>
        <p>
          Tell the world all about your item and why they’ll love it. Buyers
          will only see the first few lines unless they expand the description.
        </p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
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
          value={inventory}
          onChange={(e) => setInventory(e.target.value)}
          required
          min="0"
        />
      </div>
      <div>
        <label>
          <h3>Price</h3>
        </label>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </p>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
        />
      </div>
      <div>
        <label>
          <h3>Category</h3>
        </label>
        <p>
          Categorize your product accurately to help customers find it more
          easily.
        </p>
        <select
          name="category_id"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          <option value="1">Home & Living</option>
          <option value="2">Accessories</option>
          <option value="3">Crafting</option>
          <option value="4">Jewelry</option>
          <option value="5">Clothing</option>
        </select>
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
          required
        />

        {previewImageUrl ? (
          <img
            className="previewImagesize"
            src={previewImageUrl}
            alt="Preview if Image is valid"
          />
        ) : null}
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
  );
}

export default NewProductForm;
