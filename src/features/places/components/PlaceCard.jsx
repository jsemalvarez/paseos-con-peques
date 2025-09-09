import { Link } from 'react-router-dom'

import { useUserLogin } from '../../auth/hooks/useUserLogin'
import { usePlaces } from '../hooks/usePlaces'
import { FacebookIcon, InstagramIcon, VideoIcon, WebIcon } from '../../common/components/Icons'
import { ViewOnMapButton } from '../../common/components/buttons/ViewOnMapButton'
import { WhatsappButton } from '../../common/components/buttons/WhatsappButton'
import { CallButton } from '../../common/components/buttons/CallButton'
import { useIsMobile } from '../../common/hooks/useIsMobile'

export const PlaceCard = ({place}) => {

    const { authState } = useUserLogin()
    const { isProcessing, deletePlace } = usePlaces();

    const isAuthenticated = authState == 'authenticated';

    const servicesToString = [
        place.hasGames && "Juegos",
        place.hasShow && "Show",
        place.hasFood && "Gastronomía",
        place.hasSupervision && "Profes a cargo"
      ].filter(Boolean).join(" / ");

    const isMobile = useIsMobile();

    const handleDelete = (id) => {
        deletePlace(id)
    }

    return (
        <div className="bg-gradient-to-b from-primary to-gray-100 shadow-lg shadow-cyan-500/50 p-[2px] flex justify-center items-center w-full max-w-sm h-[250px] rounded-lg shadow-md">
            <div className="bg-gradient-to-b from-secondary to-primary flex flex-col w-full h-full rounded-lg overflow-hidden">
                {/* <div className="h-1/3 w-full">
                    <img
                        src={place.photoUrl}
                        alt={place.name}
                        className="object-cover w-full h-full"
                    />
                </div> */}
  
                {/* Contenido scrollable */}
                <div className="flex-1 overflow-y-auto p-4 text-gray-200">
                    <h2 className="text-purple-800 text-2xl font-extrabold">{place.name}</h2>
                    <p className='font-bold -mt-1'>{place.schedules}</p>
                    <div className='-mt-1 text-sm'>
                        <p>{servicesToString}</p>

                    <p className="text-sm whitespace-pre-line mt-2">{place.description}</p>

                    </div>
                    {
                        place.phone && (
                            <>
                                <p className='mt-2 font-semibold'>
                                    <span className='text-gray-400'>Telefono: </span>
                                    {place.phone}
                                </p>
                                {
                                    isMobile && (
                                        <CallButton phone={place.phone} />
                                    )
                                }
                            </>
                        )
                    }
                    {
                        place.whatsapp &&  (
                            <>
                                <p className='mt-2 font-semibold'>
                                    <span className='text-gray-400'>Whatsapp: </span>
                                    {place.whatsapp}
                                </p>
                                <WhatsappButton whatsapp={ place.whatsapp } />
                            </>
                        )
                    }
                    {
                        place.address && (
                            <>
                                <p className='mt-2 font-semibold'>
                                    <span className='text-gray-400'>Direccion: </span>
                                    {place.address}
                                </p>
                                <ViewOnMapButton position={ place.position } />
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

                </div>  
                {
                    isAuthenticated && (
                        <div className="flex gap-2 p-2 bg-red-300 border-t text-sm">
                            <Link 
                                to={`/places/edit/${place.id}`}
                                className='bg-yellow-500 flex-1 cursor-pointer p-1 rounded-full flex justify-center text-gray-700 hover:bg-yellow-400'
                            >Editar</Link>
                            {/* TODO: hacer un cartel de confirmacion antes de eliminar */}
                            <button 
                                className='bg-red-500 flex-1 text-gray-100 cursor-pointer p-1 rounded-full disabled:cursor-not-allowed hover:bg-red-400'
                                onClick={ () => handleDelete(place.id) }
                                disabled={ isProcessing }
                            >{`${ isProcessing ? 'Eliminando...':'Eliminar'}`}</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
