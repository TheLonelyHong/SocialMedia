import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slice/userSlice';
import globalReducer from './Slice/globalSlice';
import postReducer from './Slice/postSlice';
import friendReducer from './Slice/friendSlice';

export const Store = configureStore({
        reducer:{
                user:userReducer,
                global:globalReducer,
                post:postReducer,
                friend:friendReducer
        },
        middleware:(getDefaultMiddleware) => getDefaultMiddleware({
                serializableCheck:false
        })
});