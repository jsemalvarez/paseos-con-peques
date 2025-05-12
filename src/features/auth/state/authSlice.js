import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        userName: null,
        photoURL: null,
        errorMessage: null,
        isProcessing: false
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.userName = payload.userName || null;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: ( state, { payload } ) => {
            state.status = 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.userName = null;
            state.photoURL = null;
            state.errorMessage = payload;
        },
        checkingCredentials: (state) => {
            state.status = 'checking'
        },
        initProcessingData: (state) => {
            state.isProcessing  = true;
        },
        endProcessingData: (state) => {
            state.isProcessing  = false;
        },
    }
})

export const { login, logout, checkingCredentials, initProcessingData, endProcessingData } = authSlice.actions;