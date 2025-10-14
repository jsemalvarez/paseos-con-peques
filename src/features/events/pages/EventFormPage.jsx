import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'

import { useForm } from '../../common/hooks/useForm'
import { useEvents } from '../hooks/useEvents'

import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'
import { InputForm } from '../../common/components/form/InputForm'
import { usePlaces } from '../../places/hooks/usePlaces'
import { TextareaField } from '../../common/components/form/TextareaField'
import { SelectField } from '../../common/components/form/SelectField'
import { MapView } from '../../common/components/map/MapView'
import { DraggableMarker } from '../../common/components/map/DraggableMarker'
import { AGE_RANGES, EVENT_TYPES, EVENT_PRICES } from '../../common/utils/constants'

const tempPlace = {
    id:'tempPlace',
    name: 'Lugar Temporal',
}

const initialForm = {
    title: "",
    description: "",
    artists:"",
    date: dayjs(new Date()).format('YYYY-MM-DD'),
    timeStart: dayjs(new Date()).format('HH:mm'),
    timeEnd: dayjs(new Date()).add(2, 'hour').format('HH:mm'),
    bgColor:"",
    placeId: [tempPlace.id],
    tempPlaceName: "",
    tempPlaceAddress: "",
    tempPlacePhone: "",
    tempPlaceWhatsapp: "",
    ageRanges:[],
    activityTypes:[],
    priceType: EVENT_PRICES[0].id,
    isFeatured: false,
    photoId: '',

}

