import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useForm } from '../../common/hooks/useForm'
import { useEvents } from '../hooks/useEvents'

import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'
import { InputForm } from '../../common/components/InputForm'

const initialForm = {
    title: "",
    description: "",
    date: "",
    timeStart: "",
    timeEnd: "",
    location: "",
    bgColor:"",
}

export const EventFormPage = () => {

    const { eventId } = useParams();
    const { 
        events, 
        isProcessing, 
        updateEvent, 
        saveEvent 
    } = useEvents()

    const { 
        title,
        description,
        date,
        timeStart,
        timeEnd,
        location ,
        bgColor,
        formState,
        setFormState, 
        onInputChange, 
        onResetForm 
    } = useForm(initialForm);

    const eventToUpdate = useMemo(() => events.find(event => event.id == eventId), [events, eventId]);

    useEffect(() => {
        setFormState(eventToUpdate)
    },[eventToUpdate,setFormState])

    const handleNewEvent = ( event ) => {
        event.preventDefault()
        if(eventId){
            if (!eventToUpdate) {
                console.error('El evento no existe');
                return;
            }
            updateEvent({ id: eventId, ...formState });
        }else{
            saveEvent(formState)
        }
        onResetForm()
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
                        {eventId ? 'Editar lugar' : 'Crear un nuevo lugar'}
                    </h3>

                    <InputForm 
                        title='Titulo:'
                        name='title'
                        type='text'
                        value={title}
                        onChange={onInputChange}
                    />

                    <InputForm 
                        title='Descripcion:'
                        name='description'
                        type='text'
                        value={description}
                        onChange={onInputChange}
                    />

                    <InputForm 
                        title='Lugar:'
                        name='location'
                        type='text'
                        value={location}
                        onChange={onInputChange}
                    />

                    <InputForm 
                        title='Fecha:'
                        name='date'
                        type='date'
                        value={date}
                        onChange={onInputChange}
                    />

                    <InputForm 
                        title='Hora de inicio:'
                        name='timeStart'
                        type='time'
                        value={timeStart}
                        onChange={onInputChange}
                    />

                    <InputForm 
                        title='Hora de fin:'
                        name='timeEnd'
                        type='time'
                        value={timeEnd}
                        onChange={onInputChange}
                    />

                    <InputForm 
                        title='Color:'
                        name='bgColor'
                        type='text'
                        value={bgColor}
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
