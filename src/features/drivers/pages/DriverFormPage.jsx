import { useParams } from 'react-router-dom';
import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'
import { InputForm } from '../../common/components/form/InputForm';
import { useForm } from '../../common/hooks/useForm';

const initialForm = {
    name:'',
    numberId:''
}

export const DriverFormPage = () => {

    const { driverId } = useParams();

    const { 
        name,
        numberId,
        onInputChange
    } = useForm(initialForm)

        const renderButtonLabel = () => {
        const textLabel = driverId ? 'Actualizar' : 'Guardar'; 
        // const processingLabel = driverId ? 'Actualizando...' : 'Guardando...';

        // return isProcessing ? processingLabel : textLabel;
        return textLabel;
    }

  return (
    <PrivateLoyout>
        <div className='min-h-screen flex justify-center items-center'>

            <form
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
                    // error={ inputErrors.title }
                    // disabled={ isProcessing }
                />

                <InputForm 
                    title='Numero:'
                    name='numberId'
                    type='text'
                    value={numberId}
                    onChange={onInputChange}
                    // error={ inputErrors.title }
                    // disabled={ isProcessing }
                />

                <button
                        className='md:col-span-2 w-full border-2 hover:border-secondary border-indigo-100 p-2 rounded-full hover:bg-secondary hover:text-primary text-indigo-100 tracking-wide font-semibold text-lg cursor-pointer disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed'
                        type='submit'
                        // disabled={ isProcessing } 
                    >
                        { renderButtonLabel() }
                    </button>

            </form>
        </div>
    </PrivateLoyout>
  )
}
