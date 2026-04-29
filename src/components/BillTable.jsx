export default function BillTable({ items, people, dispatch }) {
  return (
    <div>
      <h2>Items</h2>

      {items.map(item => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10
          }}
        >
          {/* Item name */}
          <input
            type="text"
            placeholder="Item name"
            value={item.name}
            onChange={e =>
              dispatch({
                type: "UPDATE_ITEM",
                payload: {
                  id: item.id,
                  updates: { name: e.target.value }
                }
              })
            }
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={e => {
              const value = Number(e.target.value);
              if (isNaN(value) || value < 0) return;

              dispatch({
                type: "UPDATE_ITEM",
                payload: {
                  id: item.id,
                  updates: { price: value }
                }
              });
            }}
          />

          {/* Assign to everyone */}
          <div>
            <label>
              <input
                type="radio"
                checked={item.assignedTo === "all"}
                onChange={() =>
                  dispatch({
                    type: "ASSIGN_ITEM",
                    payload: { id: item.id, assignedTo: "all" }
                  })
                }
              />
              Everyone
            </label>
          </div>

          {/* Assign to specific people */}
          <div>
            <strong>Split between:</strong>

            {people.map(person => {
              const selected =
                item.assignedTo !== "all" &&
                item.assignedTo.includes(person.id);

              return (
                <label key={person.id} style={{ marginRight: 10 }}>
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => {
                      let updated = [];

                      if (item.assignedTo === "all") {
                        updated = [person.id];
                      } else if (selected) {
                        updated = item.assignedTo.filter(
                          id => id !== person.id
                        );
                      } else {
                        updated = [...item.assignedTo, person.id];
                      }

                      dispatch({
                        type: "ASSIGN_ITEM",
                        payload: {
                          id: item.id,
                          assignedTo: updated
                        }
                      });
                    }}
                  />
                  {person.name}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <button onClick={() => dispatch({ type: "ADD_ITEM" })}>
        + Add Item
      </button>
    </div>
  );
}