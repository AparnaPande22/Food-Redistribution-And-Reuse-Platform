import { FaStar, FaTrash } from "react-icons/fa";

function FoodItemCard({
    item,
    index,
    handleChange,
    handleRating,
    removeItem,
    handleImage
}) {

    return (

        <div className="food-item-card">

            <div className="food-grid">

                <div>

                    <label>Name</label>

                    <input
                        type="text"
                        value={item.name}
                        placeholder="Food Name"
                        onChange={(e) =>
                            handleChange(index, "name", e.target.value)
                        }
                    />

                </div>

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

                    </select>

                </div>

                <div>

                    <label>Quantity</label>

                    <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                            handleChange(index, "quantity", e.target.value)
                        }
                    />

                </div>

                <div>

                    <label>Unit</label>

                    <select
                        value={item.unit}
                        onChange={(e) =>
                            handleChange(index, "unit", e.target.value)
                        }
                    >

                        <option>Kg</option>
                        <option>Packets</option>
                        <option>Boxes</option>
                        <option>Litres</option>

                    </select>

                </div>

            </div>

            <div className="rating-row">

                <label>Freshness Rating</label>

                <div className="stars">

                    {[1,2,3,4,5].map((star)=>(
                        <FaStar
                            key={star}
                            className={
                                star<=item.rating
                                    ? "star active"
                                    : "star"
                            }
                            onClick={()=>handleRating(index,star)}
                        />
                    ))}

                </div>

            </div>

            <div className="upload-row">

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e)=>handleImage(index,e)}
                />

                {
                    item.image &&
                    <img
                        src={item.image}
                        alt=""
                        className="preview"
                    />
                }

            </div>

            <button
                className="delete-btn"
                onClick={()=>removeItem(index)}
            >

                <FaTrash />

                Remove Item

            </button>

        </div>

    );

}

export default FoodItemCard;