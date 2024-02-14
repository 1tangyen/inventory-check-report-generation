// Adjusted FormCheckbox component
const FormCheckbox = ({ label, name, checked, onChange, size }) => {
  return (
    <div className="form-control items-center">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <input
          type="checkbox"
          name={name}
          checked={checked} // Use checked for controlled component
          onChange={onChange} // Ensure onChange is passed and used
          className={`checkbox checkbox-primary ${size}`}
        />
      </label>
    </div>
  );
};
export default FormCheckbox;
