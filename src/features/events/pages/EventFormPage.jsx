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

const initialForm = {
    title: "",
    description: "",
    artists:"",
    date: dayjs(new Date()).format('YYYY-MM-DD'),
    timeStart: dayjs(new Date()).format('HH:mm'),
    timeEnd: dayjs(new Date()).add(2, 'hour').format('HH:mm'),
    bgColor:"",
    placeId:"",
}

export const EventFormPage = () => {

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
        formState,
        setFormState, 
        onInputChange, 
        onResetForm 
    } = useForm(initialForm);

    const eventToUpdate = useMemo(() => events.find(event => event.id == eventId), [events, eventId]);

    useEffect(() => {
        if(eventToUpdate) {
            setFormState(eventToUpdate)
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

        if(eventId){
            if (!eventToUpdate) {
                console.error('El evento no existe');
                return;
            }
            updateEvent({ ...formState, id: eventId, });
        }else{
            saveEvent(formState)
            onResetForm()
        }

        setInputErrors({})
    }

    const renderButtonLabel = () => {
        const textLabel = eventId ? 'Actualizar' : 'Guardar'; 
        const processingLabel = eventId ? 'Actualizando...' : 'Guardando...';

        return isProcessing ? processingLabel : textLabel;
    }

    return (
        <PrivateLoyout>
            <div className='min-h-screen flex justify-center items-center'>    

                <form 
                    className='min-w-xs px-4 py-16 border-3 border-secondary rounded-xl'
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

                    <SelectField 
                        title='Lugares:'
                        name='placeId'
                        value={ placeId || (places.length > 0 ? places[0].id : '') }
                        onChange={onInputChange}
                        options={ places }
                    />

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
