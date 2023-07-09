import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth , storage , firestore } from '../../config/firebase';
import { ref , uploadBytes , getDownloadURL , deleteObject } from 'firebase/storage';
import { collection , addDoc , getDocs , updateDoc , arrayUnion , doc , arrayRemove , where , query , deleteDoc, orderBy, startAfter, limit } from 'firebase/firestore';
import { Post , postConverter } from '../../utils/tools';
import { setGlobalNotification } from '../Slice/globalSlice';

const postCollection = collection(firestore , 'posts');
let lastVisible = null;

export const uploadPostfromUser = createAsyncThunk(
        'post/uploadPostfromUser',
        async({title , imgFile , username , userImgUrl } , {dispatch}) => {
                    try {
                                const storageRef = ref(storage , `postMedia/${imgFile.name}.${auth.currentUser.uid}`);
                                await uploadBytes(storageRef , imgFile);
                                const imgUrl = await getDownloadURL(storageRef);
                                const postRef = postCollection.withConverter(postConverter);
                                await addDoc(postRef , new Post(title , imgUrl , imgFile.name , auth.currentUser.email , username , auth.currentUser.uid , userImgUrl));
                                dispatch(setGlobalNotification({data:"Upload post successfully !" , error:true}));
                    } catch (error) {
                            console.log(error.code , error.message);
                            dispatch(setGlobalNotification({data:"Upload post failure !" , error:false}));
                            throw error;
                    }
        }
);

export const getAllPosts = createAsyncThunk(
        'post/getAllPosts',
        async({num}) => {
                try {
                            const remainPosts = query(postCollection , orderBy("createdAt" , "desc") , limit(num));
                            const querySnapshot = await getDocs(remainPosts);
                            const allData = querySnapshot.docs.map((doc) => ({...doc.data() , id:doc.id}));
                            return allData;
                } catch (error) {
                        console.log(error.code , error.message);
                        throw error;
                }
        }
);

export const userLikeAction = createAsyncThunk(
        'post/userLikeAction',
        async({postId , userUsername , userUid } , {dispatch}) => {
                        try {
                                await updateDoc(doc(firestore , 'posts' , `${postId}`) , {
                                                likes:arrayUnion({
                                                        username:userUsername,
                                                        uid:userUid
                                                })
                                })

                                dispatch(setGlobalNotification({data:"Like action success" , error:true}));
                        } catch (error) {
                                console.log(error.code , error.message);
                                dispatch(setGlobalNotification({data:"Like action failure !" , error:false}));
                                throw error;
                        }
        }
);

export const userDislikeAction = createAsyncThunk(
        'post/userLikeAction',
        async({postId , userUsername , userUid } , {dispatch}) => {
                        try {
                                await updateDoc(doc(firestore , 'posts' , `${postId}`) , {
                                                likes:arrayRemove({
                                                        username:userUsername,
                                                        uid:userUid
                                                })
                                })

                                dispatch(setGlobalNotification({data:"Dislike action success" , error:true}));
                        } catch (error) {
                                console.log(error.code , error.message);
                                dispatch(setGlobalNotification({data:"Dislike action failure !" , error:false}));
                                throw error;
                        }
        }
);

export const userCommentAction = createAsyncThunk(
        'post/userCommentAction',
        async({postId , username , title} , {dispatch}) => {
                        try {
                                await updateDoc(doc(firestore , 'posts' , `${postId}`) , {
                                                comments:arrayUnion({
                                                        username,
                                                        title
                                                })
                                })

                                dispatch(setGlobalNotification({data:"Comment action success" , error:true}));
                        } catch (error) {
                                console.log(error.code , error.message);
                                dispatch(setGlobalNotification({data:"Comment action failure !" , error:false}));
                                throw error;
                        }
        }
);

export const getOwnUserPost = createAsyncThunk(
        'post/getOwnUserPost',
        async({email} , {dispatch}) => {
                        try {
                                const q = query(postCollection , where("email" , "==" , `${email}`));
                                const querySnapshot = await getDocs(q);
                                const queryData = querySnapshot.docs.map((doc) => ({...doc.data() , id:doc.id}))
                                return {
                                        data:queryData
                                }
                        } catch (error) {
                                  console.log(error.code , error.message);
                                  dispatch(setGlobalNotification({data:"Get own posts failed !" , error:false}));
                                  throw error;
                        }
        }
);

export const editUserTitle = createAsyncThunk(
        'post/editUserTitle',
        async({id , title} , {dispatch}) => {
                        try {
                                await updateDoc(doc(firestore , 'posts' , `${id}`) , {
                                                title
                                });

                                dispatch(setGlobalNotification({data:"Edit success !" , error:true}));
                        } catch (error) {
                                console.log(error.code , error.message);
                                dispatch(setGlobalNotification({data:"Edit title failed !" , error:false}));
                                throw error;
                        }
        }
);

export const deleteUserPost = createAsyncThunk(
        'post/deleteUserPost',
        async({id , img} , {dispatch}) => {
                        try {   
                                const storageRef = ref(storage , `postMedia/${img}`);
                                await deleteObject(storageRef);
                                await deleteDoc(doc(firestore , 'posts' , `${id}`));
                                dispatch(setGlobalNotification({data:"Delete post success" , error:true}));              
                        } catch (error) {
                                console.log(error.code , error.message);
                                dispatch(setGlobalNotification({data:"Delete post failed !" , error:false}));
                                throw error; 
                        }
        }
)

export const queryPaginate = createAsyncThunk(
        'post/queryPaginate',
        async() => {
                        try {
                                const next = query(postCollection , orderBy("createdAt" , 'desc') , startAfter(lastVisible) , limit(4));
                                const nextSnapshots = await getDocs(next);
                                const nextData = nextSnapshots.docs.map((doc) => ({...doc.data() , id:doc.id}));
                                lastVisible = nextSnapshots.docs[nextSnapshots.docs.length - 1];
                                if(nextData.length !== 0){
                                        return {
                                                data:[...nextData],
                                                end:false
                                        }
                                }else{
                                        return {
                                                data:[],
                                                end:true
                                        }
                                }

                        } catch (error) {
                                console.log(error.code , error.message);
                                throw error;
                        }
        }
);

export const firstPaginate = createAsyncThunk(
        'post/firstPaginate',
        async() => {
                        try {
                                const first = query(postCollection , orderBy("createdAt" , "desc") , limit(4));
                                const documentSnapshots = await getDocs(first);
                                const getFirstData = documentSnapshots.docs.map((doc) => ({...doc.data() , id:doc.id}));
                                lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
                                return getFirstData;
                        } catch (error) {
                                console.log(error.code , error.message);
                                throw error;
                        }
        }
);