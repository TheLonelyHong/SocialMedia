import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../Action/friendThunk';

const friendSlice = createSlice({
        name:'friend',
        initialState:{
                loading:false,
                allFriends:[]
        },
        reducers:{},
        extraReducers:(builder) => {
                builder
                    .addCase(getAllUsers.pending , (state) => {
                                state.loading = true;
                    })
                    .addCase(getAllUsers.fulfilled , (state , action) => {
                                state.loading = false;
                                state.allFriends = action.payload;
                    })
                    .addCase(getAllUsers.rejected , (state) => {
                                state.loading = false;
                    })
        }
})

export default friendSlice.reducer;