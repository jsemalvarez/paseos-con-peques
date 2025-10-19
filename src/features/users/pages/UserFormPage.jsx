import { useParams } from 'react-router-dom';
import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'
import { InputForm } from '../../common/components/form/InputForm';
import { useForm } from '../../common/hooks/useForm';
import { useUsers } from '../hooks/useUsers';
import { useEffect, useMemo, useState } from 'react';
import { rolesOptions } from '../../common/constants/roles';

const initialForm = {
    email:'',
    password:'',
    name:'',
    roles: [],
    isUserActive: false
}

export const UserFormPage = () => {

    const { userId } = useParams();

    const [inputErrors, setInputErrors] = useState({})

    const { 
        users,
        isProcessing,
        registerUser, 
        updateUser, 
    } = useUsers()

    const userToUpdate = useMemo(() => users.find(user => user.id == userId), [users, userId]);
    const isUpdateUser = userId ? true : false;
    const hasPasswordCreated = isUpdateUser ? true : false;
    const hasEmailCreated = isUpdateUser ? true : false;

    const { 
        email,
        password,
        name,
        roles,
        isUserActive,
        formState,
        onInputChange,
        setFormState,
        onResetForm
    } = useForm(initialForm)

    useEffect(() => {
        if(userToUpdate) {
            setFormState(prev => ({...prev, ...userToUpdate}))
        }
    },[userToUpdate, setFormState])

    const handleRoleChange = (e) => {
        const { value, checked } = e.target;
        setFormState(prev => ({
            ...prev,
            roles: checked
            ? [...prev.roles, value]
            : prev.roles.filter(role => role !== value)
        }));
    };

    const validateForm = (form) => {

        const errors = {};

        if(!isUpdateUser){
            const isEmailEmpty = form.email.trim().length === 0;
            if ( isEmailEmpty ) errors.name = '*El email es obligatorio';
        }
        
        if(!isUpdateUser){
            const isPasswordEmpty = form.password.trim().length === 0;
            if ( isPasswordEmpty ) errors.numberId = '*El password es obligatorio';
        }

        const isNameEmpty = form.name.trim().length === 0;
        if ( isNameEmpty ) errors.name = '*El nombre es obligatorio';

        const hasRolesEmpty = form.roles.length === 0
        if ( hasRolesEmpty ) errors.roles = '*Seleccioná al menos un rol';

        return errors;
    }

    const handleNewUser = ( e ) => {
        e.preventDefault()
        const inputErrors = validateForm(formState);
        
        const hasInputErros = Object.keys(inputErrors).length > 0;
        if (hasInputErros){
            setInputErrors(inputErrors)
            return;
        } 

        if(userId){
            if (!userToUpdate) {
                console.error('El usuario no existe');
                return;
            }
            updateUser({ ...formState, id: userId, });
        }else{
            registerUser(formState)
            onResetForm()
        }

        setInputErrors({})
    }

    const renderButtonLabel = () => {
        const textLabel = userId ? 'Actualizar' : 'Guardar'; 
        const processingLabel = userId ? 'Actualizando...' : 'Guardando...';

        return isProcessing ? processingLabel : textLabel;
    }

  return (
    <PrivateLoyout>
        <div className='min-h-screen flex justify-center items-center'>

            <form
                onSubmit={ handleNewUser }
                className='w-9/10 max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-16 bg-primary border-3 border-secondary rounded-xl'
            >
                <h3 className='md:col-span-2 text-xl font-bold text-secondary tracking-wide'>
                    { userId ? 'Editar usuario' : 'Crear un nuevo usuario' }
                </h3>

                <InputForm 
                    title='Email:'
                    name='email'
                    type='text'
                    value={email}
                    onChange={onInputChange}
                    error={ inputErrors.email }
                    disabled={ isProcessing || hasEmailCreated }
                />

                <InputForm 
                    title='Password:'
                    name='password'
                    type='password'
                    value={password}
                    onChange={onInputChange}
                    error={ inputErrors.password }
                    disabled={ isProcessing || hasPasswordCreated}
                />

                <InputForm 
                    title='Nombre:'
                    name='name'
                    type='text'
                    value={name}
                    onChange={onInputChange}
                    error={ inputErrors.name }
                    disabled={ isProcessing }
                />

                <div className='flex flex-col'>
                    <span  className="block font-medium mb-1">
                        Estado:
                    </span>
                    <div className='h-[42px] flex justify-between items-center border border-gray-400 rounded-xl px-2 shadow-sm bg-primary'>
                    
                        <p
                            className={`mt-1 font-semibold ${
                                isUserActive ? "text-green-600" : "text-red-600"
                            }`}
                            >
                            {                                    
                                isUserActive ? "Activo" : "Inactivo"                                    
                            }
                        </p>
                        
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="isUserActive"
                                checked={ isUserActive }
                                onChange={onInputChange}
                                className="sr-only peer"
                                // disabled={!isSharing}
                            />
                            <div className={`w-11 h-6 ${isUserActive?'bg-red-600':'bg-gray-600'} rounded-full peer peer-checked:bg-green-600 transition-colors`}></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                        </label>
                    </div>
                </div>


                <div className='md:col-span-2'>
                    <p className='text-indigo-100 mb-2 font-semibold'>Roles:</p>
                    <div className='flex justify-center flex-wrap gap-4 border border-gray-400 rounded-xl p-2 shadow-sm'>
                        {rolesOptions.map(({ label, value }) => (
                            <label key={value} className='flex items-center gap-2 text-indigo-100'>
                                <input
                                    type='checkbox'
                                    value={value}
                                    checked={roles.includes(value)}
                                    onChange={handleRoleChange}
                                    disabled={isProcessing}
                                    className='accent-secondary w-5 h-5'
                                />
                                {label}
                            </label>
                        ))}
                    </div>
                    {inputErrors.roles && (
                        <p className='text-red-400 text-sm mt-1'>{inputErrors.roles}</p>
                    )}
                </div>

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
