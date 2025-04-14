import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useForm } from '../../common/hooks/useForm'
import { usePlaces } from '../hooks/usePlaces'

import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'
import { InputForm } from '../../common/components/InputForm'
import { MapView } from '../../common/components/map/MapView'
import { DraggableMarker } from '../../common/components/map/DraggableMarker'
import { initLatLng } from '../../common/components/map/mapConstants'
import { CATEGORIES, COLORS_BY_CATEGORIES } from '../utils/categories'
import { ICONS_BY_TYPE } from '../utils/iconsByType'

const initialForm = {
    name: '',
    address: '',
    schedules: '',
    phone: '',
    whatsapp: '',
    photoUrl: '',
    web: '',
    instagram: '',
    facebook: '',
    videoLink: '',
    hasFood: false,
    hasShow: false,
    hasGames: false,
    hasSupervision: false,
    categories:[],
    description: '',
    iconType:'',
    bgColor:'',
}

export const PlaceFormPage = () => {

    const [position, setPosition] = useState(null)

    const { placeId } = useParams();
    const { places, isProcessing, updatePlace, savePlace } = usePlaces()
    const { 
        name, 
        address, 
        schedules,
        phone,
        whatsapp,
        photoUrl,
        web,
        instagram,
        facebook,
        videoLink,
        hasFood,
        hasShow,
        hasGames,
        hasSupervision,
        description,
        iconType,
        bgColor,
        categories,
        formState, 
        setFormState, 
        onInputChange, 
        onResetForm } = useForm(initialForm);



    const findPlace = (placeId) => {
        const placeToUpdate = places.find(place => place.id == placeId)

        if(placeToUpdate){
            setFormState(placeToUpdate)
            setPosition(placeToUpdate.position)
        }else{
            setFormState(formState)
            setPosition(initLatLng)
        }
    }

    useEffect(() => {
        findPlace(placeId)
    },[placeId])
    
    const handleNewPlace = ( event ) => {
        event.preventDefault()
        if(placeId){
            if (!placeId) {
                console.error('El lugar no existe');
                return;
            }
            updatePlace({ 
                ...formState, 
                position: {lat: position.lat, lng: position.lng},
                id: placeId, 
            });
        }else{
            savePlace({ 
                ...formState, 
                position: {lat: position.lat, lng: position.lng},
            })
            onResetForm()
        }
    }

    const formatedCategoies = Object.keys(CATEGORIES) 
    const formatedBgColors = Object.keys(COLORS_BY_CATEGORIES) 
    const formatedIconsTypes = Object.keys(ICONS_BY_TYPE)

    const renderButtonLabel = () => {
        const textLabel = placeId ? 'Actualizar' : 'Guardar'; 
        const processingLabel = placeId ? 'Actualizando...' : 'Guardando...';

        return isProcessing ? processingLabel : textLabel;
    }

    return (
        <PrivateLoyout>
            <div className='min-h-screen flex justify-center items-center'>    

                <form 
                    className='min-w-xs px-4 py-16 border-3 border-secondary rounded-xl'
                    onSubmit={ handleNewPlace }
                >
                    <h3 className='text-xl font-bold text-secondary tracking-wide'>
                        {placeId ? 'Editar lugar' : 'Crear un nuevo lugar'}
                    </h3>

                    <div className='h-[300px]'>
                        <MapView>
                            <DraggableMarker
                                position={position}
                                setPosition={setPosition}
                            />
                        </MapView>
                    </div>

                    <InputForm 
                        title='Nombre:'
                        name='name'
                        type='text'
                        value={name}
                        onChange={onInputChange}
                    />

                    <InputForm 
                        title='Dirección:'
                        name='address'
                        type='text'
                        value={address}
                        onChange={onInputChange}
                    />

                    <InputForm 
                        title='Horarios:'
                        name='schedules'
                        type='text'
                        value={schedules}
                        onChange={onInputChange}
                    />

                    <InputForm 
                        title='Telefono:'
                        name='phone'
                        type='text'
                        value={phone}
                        onChange={onInputChange}
                    />

                    <InputForm 
                        title='Whatsapp:'
                        name='whatsapp'
                        type='text'
                        value={whatsapp}
                        onChange={onInputChange}
                    />

                    <InputForm 
                        title='Link de foto:'
                        name='photoUrl'
                        type='text'
                        value={photoUrl}
                        onChange={onInputChange}
                    />

                    <InputForm 
                        title='Web:'
                        name='web'
                        type='text'
                        value={web}
                        onChange={onInputChange}
                    />

                    <InputForm 
                        title='Instagram:'
                        name='instagram'
                        type='text'
                        value={instagram}
                        onChange={onInputChange}
                    />

                    <InputForm 
                        title='Facebook:'
                        name='facebook'
                        type='text'
                        value={facebook}
                        onChange={onInputChange}
                    />


                    <InputForm 
                        title='Link de video'
                        name='videoLink'
                        type='text'
                        value={videoLink}
                        onChange={onInputChange}
                    />

                    <div className='pt-2'>
                        <label>
                            <input 
                                type="checkbox" 
                                name='hasFood'
                                checked={hasFood}
                                onChange={onInputChange}
                            />
                            Gastronomia
                        </label>
                    </div>

                    <div className='pt-2'>
                        <label>
                            <input 
                                type="checkbox" 
                                name='hasShow'
                                checked={hasShow}
                                onChange={onInputChange}
                            />
                            Show
                        </label>
                    </div>

                    <div className='pt-2'>
                        <label>
                            <input 
                                type="checkbox" 
                                name='hasGames'
                                checked={hasGames}
                                onChange={onInputChange}
                            />
                            Juegos
                        </label>
                    </div>

                    <div className='pt-2'>
                        <label>
                            <input 
                                type="checkbox" 
                                name='hasSupervision'
                                checked={hasSupervision}
                                onChange={onInputChange}
                            />
                            Profes a cargo
                        </label>
                    </div>

                    <div className='pt-2'>
                        <label htmlFor="categorias" className="block font-medium text-gray-700">
                            Categorías:
                        </label>
                        <select
                            id="categorias"
                            name='categories'
                            multiple
                            value={categories}
                            onChange={onInputChange}
                            className="w-full h-35 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700"
                        >
                            {formatedCategoies.map((category) => (
                            <option 
                                key={category} 
                                value={CATEGORIES[category]}
                            >
                                {category}
                            </option>
                            ))}
                        </select>
                        <p className="text-sm text-gray-500 mt-1">Usá Ctrl para seleccionar varias</p>
                    </div>

                    <div className='pt-2'>
                        <label htmlFor="bgColor" className="block font-medium text-gray-700">
                            Color del icono:
                        </label>
                        <select
                            id="bgColor"
                            name='bgColor'
                            value={bgColor}
                            onChange={onInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700"
                        >
                            {formatedBgColors.map((bgColor) => (
                            <option 
                                key={bgColor} 
                                value={COLORS_BY_CATEGORIES[bgColor]}
                            >
                                {bgColor}
                            </option>
                            ))}
                        </select>
                    </div>

                    <div className='pt-2'>
                        <label htmlFor="iconType" className="block font-medium text-gray-700">
                            Tipo de icono:
                        </label>
                        <select
                            id="iconType"
                            name='iconType'
                            value={iconType}
                            onChange={onInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700"
                        >
                            {formatedIconsTypes.map((iconType) => (
                            <option 
                                key={iconType} 
                                value={iconType}
                            >
                                {iconType}
                            </option>
                            ))}
                        </select>
                    </div>


                    <InputForm 
                        title='Descripción:'
                        name='description'
                        type='text'
                        value={description}
                        onChange={onInputChange}
                    />

                    <button
                        className='mt-5 w-full border-2 hover:border-secondary border-indigo-100  p-2 rounded-full hover:bg-secondary hover:text-primary text-indigo-100 tracking-wide font-semibold text-lg cursor-pointer disabled:cursor-not-allowed'
                        type='submit'
                        disabled={ isProcessing } 
                    >
                        { renderButtonLabel() }
                    </button>

                </form>

            </div>
        </PrivateLoyout>
    )
}
