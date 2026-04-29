export default function PersonCard({ person, data }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 10,
        marginBottom: 10,
        borderRadius: 8
      }}
    >
      <h3>{person.name}</h3>

      <p>Subtotal: ₦{data.subtotal.toFixed(2)}</p>
      <p>Tax: ₦{data.tax.toFixed(2)}</p>
      <p>Tip: ₦{data.tip.toFixed(2)}</p>

      <hr />

      <strong>Total: ₦{data.total.toFixed(2)}</strong>
    </div>
  );
}