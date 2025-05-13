import { Link } from 'react-router-dom'

import { useForm } from '../../common/hooks/useForm'
import { useUserLogin } from '../hooks/useUserLogin'

import { Layout } from '../layout/Layout'
import { InputForm } from '../../common/components/form/InputForm'
import { useState } from 'react'
import { AlertNotification } from '../../common/components/AlertNotification'

const initialForm  = {
  email:'email@gmail.com',
  password:'123456'
}

export const LoginPage = () => {

  const [inputErrors, setInputErrors] = useState({})

  const { email, password, onInputChange, formState } = useForm(initialForm)
  const { isProcessing, errorMessage, loginWithEmailPassword } = useUserLogin()

  if(errorMessage){
    //TODO: cambiar por un alert
    console.log(errorMessage)
  }

  const validateForm = (form) => {

    const errors = {};

    const isEmailEmpty = form.email.trim().length === 0;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(form.email)
    if ( isEmailEmpty ) {
        errors.email = '*El email es obligatorio';
    }else if (!isEmailValid) {
      errors.email = '*El email no tiene un formato válido';
    }

    const isPasswordEmpty = form.password.trim().length === 0;
    if ( isPasswordEmpty ) {
        errors.password = '*El password es obligatorio';
    }else if (form.password.length < 6) {
      errors.password = '*El password debe tener al menos 6 caracteres';
    }

    return errors;
  }

  const handleLogin = (e) => {
    e.preventDefault()

    setInputErrors({})

    const inputErrors = validateForm(formState);

    const hasInputErros = Object.keys(inputErrors).length > 0;
    if (hasInputErros){
        setInputErrors(inputErrors)
        return;
    } 

    loginWithEmailPassword({email, password});

    setInputErrors({})
  }

  return (
    <>
      {
        <Layout>
          <div className='min-h-screen flex justify-center items-center'>
  
            <form 
              className='min-w-xs px-4 py-16 border-3 border-secondary rounded-xl'
              onSubmit={ handleLogin}
            >
              <div className='flex justify-center'>
                <Link 
                  to='/'
                  className='border p-3 rounded-lg text-secondary cursor-pointer hover:text-indigo-100'
                >
                  <span className='text-5xl font-bold'>P</span>
                  <span className='text-3xl'>c</span>
                  <span className='text-4xl font-bold'>P</span>
                </Link>
              </div>
              <h3 className='text-xl font-bold text-secondary tracking-wide mt-8'>
                Iniciar Sesión
              </h3>
  
              <InputForm 
                title='email:'
                name='email'
                type='text'
                value={email}
                onChange={onInputChange}
                error={ inputErrors.email }
                disabled={ isProcessing }
              />
  
              <InputForm 
                title='contraseña:'
                name='password'
                type='password'
                value={password}
                onChange={onInputChange}
                error={ inputErrors.password }
                disabled={ isProcessing }
              />
  
              <button
                className='mt-5 w-full border-2 transition-all duration-300 hover:border-secondary border-indigo-100 p-2 rounded-full hover:bg-secondary hover:text-primary text-indigo-100 tracking-wide font-semibold text-lg cursor-pointer disabled:bg-gray-400 disabled:border-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed'
                type='submit'
                disabled={ isProcessing }
              >{ isProcessing ? 'Ingresando...': 'Ingresar'}</button>

              {
                errorMessage && (
                  <AlertNotification
                    type='error' 
                    message='Credenciales invalidas'
                    onClose={()=>{}}
                  />
                )
              }
  
            </form>
  
          </div>
        </Layout>
        
      }
    </>
    
  )
}
