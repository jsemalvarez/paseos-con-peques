import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useForm } from '../../common/hooks/useForm'
import { useEvents } from '../hooks/useEvents'

import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'
import { InputForm } from '../../common/components/InputForm'

const initialForm = {
    name: ''
}

export const EventFormPage = () => {

    const { eventId } = useParams();
    const { events, isProcessing, updateEvent, saveEvent } = useEvents()
    const { name, formState, setFormState, onInputChange, onResetForm } = useForm(initialForm);

    const eventToUpdate = useMemo(() => events.find(event => event.id == eventId), [events, eventId]);

    useEffect(() => {
        setFormState(eventToUpdate)
    },[eventToUpdate,setFormState])

    const handleNewEvent = ( event ) => {
        event.preventDefault()
        if(eventId){
            if (!eventToUpdate) {
                console.error('El lugar no existe');
                return;
            }
            updateEvent({ id: eventId, ...formState });
        }else{
            saveEvent({name})
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
                        title='Nombre:'
                        name='name'
                        type='text'
                        value={name}
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
