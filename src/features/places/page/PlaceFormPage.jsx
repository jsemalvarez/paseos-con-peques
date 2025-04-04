import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useForm } from '../../common/hooks/useForm'
import { usePlaces } from '../hooks/usePlaces'

import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'
import { InputForm } from '../../auth/components/InputForm'

const initialForm = {
    name: ''
}

export const PlaceFormPage = () => {

    const { placeId } = useParams();
    const { places, isProcessing, updatePlace, savePlace } = usePlaces()
    const { name, formState, setFormState, onInputChange, onResetForm } = useForm(initialForm);

    const placeToUpdate = useMemo(() => places.find(place => place.id == placeId), [places, placeId]);

    useEffect(() => {
        setFormState(placeToUpdate)
    },[placeToUpdate,setFormState])

    const handleNewPlace = ( event ) => {
        event.preventDefault()
        if(placeId){
            if (!placeToUpdate) {
                console.error('El lugar no existe');
                return;
            }
            updatePlace({ id: placeId, ...formState });
        }else{
            savePlace({name})
        }
        onResetForm()
    }

    const renderButtonLabel = () => {
        const processingLabel = isProcessing ? 'Actualizando...' : 'Guardando...';
        const textLabel = placeId ? 'Actualizar' : 'Guardar'; 

        return isProcessing ? processingLabel :textLabel;
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
