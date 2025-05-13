export const AlertNotification = ({ message, onClose, type = 'success' }) => {
  if (!message) return null;

  const styles = {
    success: {
      container: 'bg-green-900 border-green-400 text-green-300',
      button: 'text-green-300 transition-all duration-300 hover:text-green-100',
    },
    error: {
      container: 'bg-red-900 border-red-400 text-red-300',
      button: 'text-red-300 transition-all duration-300 hover:text-red-100',
    },
    // agregar más tipos: info, warning, etc.
  };

  const currentStyle = styles[type] || styles.success;

  return (
    <div
      className={`flex items-start border-2 p-4 rounded-md mt-4 max-w-md mx-auto ${currentStyle.container}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex-1 text-sm">
        {message}
      </div>
      {onClose && (
        <button
          type="button"
          className={`ml-4 text-sm font-bold ${currentStyle.button} cursor-pointer`}
          onClick={onClose}
        >
          X
        </button>
      )}
    </div>
  );
};
