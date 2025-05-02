
export const CallButton = ({ phone, className = '' }) => {
    if (!phone) return null;
  
    const fullPhone = `+54223${phone}`;
  
    return (
        <a
            className={`block p-1 flex justify-center bg-indigo-800 text-white rounded-full transition-all duration-300 hover:bg-indigo-700 ${className}`}
            href={`tel:${fullPhone}`}
        >
            Llamar
        </a>
    );
};
  