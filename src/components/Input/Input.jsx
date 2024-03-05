export default function Input({ name, value, onChange }) {
  return (
    <div className="input-container">
      <input
        type="number"
        step="0.01"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
