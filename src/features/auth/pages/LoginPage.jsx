import React from 'react'
import { Layout } from '../layout/Layout'
import { InputForm } from '../components/InputForm'
import { useForm } from '../../common/hooks/useForm'

const initialForm  = {
  email:'email@gmail.com',
  password:'*********'
}

export const LoginPage = () => {

  const { email, password, onInputChange, onResetForm } = useForm(initialForm)

  const handleLogin = (e) => {
    e.preventDefault()
    //TODO: quitar estos console
    console.log({email})
    console.log({password})
    onResetForm()
  }

  return (
    <Layout>
        <div className='min-h-screen flex justify-center items-center'>

          <form 
            className='min-w-xs px-4 py-16 border-2 border-secondary rounded-xl'
            onSubmit={ handleLogin}
          >

            <h3 className='text-xl font-bold text-secondary tracking-wide'>
              Iniciar Sesión en PcP
            </h3>

            <InputForm 
              title='email:'
              name='email'
              type='text'
              value={email}
              onChange={onInputChange}
            />

            <InputForm 
              title='contraseña:'
              name='password'
              type='password'
              value={password}
              onChange={onInputChange}
            />

            <button
              className='mt-5 w-full border-2 hover:border-secondary border-indigo-100  p-2 rounded-full hover:bg-secondary hover:text-primary text-indigo-100 tracking-wide font-semibold text-lg cursor-pointer'
              type='submit'
            >Iniciar Sesión</button>

          </form>

        </div>
    </Layout>
  )
}
