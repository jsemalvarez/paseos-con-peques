import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'users',
    initialState: {
        isProcessing : false,
        users:[],
        userDetail:{},
    },
    reducers:{
        initProcessingData: (state) => {
            state.isProcessing  = true;
        },
        addNewUser: (state, action) => {
            state.users.push(action.payload);
            state.isProcessing  = false;
        },
        updateUser:(state, action) => {
            const updatedUsers = state.users.map(user => {
                if(user.id == action.payload.id){
                    return {
                        ...user,
                        ...action.payload,
                        id: user.id
                    }
                }
                return user
            })
            state.users = updatedUsers;
            state.isProcessing  = false;
        },
        deleteUser:(state, action) => {
            const filteredUsers = state.users.filter( user => user.id != action.payload);
            state.users = filteredUsers;
            state.isProcessing  = false;
        },
        setUsers:(state, action) => {
            state.users = action.payload
            state.isProcessing = false;
        },

    }
})

export const { 
    initProcessingData, 
    addNewUser, 
    updateUser, 
    deleteUser, 
    setUsers, 
} = userSlice.actions;