export default function AdSlot({ label }) {
  return (
    <div
      style={{
        margin: "24px 0",
        padding: "20px",
        background: "#f0f0f0",
        border: "1px dashed #ccc",
        borderRadius: 8,
        textAlign: "center",
        color: "#999",
        fontSize: 13,
      }}
    >
      Ad Slot: {label}
    </div>
  );
}
