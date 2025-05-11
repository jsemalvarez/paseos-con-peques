import React from 'react'

export const InputFormOld = ({title, name, type, style, value, onChange}) => {
    const defaultStyle = 'w-full border border-gray-400 hover:border-secondary focus:border-secondary p-2 rounded-xl focus:bg-secondary focus:outline-none'
  return (
    <div className='mt-2'>
        <span>{title}</span>
        <input 
            className={`${defaultStyle} ${style ? style : ''}`}
            type={type}
            name={name} 
            value={value}
            onChange={onChange}
        />
    </div>
  )
}

export const InputForm = ({
  title,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  autoComplete = 'off',
  className = '',
  id,
  error = '', // mensaje de error opcional
}) => {
  const inputId = id || name;

  const baseClass =
    'w-full border p-2 rounded-xl focus:outline-none transition-colors duration-200 disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed';
  const borderColor = error
    ? 'border-red-500 focus:border-red-500'
    : 'border-gray-400 hover:border-secondary focus:border-secondary';
  const bgFocus = error ? '' : 'focus:bg-secondary';

  return (
    <div className="mt-4">
      {title && (
        <label htmlFor={inputId} className="block mb-1 font-medium">
          {title}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`${baseClass} ${borderColor} ${bgFocus} ${className}`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};