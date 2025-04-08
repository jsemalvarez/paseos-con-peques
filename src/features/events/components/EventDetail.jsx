import { Link } from "react-router-dom"
import { useEvents } from "../hooks/useEvents"

export const EventDetail = () => {

    const {  isProcessing, isEventDetailOpen, productDetail, deleteEvent, handleCloseEventDetail } = useEvents()
  
    const handleDelete = (id) => {
        deleteEvent(id)
    }

    return ( 
        <aside 
            className={`${ isEventDetailOpen? 'flex' : 'hidden'} top-0 w-[360px] h-full flex-col fixed right-0 border-l-4 border-secondary bg-gray-100 text-primary overflow-y-auto`}
        >
            <div className="flex justify-between items-center p-6">
                <h2 className="font-medium text-xl">Detail</h2>
                <span
                    className='h-6 w-6 text-black cursor-pointer' 
                    onClick={ () => handleCloseEventDetail() }
                >X</span>
            </div>
            <p className='flex flex-col p-6'>
                <span className='font-medium text-2xl mb-2'>{ productDetail.title }</span>
                <span className='font-medium text-md'>Fecha: { productDetail.date }</span>
                <span className='font-medium text-md'>Hora: { productDetail.timeStart }</span>
                <span className='font-light text-md'>{ productDetail.description }</span>
            </p>
            <footer className="flex flex-col px-6">
                <Link 
                    to={`/events/edit/${ productDetail.id }`}
                    className='bg-yellow-500 flex-1 cursor-pointer p-1 rounded-full flex justify-center text-gray-700 mb-2'
                >Editar</Link>
                {/* TODO: hacer un cartel de confirmacion antes de eliminar */}
                <button 
                    className='bg-red-500 flex-1 text-gray-100 cursor-pointer p-1 rounded-full disabled:cursor-not-allowed'
                    onClick={ () => handleDelete( productDetail.id )}
                    disabled={ isProcessing }
                >{`${ isProcessing ? 'Eliminando...':'Eliminar'}`}</button>
            </footer>
        </aside>
    )
}
