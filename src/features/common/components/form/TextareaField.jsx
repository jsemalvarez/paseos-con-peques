

export const TextareaField = ({
    name,
    value,
    onChange,
    placeholder = '',
    label,
    className = '',
}) => {
    return (
        <div className="row-span-3">
            {label && <label htmlFor={name} className="block mb-1 font-medium">{label}</label>}
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full border border-gray-400 hover:border-secondary focus:border-secondary p-2 rounded-xl focus:bg-secondary focus:outline-none ${className}`}
            />
        </div>
    );
};
  