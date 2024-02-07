const FormInput = ({ label, name, type, defaultValue }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          className="input input-bordered"
        />
      </label>
    </div>
  );
};

export default FormInput;
