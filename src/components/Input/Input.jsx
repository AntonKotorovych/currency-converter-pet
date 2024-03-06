export default function Input({ type, name, value, onChange }) {
  return (
    <div className="input-container">
      <input
        type={type}
        step="0.01"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
