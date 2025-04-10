import { Link } from "react-router-dom"
import { useEvents } from "../hooks/useEvents"
import { CalendarIcon, ClockIcon, LocationIcon } from "../../places/components/Icons"
import { useUserLogin } from "../../auth/hooks/useUserLogin"

export const EventDetail = () => {

    const {authState } = useUserLogin()
    
    const {  isProcessing, isEventDetailOpen, productDetail, deleteEvent, handleCloseEventDetail } = useEvents()

    const isAuthenticated = authState == 'authenticated';
  
    const handleDelete = (id) => {
        deleteEvent(id)
    }

    return ( 
        <aside 
            className={`${ isEventDetailOpen? 'flex' : 'hidden'} top-0 w-[360px] h-full flex-col fixed right-0 border-l-4 border-secondary bg-gray-100 text-primary z-50 transition-all`}
        >
            <div className="flex justify-between items-center px-6 py-1">
                <h2 className="font-medium text-xl"></h2>
                <span
                    className='cursor-pointer text-gray-600 hover:text-red-500 text-lg font-bold' 
                    onClick={ () => handleCloseEventDetail() }
                >X</span>
            </div>

            <figure>
                <img 
                    className="mx-auto w-[150px] h-[150px] rounded-full"
                    src="https://scontent.fmdq7-1.fna.fbcdn.net/v/t39.30808-6/457247061_2233053043716147_5622555891439792087_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=vvmPuLIPO2sQ7kNvwG7qtji&_nc_oc=AdkGCEA9WpkKKgO-divqOhTqMtjGm2aMeBVN4Z9aKvlly928mQgoOO9PKq-Fm4A2Puo&_nc_zt=23&_nc_ht=scontent.fmdq7-1.fna&_nc_gid=Jwzzm1Iew5qJ5htM-w-W7g&oh=00_AfFBIDXaFTKbX1Hk93agECzB2sO0npE6lltZ8RtKw6SiQA&oe=67FB6777" 
                    alt="iamgen" 
                />
            </figure>


            <div className="p-6 space-y-3 flex-1 overflow-y-auto">
                <h3 className="text-2xl font-bold text-primary capitalize">{productDetail.title}</h3>
                
                <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                        <CalendarIcon />
                        <span className="font-medium">{productDetail.date}</span> 
                    </div>
                    <div className="flex items-center gap-2">
                        <ClockIcon />
                        <span className="font-medium">{productDetail.timeStart} hs</span> 
                    </div>
                    <div className="flex items-center gap-2">
                        <LocationIcon />
                        <span className="font-semibold">{productDetail.location}</span> 
                    </div>
                    <button 
                        className='block w-full bg-blue-500 flex-1 text-gray-100 cursor-pointer p-1 rounded-full'
                        onClick={ () => {}}
                    >Ver en el Mapa</button>
                    <button 
                        className='block w-full bg-green-600 flex-1 text-gray-100 cursor-pointer p-1 rounded-full'
                        onClick={ () => {}}
                    >Whatsapp</button>
                </div>

                {productDetail.description && (
                    <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                        {productDetail.description}
                    </p>
                )}
            </div>

            {
                isAuthenticated && (
                    <footer className="flex flex-col px-6 mb-6">
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
                )
            }
        </aside>
    )
}
