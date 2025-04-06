import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useForm } from '../../common/hooks/useForm'
import { usePlaces } from '../hooks/usePlaces'

import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'
import { InputForm } from '../../common/components/InputForm'

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
    description: '',
}

export const PlaceFormPage = () => {

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
        formState, 
        setFormState, 
        onInputChange, 
        onResetForm } = useForm(initialForm);

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
            savePlace(formState)
        }
        onResetForm()
    }

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
