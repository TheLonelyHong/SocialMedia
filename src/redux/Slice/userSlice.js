import { createSlice } from '@reduxjs/toolkit';
import { registerAccount , extractUserDataOut , logoutUser , loginUser , updateUserBackground , updateNickname , updateDesc , updateUserPassword} from '../Action/userThunk';

const userSlice = createSlice({
        name:'user',
        initialState:{
                current:{},
                loading:false,
                auth:null,
                backLoading:false,
                nickLoading:false,
                descLoading:false,
                passLoading:false
        },
        reducers:{},
        extraReducers:(builder) => {
                builder
                        .addCase(registerAccount.pending , (state) => {
                                        state.loading = true;
                        })
                        .addCase(registerAccount.fulfilled , (state) => {
                                        state.loading = false;
                        })
                        .addCase(registerAccount.rejected , (state) => {
                                        state.loading = false;
                        })
                        .addCase(extractUserDataOut.pending , (state) => {
                                        state.loading = true;
                        })
                        .addCase(extractUserDataOut.fulfilled , (state , action) => {
                                        state.loading = false;
                                        state.current = action.payload.data;
                        })
                        .addCase(extractUserDataOut.rejected , (state) => {
                                        state.loading = false;
                        })
                        .addCase(logoutUser.fulfilled , (state) => {
                                        state.current = {};
                        })
                        .addCase(loginUser.pending , (state) => {
                                        state.loading = true;
                        })
                        .addCase(loginUser.fulfilled , (state) => {
                                state.loading = false;
                        })
                        .addCase(loginUser.rejected , (state) => {
                                state.loading = false;
                        })
                        .addCase(updateUserBackground.pending , (state) => {
                                state.backLoading = true;
                        })
                        .addCase(updateUserBackground.fulfilled , (state) => {
                                state.backLoading = false;
                        })
                        .addCase(updateUserBackground.rejected , (state) => {
                                state.backLoading = false;
                        })
                        .addCase(updateDesc.pending , (state) => {
                                state.descLoading = true;
                        })
                        .addCase(updateDesc.fulfilled , (state) => {
                                state.descLoading = false;
                        })
                        .addCase(updateDesc.rejected , (state) => {
                                state.descLoading = false;
                        })
                        .addCase(updateNickname.pending , (state) => {
                                state.nickLoading = true;
                        })
                        .addCase(updateNickname.fulfilled , (state) => {
                                state.nickLoading = false;
                        })
                        .addCase(updateNickname.rejected , (state) => {
                                state.nickLoading = false;
                        })
                        .addCase(updateUserPassword.pending , (state) => {
                                state.passLoading = true;
                        })
                        .addCase(updateUserPassword.fulfilled , (state) => {
                                state.passLoading = false;
                        })
                        .addCase(updateUserPassword.rejected , (state) => {
                                state.passLoading = false;
                        })
        }
});


export default userSlice.reducer;