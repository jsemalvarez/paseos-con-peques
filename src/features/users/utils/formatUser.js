
export const formatUser = (user) => {
    return{
        id: user.id,
        email: user.email || 'Sin email',
        name: user.name || 'Sin nombre',
        roles: user.roles || [],
        isUserActive:  user.isUserActive || false
    }
}