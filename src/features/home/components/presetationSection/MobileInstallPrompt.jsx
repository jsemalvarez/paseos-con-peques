import React from 'react'

export const MobileInstallPrompt = ({deferredPrompt, handleInstallClick}) => {
  return (
    <div className="flex flex-col items-center mx-6 mt-4">
      <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-3 rounded text-center text-sm">
        <p className="font-medium">
          ¡Instalá nuestra app para tener acceso más rápido desde tu pantalla de inicio!
        </p>
      </div>
      <button 
        className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer disabled:bg-blue-200 disabled:text-blue-400 disabled:cursor-not-allowed"
        onClick={handleInstallClick} 
        disabled={!deferredPrompt}
      >
        Instalar App
      </button>
    </div>
  )
}
