import { useParams } from 'react-router-dom';
import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'
import { InputForm } from '../../common/components/form/InputForm';
import { useForm } from '../../common/hooks/useForm';
import { useDrivers } from '../hooks/useDrivers';
import { useEffect, useMemo, useState } from 'react';

const initialForm = {
    name:'',
    numberId:''
}

export const DriverFormPage = () => {

    const { driverId } = useParams();

    const [inputErrors, setInputErrors] = useState({})

    const { 
        drivers,
        isProcessing,
        saveDriver, 
        updateDriver 
    } = useDrivers()

    const driverToUpdate = useMemo(() => drivers.find(driver => driver.id == driverId), [drivers, driverId]);

    const { 
        name,
        numberId,
        formState,
        onInputChange,
        setFormState,
        onResetForm
    } = useForm(initialForm)

    useEffect(() => {
        if(driverToUpdate) {
            setFormState(driverToUpdate)
        }
    },[driverToUpdate, setFormState])

    const validateForm = (form) => {

        const errors = {};

        const isTitleEmpty = form.name.trim().length === 0;
        if ( isTitleEmpty ) {
            errors.name = '*El nombre es obligatorio';
        }

        const isNumberIdEmpty = form.numberId.trim().length === 0;
        if ( isNumberIdEmpty ) {
            errors.numberId = '*El numero de veiculo es obligatorio';
        }


        return errors;
    }

    const handleNewDriver = ( e ) => {
        e.preventDefault()
        const inputErrors = validateForm(formState);
        
        const hasInputErros = Object.keys(inputErrors).length > 0;
        if (hasInputErros){
            setInputErrors(inputErrors)
            return;
        } 


        const payload = {
            ...formState,
        };

        if(driverId){
            if (!driverToUpdate) {
                console.error('El evento no existe');
                return;
            }
            updateDriver({ ...payload, id: driverId, });
        }else{
            saveDriver(payload)
            onResetForm()
        }

        setInputErrors({})
    }

    const renderButtonLabel = () => {
        const textLabel = driverId ? 'Actualizar' : 'Guardar'; 
        const processingLabel = driverId ? 'Actualizando...' : 'Guardando...';

        return isProcessing ? processingLabel : textLabel;
    }

  return (
    <PrivateLoyout>
        <div className='min-h-screen flex justify-center items-center'>

            <form
                onSubmit={ handleNewDriver }
                className='w-9/10 max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-16 bg-primary border-3 border-secondary rounded-xl'
            >
                <h3 className='md:col-span-2 text-xl font-bold text-secondary tracking-wide'>
                    { driverId ? 'Editar chofer' : 'Crear un nuevo chofer' }
                </h3>

                <InputForm 
                    title='Nombre:'
                    name='name'
                    type='text'
                    value={name}
                    onChange={onInputChange}
                    error={ inputErrors.name }
                    disabled={ isProcessing }
                />

                <InputForm 
                    title='Numero:'
                    name='numberId' // patente
                    type='text'
                    value={numberId}
                    onChange={onInputChange}
                    error={ inputErrors.numberId }
                    disabled={ isProcessing }
                />

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
