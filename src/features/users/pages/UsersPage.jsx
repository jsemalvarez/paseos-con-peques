import { useEffect } from 'react'
import { PrivateLoyout } from '../../common/layouts/PrivateLoyout'
import { Link } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'

export const UsersPage = () => {

    const { 
        users,
        isProcessing,
        getUsers,
        deleteUser,
    } = useUsers()

    useEffect(()=>{
        getUsers()
    },[])

    
    const handleDelete = (id) => {
        deleteUser(id)
    }

    return (
        <PrivateLoyout>
            <div className='min-h-9/10'>
                <div className='w-9/10 max-w-[1200px] mx-auto flex flex-col justify-center items-center gap-4 px-4 py-16 bg-primary border-3 border-secondary rounded-xl'>
                    <div className='flex justify-center'>
                        <Link 
                            to='/users/new'
                            className='btn-primary'
                        >Nuevo Usuario</Link>
                    </div>


                    <div className='w-9/10 flex flex-col'>
                        <span  className="block font-medium mb-1">
                            Usuarios
                        </span>
                        <div className='border border-white rounded-xl px-2 shadow-sm bg-primary'>
                            <ul>
                                {
                                    users.map( user => {
                                        return(
                                            <li key={user.id}>
                                                {user.name}
                                                <div className="flex gap-2 p-2 bg-red-300 border-t text-sm">
                                                    <Link 
                                                        to={`/users/edit/${user.id}`}
                                                        className='bg-yellow-500 flex-1 cursor-pointer p-1 rounded-full flex justify-center text-gray-700 hover:bg-yellow-400'
                                                    >Editar</Link>
                                                    {/* TODO: hacer un cartel de confirmacion antes de eliminar */}
                                                    <button 
                                                        className='bg-red-500 flex-1 text-gray-100 cursor-pointer p-1 rounded-full disabled:cursor-not-allowed hover:bg-red-400'
                                                        onClick={ () => handleDelete(user.id) }
                                                        disabled={ isProcessing }
                                                    >{`${ isProcessing ? 'Eliminando...':'Eliminar'}`}</button>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </PrivateLoyout>
    )
}
