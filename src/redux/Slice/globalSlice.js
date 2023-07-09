import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
        name:'global',
        initialState:{
                global:"",
                error:null
        },
        reducers:{
                setGlobalNotification:(state , action) => {
                            state.global = action.payload.data;
                            state.error = action.payload.error;
                },
                clearGlobal:(state) => {
                        state.error = null;
                        state.global = "";
                }
        }
});

export const { setGlobalNotification , clearGlobal} = globalSlice.actions;

export default globalSlice.reducer;