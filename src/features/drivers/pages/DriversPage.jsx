import { useEffect, useState } from 'react'
import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'
import { Link } from 'react-router-dom'
import { useDrivers } from '../hooks/useDrivers'

export const DriversPage = () => {

    const [isDriversOn, setIsDriversOn] = useState(false)

    const { 
        drivers,
        isProcessing,
        getDrivers,
        deleteDriver,
    } = useDrivers()

    useEffect(()=>{
        getDrivers()
    },[])

    const handleSetIsDriversOn = () => {
        setIsDriversOn((prev => !prev))
    }
    
    const handleDelete = (id) => {
        deleteDriver(id)
    }

    return (
        <PrivateLoyout>
            <div className='min-h-9/10'>
                <div className='w-9/10 max-w-[1200px] mx-auto flex flex-col justify-center items-center gap-4 px-4 py-16 bg-primary border-3 border-secondary rounded-xl'>
                    <div className='flex justify-center'>
                        <Link 
                            to='/drivers/new'
                            className='btn-primary'
                        >Nuevo Chofer</Link>
                    </div>
                    <div className='w-9/10 flex flex-col'>
                        <span  className="block font-medium mb-1">
                            Habilitar Choferes
                        </span>
                        <div className='h-[42px] flex justify-between items-center border border-white rounded-xl px-2 shadow-sm bg-primary'>
                        
                            <p
                                className={`mt-1 font-semibold ${
                                    isDriversOn ? "text-green-600" : "text-red-600"
                                }`}
                                >
                                {                                    
                                    isDriversOn ? "Habilitados" : "No Habilitados"                                    
                                }
                            </p>
                            
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={ isDriversOn }
                                    onChange={ handleSetIsDriversOn }
                                    className="sr-only peer"
                                    // disabled={!isSharing}
                                />
                                <div className={`w-11 h-6 ${isDriversOn?'bg-red-600':'bg-gray-600'} rounded-full peer peer-checked:bg-green-600 transition-colors`}></div>
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                            </label>
                        </div>
                    </div>

                    <div className='w-9/10 flex flex-col'>
                        <span  className="block font-medium mb-1">
                            Choferes
                        </span>
                        <div className='border border-white rounded-xl px-2 shadow-sm bg-primary'>
                            <ul>
                                {
                                    drivers.map( driver => {
                                        return(
                                            <li key={driver.id}>
                                                {driver.name}
                                                <div className="flex gap-2 p-2 bg-red-300 border-t text-sm">
                                                    <Link 
                                                        to={`/drivers/edit/${driver.id}`}
                                                        className='bg-yellow-500 flex-1 cursor-pointer p-1 rounded-full flex justify-center text-gray-700 hover:bg-yellow-400'
                                                    >Editar</Link>
                                                    {/* TODO: hacer un cartel de confirmacion antes de eliminar */}
                                                    <button 
                                                        className='bg-red-500 flex-1 text-gray-100 cursor-pointer p-1 rounded-full disabled:cursor-not-allowed hover:bg-red-400'
                                                        onClick={ () => handleDelete(driver.id) }
                                                        disabled={ isProcessing }
                                                    >{`${ isProcessing ? 'Eliminando...':'Eliminar'}`}</button>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </PrivateLoyout>
    )
}
