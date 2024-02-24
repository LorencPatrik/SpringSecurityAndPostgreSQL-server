function InputField({
    type,
    name,
    label,
    prompt,
    value,
    min,
    handleChange}) {

        const minValue = ["number", "date"].includes(type) ? min : null;
        const minLength = ["text"].includes(type) ? min : null;

        return (
            <div className="form-group">
                <label>{label}</label>
                <input
                    className="form-control"
                    required={true}
                    type={type}
                    name={name}
                    placeholder={prompt}
                    value={value}
                    minLength={minLength}
                    min={minValue}
                    onChange={handleChange}
                />
            </div>
        )

}
export default InputField

