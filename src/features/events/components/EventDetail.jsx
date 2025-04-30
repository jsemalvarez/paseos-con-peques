import { Link } from "react-router-dom"

import { useEvents } from "../hooks/useEvents"
import { usePlaces } from "../../places/hooks/usePlaces";
import { useUserLogin } from "../../auth/hooks/useUserLogin"

import { CalendarIcon, ClockIcon, FacebookIcon, InstagramIcon, LocationIcon, VideoIcon, WebIcon, XMarkIcon } from "../../places/components/Icons"
import dayjs from "dayjs";


export const EventDetail = () => {

    const {authState } = useUserLogin()    
    const {  isProcessing, isEventDetailOpen, eventDetail, deleteEvent, handleCloseEventDetail } = useEvents()
    const { handleFindPlaceById } = usePlaces();
    
    const isAuthenticated = authState == 'authenticated';

    const place = handleFindPlaceById(eventDetail.placeId);
  
    const handleDelete = (id) => {
        deleteEvent(id)
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    return ( 
        <aside 
            className={`${ isEventDetailOpen? 'flex' : 'hidden'} top-0 w-[360px] h-full flex-col fixed right-0 border-l-4 border-secondary bg-gray-100 text-primary z-1700 transition-all`}
        >
            <div className="flex justify-between items-center px-6 py-1">
                <h2 className="font-medium text-xl"></h2>
                <span
                    className='cursor-pointer text-gray-600 hover:text-red-500 text-lg font-bold' 
                    onClick={ () => handleCloseEventDetail() }
                ><XMarkIcon style='transition-all duration-300 hover:text-red-600' /></span>
            </div>

            <figure>
                <img 
                    className="mx-auto w-[150px] h-[150px] rounded-full"
                    src={ place?.photoUrl }
                    alt={ place?.name }
                />
            </figure>


            <div className="p-6 space-y-3 flex-1 overflow-y-auto">
                <h3 className="text-2xl font-bold text-primary capitalize">{eventDetail.title}</h3>
                
                <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                        <CalendarIcon />
                        <span className="font-medium">{ dayjs(eventDetail.date).format('D [de] MMMM') }</span> 
                    </div>
                    <div className="flex items-center gap-2">
                        <ClockIcon />
                        <span className="font-medium">{eventDetail.timeStart} hs</span> 
                    </div>
                </div>

                {eventDetail.description && (
                    <p className="mt-4 text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                        {eventDetail.description}
                    </p>
                )}

                {eventDetail.artists && (
                    <p className="mt-4 font-semibold text-gray-800 leading-relaxed">
                        {eventDetail.artists}
                    </p>
                )}

                {
                    place && (
                        <>
                            <h3 className="mt-6 text-2xl font-bold text-primary capitalize flex items-center border-t border-gray-400"><LocationIcon /> {place.name}</h3>
                            {
                                place.phone && (
                                    <>
                                        <p className='mt-2 font-semibold text-gray-700'>
                                            <span className='text-gray-500'>Telefono: </span>
                                            {place.phone}
                                        </p>
                                        {
                                            isMobile && (
                                                <a
                                                    className='block p-1 flex justify-center bg-indigo-800 text-white rounded-full transition-all duration-300 hover:bg-indigo-700'
                                                    href={`tel:+54223${place.phone}`}
                                                >Llamar</a>
                                            )
                                        }
                                    </>
                                )
                            }
                            {
                                place.whatsapp &&  (
                                    <>
                                        <p className='mt-2 font-semibold text-gray-700'>
                                            <span className='text-gray-500'>Whatsapp: </span>
                                            {place.whatsapp}
                                        </p>
                                        <a
                                            target="_blank"
                                            className='block p-1 flex justify-center bg-green-700 text-white rounded-full transition-all duration-300 hover:bg-green-600' 
                                            href={`https://wa.me/${place.whatsapp}`                                
                                        }>ir a Whatsapp</a>
                                    </>
                                )
                            }
                            {
                                place.address && (
                                    <>
                                        <p className='mt-2 font-semibold text-gray-700'>
                                            <span className='text-gray-500'>Direccion: </span>
                                            {place.address}
                                        </p>
                                        <a
                                            target="_blank"
                                            className='block p-1 flex justify-center bg-blue-600 text-white rounded-full transition-all duration-300 hover:bg-blue-500' 
                                            href={`https://www.google.com/maps?q=${place.position.lat},${place.position.lng}`
                                        }>ver en mapa</a>
                                    </>
                                )
                            }
                            <div className='mt-2 flex justify-center items-center gap-6'>
                                {
                                    place.web && (
                                        <a href={place.web} target='_blank'>
                                            <WebIcon />
                                        </a>
                                    )                    
                                }
                                {
                                    place.instagram && (
                                        <a href={place.instagram} target='_blank'>
                                            <InstagramIcon />
                                        </a>
                                    )                    
                                }
                                {
                                    place.facebook && (
                                        <a href={place.facebook} target='_blank'>
                                            <FacebookIcon />
                                        </a>
                                    )                    
                                }
                                {
                                    place.videoLink && (
                                        <a href={place.videoLink} target='_blank'>
                                            <VideoIcon />
                                        </a>
                                    )                    
                                }
                            </div>
                        </>
                    )
                }

            </div>

            {
                isAuthenticated && (
                    <footer className="flex flex-col px-6 mb-6">
                        <Link 
                            to={`/events/edit/${ eventDetail.id }`}
                            className='bg-yellow-500 flex-1 cursor-pointer p-1 rounded-full flex justify-center text-gray-700 mb-2'
                        >Editar</Link>
                        {/* TODO: hacer un cartel de confirmacion antes de eliminar */}
                        <button 
                            className='bg-red-500 flex-1 text-gray-100 cursor-pointer p-1 rounded-full disabled:cursor-not-allowed'
                            onClick={ () => handleDelete( eventDetail.id )}
                            disabled={ isProcessing }
                        >{`${ isProcessing ? 'Eliminando...':'Eliminar'}`}</button>
                    </footer>
                )
            }
        </aside>
    )
}
