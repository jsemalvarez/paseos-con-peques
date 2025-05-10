export const SelectField = ({
  title,
  name,
  value,
  onChange,
  options = [],
  error = '',
  disabled = false
}) => {
  return (
    <div className='pt-2'>
      <label htmlFor={name} className='block font-medium text-gray-700'>
        {title}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
        } text-gray-700`}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <span className='text-sm text-red-600'>{error}</span>}
    </div>
  );
};
