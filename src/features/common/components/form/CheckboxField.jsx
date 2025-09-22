
export const CheckboxField = ({ label, name, checked, onChange, className = '' }) => {
    return (
        <div className={`${className}`}>
            <label className="flex items-center gap-2 cursor-pointer">
            <input 
                type="checkbox" 
                name={name}
                checked={checked}
                onChange={onChange}
                className="accent-indigo-600 w-4 h-4"
            />
                {label}
            </label>
        </div>
    );
};