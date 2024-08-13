import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/product";
import "./ProductForm.css";
// import { thunkAuthenticate } from "../../redux/session";
function NewProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inventory, setInventory] = useState(0);
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.session.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("User in handleSubmit", user);
    // Check if the user is authenticated
    // if (!user) {
    //   await dispatch(thunkAuthenticate());
    //   const state = store.getState();
    //   console.log("State in handleSubmit", state);
    //   if (!state.session.user) {
    //     console.error("User is not authenticated. Redirecting to home.");
    //     navigate("/");
    //     return;
    //   }
    // }

    const new_product = {
      title,
      description,
      inventory: Number(inventory),
      price: Number(price),
      categoryId: Number(categoryId),
    };

    console.log("new_product frontend", new_product);

    const result = await dispatch(addProduct(new_product));

    if (result.ok) {
      navigate("/products/current");
    } else {
      console.error("Failed to create product:", result);
    }
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewProductForm;
