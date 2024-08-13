import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productById, productByUserId, editProduct } from "../../redux/product";
import "./ProductForm.css";

function EditProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inventory, setInventory] = useState();
  const [price, setPrice] = useState();
  const [categoryId, setCategoryId] = useState();
  // const [previewImageUrl, setPreviewImageUrl] = useState("");
  // const [image1Url, setImage1Url] = useState("");
  // const [image2Url, setImage2Url] = useState("");
  // const [image3Url, setImage3Url] = useState("");
  // const [image4Url, setImage4Url] = useState("");
  // const [image5Url, setImage5Url] = useState("");
  // const [image1Id, setImage1Id] = useState(null);
  // const [image2Id, setImage2Id] = useState(null);
  // const [image3Id, setImage3Id] = useState(null);
  // const [image4Id, setImage4Id] = useState(null);
  // const [image5Id, setImage5Id] = useState(null);

  const {productId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const product = useSelector(state => state.products.productById?.[productId])

  useEffect(() => {
    if (!product) dispatch(productById(productId))
}, [dispatch, productId, product])
  

  useEffect(() => {
    if (product) {
        setTitle(product.title || '');
        setDescription(product.description || '');
        setInventory(product.inventory || '');
        setPrice(product.price || '');
        setCategoryId(String(product.categoryId) || '');
        // setPreviewImageUrl(product.product_images[0].url || '');
        // setImage1Url(product.product_images[1]?.url || '');
        // setImage1Id(product.product_images[1]?.id || null);
        // setImage2Url(product.product_images[2]?.url || '');
        // setImage2Id(product.product_images[2]?.id || null);
        // setImage3Url(product.product_images[3]?.url || '');
        // setImage3Id(product.product_images[3]?.id || null);
        // setImage4Url(product.product_images[4]?.url || '');
        // setImage4Id(product.product_images[4]?.id || null);
        // setImage5Url(product.product_images[5]?.url || '');
        // setImage5Id(product.product_images[5]?.id || null);
    }
  }, [product])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updated_product = {
      id: product.id,
      title,
      description,
      inventory: Number(inventory),
      price: Number(price),
      category_id: Number(categoryId),
      seller_id: user.id,
    };

    await dispatch(editProduct(updated_product));

    // const imageArray = [
    //   { id: product?product.product_images[0].id: image1Id, product_id: product.id, url: image1Url, preview: false },
    //   { id: product?product.product_images[1].id: image2Id, product_id: product.id, url: image2Url, preview: false },
    //   { id: product?product.product_images[2].id: image3Id, product_id: product.id, url: image3Url, preview: false },
    //   { id: product?product.product_images[3].id: image4Id, product_id: product.id, url: image4Url, preview: false },
    //   { id: product?product.product_images[4].id: image5Id, product_id: product.id, url: image5Url, preview: false },
    // ];

    // await Promise.all(
    // imageArray.map(image => {
    //   if (image.id) {
    //     return dispatch(updateProductImage(image));
    //   } else if (!image.id && image.url) {
    //     return dispatch(addProductImage(image));
    //   }
    //   return null;
    //   })
    // );
    dispatch(productByUserId());
    navigate("/products/current");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
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
      {/* <div>
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
      </div> */}
      <button type="submit">Update</button>
    </form>
  );
}

export default EditProductForm;
