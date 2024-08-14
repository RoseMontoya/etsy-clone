import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct, addProductImage, productByUserId } from "../../redux/product";
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
    let imageArray = Array(6).fill(null);
    console.log("......", imageArray);
     imageArray = [
        {
          product_id: productId,
          url: previewImageUrl,
          preview: true,
        },
        {
          product_id: productId,
          url: image1Url? image1Url: null,
          preview: false,
        },
        {
          product_id: productId,
          url: image2Url? image2Url: null,
          preview: false,
        },
        {
          product_id: productId,
          url: image3Url? image3Url: null,
          preview: false,
        },
        {
          product_id: productId,
          url: image4Url? image4Url: null,
          preview: false,
        },
        {
          product_id: productId,
          url: image5Url? image5Url: null,
          preview: false,
        },
      ];
      await Promise.all(imageArray.map(image => dispatch(addProductImage(image))));
      dispatch(productByUserId());
      navigate("/products/current");
  };
  return (
    <form onSubmit={handleSubmit} className="product_form">
      <div>
        <label>Title:</label>
        <p>Include keywords that buyers would use to search for this item.
        </p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <p>Tell the world all about your item and why they’ll love it. Buyers will only see the first few lines unless they expand the description.
        </p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Inventory:</label>
        <input
          type="number"
          value={inventory}
          onChange={(e) => setInventory(e.target.value)}
          required
          min="0"
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
        />
      </div>
      <div>
        <label>Category:</label>
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
        <label>Preview Image URL:</label>
        <input
          type="text"
          value={previewImageUrl}
          onChange={(e) => setPreviewImageUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={image1Url}
          onChange={(e) => setImage1Url(e.target.value)}
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={image2Url}
          onChange={(e) => setImage2Url(e.target.value)}
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={image3Url}
          onChange={(e) => setImage3Url(e.target.value)}
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={image4Url}
          onChange={(e) => setImage4Url(e.target.value)}
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={image5Url}
          onChange={(e) => setImage5Url(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewProductForm;
