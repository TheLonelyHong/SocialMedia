import { createSlice } from '@reduxjs/toolkit';
import { uploadPostfromUser , getAllPosts , userCommentAction , getOwnUserPost , firstPaginate , queryPaginate } from '../Action/postThunk';

const postSlice = createSlice({
        name:"post",
        initialState:{
                loading:false,
                postLoading:false,
                commentLoading:false,
                allPosts:[],
                userPosts:[],
                end:false
        },
        reducers:{
        },
        extraReducers:(builder) => {
                    builder
                        .addCase(uploadPostfromUser.pending , (state) => {
                                    state.loading = true;
                        })
                        .addCase(uploadPostfromUser.fulfilled , (state) => {
                                    state.loading = false;
                        })
                        .addCase(uploadPostfromUser.rejected , (state) => {
                                    state.loading = false;
                        })
                        .addCase(getAllPosts.pending , (state) => {
                                    state.postLoading = true;
                        })
                        .addCase(getAllPosts.fulfilled , (state , action) => {
                                    state.allPosts = action.payload;
                                    state.postLoading = false;
                        })
                        .addCase(getAllPosts.rejected , (state) => {
                                    state.postLoading = false;
                        })
                        .addCase(userCommentAction.pending , (state) => {
                                state.commentLoading = true;
                        })
                        .addCase(userCommentAction.fulfilled , (state) => {
                                state.commentLoading = false;
                        })
                        .addCase(userCommentAction.rejected , (state) => {
                                state.commentLoading = false;
                        })
                        .addCase(getOwnUserPost.fulfilled , (state , action) => {
                                        state.userPosts = [...action.payload.data];
                        })
                        .addCase(getOwnUserPost.rejected , (state) => {
                                        state.userPosts = [];
                        })
                        .addCase(firstPaginate.pending , (state) => {
                                        state.postLoading = true;
                        })
                        .addCase(firstPaginate.fulfilled , (state , action) => {
                                        state.postLoading = false;
                                        state.allPosts = [...action.payload];
                        })
                        .addCase(firstPaginate.rejected , (state) => {
                                        state.postLoading = false;
                                        state.allPosts = [];
                        })
                        .addCase(queryPaginate.pending , (state) => {
                                        state.postLoading = true;
                        })
                        .addCase(queryPaginate.fulfilled , (state , action) => {
                                        state.postLoading = false;
                                        state.allPosts = [...state.allPosts , ...action.payload.data];
                                        state.end = action.payload.end;
                        })
                        .addCase(queryPaginate.rejected , (state) => {
                                        state.postLoading = false;
                                        state.allPosts = [...state.allPosts];
                                        state.end = true;
                        })
        }
});

export default postSlice.reducer;