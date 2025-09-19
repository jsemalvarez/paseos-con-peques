import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useForm } from '../../common/hooks/useForm'
import { useEvents } from '../hooks/useEvents'

import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'
import { InputForm } from '../../common/components/form/InputForm'
import { usePlaces } from '../../places/hooks/usePlaces'
import { TextareaField } from '../../common/components/form/TextareaField'
import dayjs from 'dayjs'
import { SelectField } from '../../common/components/form/SelectField'
import { AGE_RANGES, EVENT_TYPES, PRICE_EVENTS } from '../../common/utils/constants'
import { MapView } from '../../common/components/map/MapView'
import { DraggableMarker } from '../../common/components/map/DraggableMarker'

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
    priceType: PRICE_EVENTS[0].id
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
        bgColor,
        placeId,
        ageRanges,
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

    useEffect(() => {
        if(eventToUpdate) {
            setFormState(eventToUpdate)
            setPosition(eventToUpdate.tempPlacePosition)
        }
    },[eventToUpdate,setFormState])

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

    const handleNewEvent = ( e ) => {
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

        if(eventId){
            if (!eventToUpdate) {
                console.error('El evento no existe');
                return;
            }
            updateEvent({ ...formState, tempPlacePosition, id: eventId, });
        }else{
            saveEvent({...formState, tempPlacePosition })
            onResetForm()
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
                    className='min-w-xs px-4 bg-primary py-16 border-3 border-secondary rounded-xl'
                    onSubmit={ handleNewEvent }
                >
                    <h3 className='text-xl font-bold text-secondary tracking-wide'>
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
                        rows="6" 
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

                    <InputForm 
                        title='Color:'
                        name='bgColor'
                        type='text'
                        value={bgColor}
                        onChange={onInputChange}
                        disabled={ isProcessing }
                    />

                    <div className="w-full max-w-md mx-auto flex justify-center flex-row gap-4 mb-2 bg-primary mt-5 p-2 border-1 border-gray-300 rounded-lg">
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

                    <EventTypeSelector 
                        activityTypes={ activityTypes }
                        onChange={onInputChange}
                    />

                    <div className='mt-4'>
                        <span  className="block font-medium">
                            Tipo de entrada
                        </span>
                        <PriceSelectorRadio 
                            selected={priceType} 
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
                        <div className="mt-4 space-y-3">
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

                            <div className='h-[300px]'>
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
                        className='mt-5 w-full border-2 hover:border-secondary border-indigo-100 p-2 rounded-full hover:bg-secondary hover:text-primary text-indigo-100 tracking-wide font-semibold text-lg cursor-pointer disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed'
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
    <div className="flex justify-center p-2 gap-4 border-1 border-gray-300 rounded-lg">
        {PRICE_EVENTS.map((option) => (
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
        <div className="w-full max-w-md mx-auto flex justify-center flex-row flex-wrap gap-4 mb-2 bg-primary mt-5 p-2 border-1 border-gray-300 rounded-lg">
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
