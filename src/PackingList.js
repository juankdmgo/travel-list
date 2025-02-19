import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  clearItems,
}) {
  const [sortBy, setSortBy] = useState("input");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "description") {
      return a.description.localeCompare(b.description);
    } else if (sortBy === "packed") {
      return Number(a.packed) - Number(b.packed);
    } else {
      // sortBy === "input"
      return 0; // Maintain original order
    }
  });
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button
          onClick={() => {
            clearItems();
          }}
        >
          Clear List
        </button>
      </div>
    </div>
  );
}