export const EventFormPage = () => {

    const [position, setPosition] = useState(null);
    const [inputErrors, setInputErrors] = useState({})

    const { eventId } = useParams();
    const { 
        events, 
        isProcessing, 
        updateEvent, 
        saveEvent 
    } = useEvents()
    const { places } = usePlaces()

    const { 
        title,
        description,
        artists,
        date,
        timeStart,
        timeEnd,
        placeId,
        ageRanges,
        isFeatured,
        photoId,
        activityTypes,
        tempPlaceName,
        tempPlaceAddress,
        tempPlacePhone,
        tempPlaceWhatsapp,
        priceType,
        formState,
        setFormState, 
        onInputChange, 
        onResetForm 
    } = useForm(initialForm);

    const eventToUpdate = useMemo(() => events.find(event => event.id == eventId), [events, eventId]);

    const [newImage, setNewImage] = useState(null);

    const handleUpload = async () => {
        const data = new FormData();
        data.append('file', newImage);
        data.append('upload_preset', 'pcp_images'); // tu preset
        data.append('folder', 'pcp-images'); // opcional

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dwhdla1b4/image/upload',
            {   
                method: 'POST', 
                body: data 
            }
        );
        const file = await res.json();
        if (!res.ok) {
            // throw new Error('Error al subir la imagen');
            console.log("Error al subir la imagen")
            return ''
        }
        // "pcp-images/publicId"
        const publicId = file.public_id.split('/')[1]

        return `${publicId}.${file.format}` ;
    };

    useEffect(() => {
        if(eventToUpdate) {
            setFormState(eventToUpdate)
            setPosition(eventToUpdate.tempPlacePosition)
            setNewImage(photoId)
        }
    },[eventToUpdate, photoId, setFormState])

    const validateForm = (form) => {

        const errors = {};

        const isTitleEmpty = form.title.trim().length === 0;
        if ( isTitleEmpty ) {
            errors.title = '*El titulo es obligatorio';
        }

        const isDateEmpty = !form.date;
        if ( isDateEmpty ) {
            errors.date = '*La fecha es obligatoria';
        }
    
        const isTimeStartEmpty = !form.timeStart;
        if (isTimeStartEmpty) {
            errors.timeStart = '*La hora de inicio es obligatoria';
        }
    
        const isTimeEndEmpty = !form.timeEnd;
        if (isTimeEndEmpty) {
            errors.timeEnd = '*La hora de fin es obligatoria';
        }

        if (form.date && form.timeStart && form.timeEnd) {
            const start = dayjs(`${form.date}T${form.timeStart}`);
            const end = dayjs(`${form.date}T${form.timeEnd}`);
    
            const isTimeStartBeforeTimeEnd = end.isBefore(start);
            if (isTimeStartBeforeTimeEnd) {
                errors.timeEnd = '*La hora de fin debe ser posterior a la hora de inicio';
            }
        }

        return errors;
    }

    const handleNewEvent = async( e ) => {
        e.preventDefault()

        const inputErrors = validateForm(formState);

        const hasInputErros = Object.keys(inputErrors).length > 0;
        if (hasInputErros){
            setInputErrors(inputErrors)
            return;
        } 

        const tempPlacePosition = position 
            ? { lat: position.lat, lng: position.lng }
            : null

        let updatedPhotoId = formState.photoId;

        //TODO: set isLoading en este punto o un loading de la imagen
        if(newImage && typeof newImage !== 'string'){
            updatedPhotoId = await handleUpload()
        }

        const payload = {
            ...formState,
            photoId: updatedPhotoId,
            tempPlacePosition,
        };

        if(eventId){
            if (!eventToUpdate) {
                console.error('El evento no existe');
                return;
            }
            updateEvent({ ...payload, id: eventId, });
        }else{
            saveEvent(payload)
            onResetForm()
            setNewImage(null);
        }

        setInputErrors({})
    }

    const renderButtonLabel = () => {
        const textLabel = eventId ? 'Actualizar' : 'Guardar'; 
        const processingLabel = eventId ? 'Actualizando...' : 'Guardando...';

        return isProcessing ? processingLabel : textLabel;
    }

    const isTempPlace = placeId[0] === tempPlace.id;

    return (
        <PrivateLoyout>
            <div className='min-h-screen flex justify-center items-center'>    

                <form 
                    className='w-9/10 max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-16 bg-primary border-3 border-secondary rounded-xl'
                    onSubmit={ handleNewEvent }
                >
                    <h3 className='md:col-span-2 text-xl font-bold text-secondary tracking-wide'>
                        {eventId ? 'Editar evento' : 'Crear un nuevo evento'}
                    </h3>

                    <InputForm 
                        title='Titulo:'
                        name='title'
                        type='text'
                        value={title}
                        onChange={onInputChange}
                        error={ inputErrors.title }
                        disabled={ isProcessing }
                    />

                    <TextareaField 
                        name="description" 
                        className='h-full'
                        value={description}
                        onChange={onInputChange}
                        placeholder='descripcion del evento ....'
                    />

                    <InputForm 
                        title='Artistas:'
                        name='artists'
                        type='text'
                        value={artists}
                        onChange={onInputChange}
                        disabled={ isProcessing }
                    />

                    <InputForm 
                        title='Fecha:'
                        name='date'
                        type='date'
                        value={date}
                        onChange={onInputChange}
                        error={ inputErrors.date }
                        disabled={ isProcessing }
                    />

                    <InputForm 
                        title='Hora de inicio:'
                        name='timeStart'
                        type='time'
                        value={timeStart}
                        onChange={onInputChange}
                        error={ inputErrors.timeStart }
                        disabled={ isProcessing }
                    />

                    <InputForm 
                        title='Hora de fin:'
                        name='timeEnd'
                        type='time'
                        value={timeEnd}
                        onChange={onInputChange}
                        error={ inputErrors.timeEnd }
                        disabled={ isProcessing }
                    />

                    {/* <InputForm 
                        title='Color:'
                        name='bgColor'
                        type='text'
                        value={bgColor}
                        onChange={onInputChange}
                        disabled={ isProcessing }
                    /> */}

                    <div className='flex flex-col'>
                        <span  className="block font-medium mb-1">
                            Edad recomendada:
                        </span>
                        <div className="w-full grow-1 min-h-[42px] flex flex-row justify-center flex-wrap gap-2 bg-primary p-2 border-1 border-gray-300 rounded-xl">
                            {AGE_RANGES.map(({ id, label }) => (
                                <label key={id} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        name="ageRanges"
                                        value={ id }
                                        checked={ ageRanges.includes(id) }
                                        onChange={ onInputChange }
                                    />
                                    { label }
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <span className="block font-medium mb-1">
                            Tipo de entrada
                        </span>
                        <PriceSelectorRadio 
                            selected={priceType} 
                            onChange={onInputChange}
                        />
                    </div>

                    <div className='flex flex-col'>
                        <span  className="block font-medium mb-1">
                            Evento:
                        </span>
                        <div className='h-[42px] flex justify-between items-center border border-white rounded-xl px-2 shadow-sm bg-primary'>
                        
                            <p
                                className={`mt-1 font-semibold ${
                                    isFeatured ? "text-green-600" : "text-red-600"
                                }`}
                                >
                                {                                    
                                    isFeatured ? "Destacodo" : "No Destacodo"                                    
                                }
                            </p>
                            
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={ isFeatured }
                                    onChange={onInputChange}
                                    className="sr-only peer"
                                    // disabled={!isSharing}
                                />
                                <div className={`w-11 h-6 ${isFeatured?'bg-red-600':'bg-gray-600'} rounded-full peer peer-checked:bg-green-600 transition-colors`}></div>
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                            </label>
                        </div>
                    </div>


                    <div className="flex flex-col">
                        <span className="block font-medium mb-1">Imagen del evento</span>

                        <label
                            htmlFor="file-upload"
                            className="w-full cursor-pointer border-2 border-indigo-100 text-indigo-100 rounded-full py-2 px-4 text-center hover:bg-secondary hover:text-primary transition"
                        >
                            {newImage ? 'Actualizar imagen' : 'Subir imagen'}
                        </label>

                        <input
                            id="file-upload"
                            type="file"
                            onChange={(e) => setNewImage(e.target.files[0])}
                            accept='image/webp'
                            className="hidden"
                        />
                    </div>

                    <div className='md:col-span-2'>
                        <span  className="block font-medium mb-1">
                            Tipo de evento
                        </span>
                        <EventTypeSelector 
                            activityTypes={ activityTypes }
                            onChange={onInputChange}
                        />
                    </div>

                    <SelectField 
                        title='Lugares:'
                        name='placeId'
                        value={ placeId }
                        onChange={onInputChange}
                        options={ [ tempPlace , ...places] }
                    />

                    {isTempPlace && (
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputForm 
                                title='Nombre del lugar'
                                name='tempPlaceName'
                                type='text'
                                value={ tempPlaceName }
                                onChange={onInputChange}
                                disabled={ isProcessing }
                            />

                            <InputForm 
                                title='Dirección'
                                name='tempPlaceAddress'
                                type='text'
                                value={ tempPlaceAddress }
                                onChange={onInputChange}
                                disabled={ isProcessing }
                            />

                            <InputForm 
                                title='Telefono'
                                name='tempPlacePhone'
                                type='text'
                                value={ tempPlacePhone }
                                onChange={onInputChange}
                                disabled={ isProcessing }
                            />

                            <InputForm 
                                title='WhatsApp'
                                name='tempPlaceWhatsapp'
                                type='text'
                                value={ tempPlaceWhatsapp }
                                onChange={onInputChange}
                                disabled={ isProcessing }
                            />

                            <div className='h-[300px] md:col-span-2'>
                                <MapView>
                                    <DraggableMarker
                                        position={position}
                                        setPosition={setPosition}
                                    />
                                </MapView>
                            </div>
                        </div>
                    )}

                    <button
                        className='md:col-span-2 w-full border-2 hover:border-secondary border-indigo-100 p-2 rounded-full hover:bg-secondary hover:text-primary text-indigo-100 tracking-wide font-semibold text-lg cursor-pointer disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed'
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

//TODO: extraer este componente aun archivo cuando se cree la carpeta de EventFormPage
const PriceSelectorRadio = ({ selected, onChange }) => {
  return (
    <div className="min-h-[42px] flex justify-center flex-wrap p-2 gap-2 border-1 border-gray-300 rounded-xl">
        {EVENT_PRICES.map((option) => (
            <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="priceType"
                    value={option.id}
                    checked={selected === option.id}
                    onChange={onChange}
                    className=""
                />
                <span className="text-sm">{option.label}</span>
            </label>
        ))}
    </div>
  );
}

//TODO: extraer este componente aun archivo cuando se cree la carpeta de EventFormPage
const EventTypeSelector = ({activityTypes, onChange}) => {
    return(
        <div className="w-full min-h-[42px] flex justify-center flex-row flex-wrap gap-2 bg-primary p-2 border-1 border-gray-300 rounded-xl">
            {EVENT_TYPES.map(({ id, label }) => (
                <label key={id} className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    name="activityTypes"
                    value={ id }
                    checked={ activityTypes.includes(id) }
                    onChange={ onChange }
                />
                { label }
                </label>
            ))}
        </div>
    )
}
