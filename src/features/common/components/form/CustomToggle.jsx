export const CustomToggle = ({ label, isChecked, onChange }) => {
    return(
        <div className='w-9/10 flex flex-col'>
            <span  className="block font-medium mb-1">
                {`Habilitar ${label}`}
            </span>
            <div className='h-[42px] flex justify-between items-center border border-white rounded-xl px-2 shadow-sm bg-primary'>
            
                <p
                    className={`mt-1 font-semibold ${
                        isChecked ? "text-green-600" : "text-red-600"
                    }`}
                    >
                    {                                    
                        isChecked ? "Habilitado" : "No Habilitado"                                    
                    }
                </p>
                
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        name="isFeatured"
                        checked={ isChecked }
                        onChange={ onChange }
                        className="sr-only peer"
                        // disabled={!isSharing}
                    />
                    <div className={`w-11 h-6 ${isChecked?'bg-red-600':'bg-gray-600'} rounded-full peer peer-checked:bg-green-600 transition-colors`}></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                </label>
            </div>
        </div>
    )
}