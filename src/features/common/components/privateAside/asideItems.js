import { ROLES } from "../../constants/roles";

export const asideItems = [
    {
        path:'/',
        label:'Panel',   
        allowedRoles: [], 
    },
    {
        path:'/places',
        label:'Lugares',  
        allowedRoles: [ROLES.SUPER_ADMIN, ROLES.OWNER],   
    },
    {
        path:'/events',
        label:'Eventos',
        allowedRoles: [ROLES.SUPER_ADMIN, ROLES.ARTIST, ROLES.OWNER],     
    },
    {
        path:'/users',
        label:'Usuarios', 
        allowedRoles: [ROLES.SUPER_ADMIN],    
    },
    {
        path:'/drivers',
        label:'Choferes', 
        allowedRoles: [ROLES.SUPER_ADMIN, ROLES.DRIVER],    
    },
    {
        path:'/visual-settings',
        label:'Configuraciones', 
        allowedRoles: [ROLES.SUPER_ADMIN],    
    },
]