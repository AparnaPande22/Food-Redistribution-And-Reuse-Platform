import { FaTrash, FaStar } from "react-icons/fa";

function FoodItemCard({
  item,
  index,
  handleChange,
  handleRating,
  removeItem,
  handleImage,
}) {
  return (
    <div className="food-item-card">

      <div className="food-grid">

        {/* Food Name */}

        <div>
          <label>Food Name</label>

          <input
            type="text"
            placeholder="Enter food name"
            value={item.name}
            onChange={(e) =>
              handleChange(index, "name", e.target.value)
            }
          />
        </div>

        {/* Category */}

        <div>
          <label>Category</label>

          <select
            value={item.category}
            onChange={(e) =>
              handleChange(index, "category", e.target.value)
            }
          >
            <option>Cooked Meals</option>
            <option>Bakery</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Dairy</option>
            <option>Beverages</option>
          </select>
        </div>

        {/* Quantity */}

        <div>
          <label>Quantity</label>

          <input
            type="number"
            placeholder="0"
            value={item.quantity}
            onChange={(e) =>
              handleChange(index, "quantity", e.target.value)
            }
          />
        </div>

        {/* Unit */}

        <div>
          <label>Unit</label>

          <select
            value={item.unit}
            onChange={(e) =>
              handleChange(index, "unit", e.target.value)
            }
          >
            <option>Kg</option>
            <option>Grams</option>
            <option>Packets</option>
            <option>Boxes</option>
            <option>Pieces</option>
            <option>Litres</option>
          </select>
        </div>

      </div>

      {/* Rating */}

      <div className="rating-row">

        <label>Food Quality</label>

        <div>

          {[1, 2, 3, 4, 5].map((star) => (

            <FaStar
              key={star}
              className={
                star <= item.rating
                  ? "star active"
                  : "star"
              }
              onClick={() =>
                handleRating(index, star)
              }
            />

          ))}

        </div>

      </div>

      {/* Image Upload */}

 <div className="upload-row">

<label className="upload-box">

<input
type="file"
accept="image/*"
onChange={(e)=>handleImage(index,e)}
/>

<div className="upload-icon">
📷
</div>

<div className="upload-text">
Click to Upload
</div>

</label>

{item.image && (
<img
src={item.image}
alt="preview"
className="preview"
/>
)}

</div>

      {/* Delete Button */}

      {index > 0 && (

        <button
          className="delete-btn"
          onClick={() => removeItem(index)}
        >
          <FaTrash />
          {" "}
          Remove Item
        </button>

      )}

    </div>
  );
}

export default FoodItemCard;