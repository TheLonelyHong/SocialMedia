import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc , setDoc , collection , query , where , getDocs , arrayUnion , updateDoc , arrayRemove } from 'firebase/firestore';
import { ref , uploadBytes , getDownloadURL, deleteObject } from 'firebase/storage';
import { User , userConverter } from '../../utils/tools';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut , updatePassword } from 'firebase/auth';
import { firestore , auth , storage } from '../../config/firebase';
import { setGlobalNotification } from '../Slice/globalSlice';

const usersRef = collection(firestore , 'users');

const checkUsernameAvailability = async(username) => {
        const q = query(usersRef , where("username" , "==" , `${username}`));
        const querySnapshot = await getDocs(q);
        if(querySnapshot._snapshot.docChanges.length !== 0){
                return false;
        }else{
                return true;
        }
}

export const registerAccount = createAsyncThunk(
        'user/registerAccount',
        async({username , email , password , imgFile} , {dispatch}) => {
                    try {
                                    const availbility = await checkUsernameAvailability(username);
                                    if(availbility === false){
                                                dispatch(setGlobalNotification({data:"Username has been used !" , error:false}));
                                                return;
                                    }else{
                                              await createUserWithEmailAndPassword(auth , email , password);
                                              const storageRef = ref(storage , `socialMedia/${imgFile.name}.${auth.currentUser.uid}`);
                                              await uploadBytes(storageRef , imgFile);                                             
 					      const profileImgUrl = await getDownloadURL(storageRef);
                                              const registerRef = doc(firestore , "users" , `${username.trim()}`).withConverter(userConverter); 
                                              await setDoc(registerRef , new User(auth.currentUser.uid , username , email , profileImgUrl , `${imgFile.name}.${auth.currentUser.uid}`));
                                              dispatch(setGlobalNotification({data:"Register Success !" , error:true}));
                                    }
                    } catch (error) {
                            console.log(error.code , error.message);
                            switch(error.code){
                                    case 'auth/email-already-in-use':
                                        dispatch(setGlobalNotification({data:`Email taken` , error:false}));
                                        break;
                                    default:
                                        dispatch(setGlobalNotification({data:"Register failed" , error:false}));

                            }
                            throw error;
                    }
        }
);

export const extractUserDataOut = createAsyncThunk(
        'user/extractUserDataOut',
        async({email}) => {
                try {
                        const q = query(collection(firestore , 'users') , where("email" , "==" , `${email}`));
                        const querySnapshot = await getDocs(q);
                        const filteredData = querySnapshot.docs.map((doc) => ({...doc.data() , id:doc.id}))
                        return {
                                data:filteredData[0]
                        };
                } catch (error) {
                        console.log(error.code , error.message);
                        throw error;
                }
        }
);

export const loginUser = createAsyncThunk(
        'user/loginUser',
        async({email , password} , {dispatch}) => {
                try {
                        await signInWithEmailAndPassword(auth , email , password);
                        dispatch(setGlobalNotification({data:"Sign in successfully" , error:true}));
                } catch (error) {
                        console.log(error.code , error.message);
                        switch(error.code){
                                case 'auth/user-not-found':
                                        dispatch(setGlobalNotification({data:"User not found !" , error:false}));
                                        break;
                                case 'auth/wrong-password':
                                        dispatch(setGlobalNotification({data:"Wrong password !" , error:false}));
                                        break;
                                default:
                                        dispatch(setGlobalNotification({data:"Sign In Failure !" , error:false}));

                        }
                        throw error;
                }
        }
);

export const logoutUser = createAsyncThunk(
        'user/logoutUser',
        async() => {
                        try {
                                await signOut(auth);                             
                        } catch (error) {
                                console.log(error.code , error.message);
                                throw error;
                        }
        }
);

export const AddFriend = createAsyncThunk(
        'user/AddFriend',
        async({ownUsername , ownUid , userUsername , userUid , ownImg , userImg} , {dispatch}) => {
                        try {   
                                await updateDoc(doc(firestore , 'users' , `${ownUsername}`),{
                                                friendList:arrayUnion({
                                                        username:userUsername,
                                                        uid:userUid,
                                                        img:userImg
                                                })
                                });

                                await updateDoc(doc(firestore , 'users' , `${userUsername}`),{
                                                friendList:arrayUnion({
                                                        username:ownUsername,
                                                        uid:ownUid,
                                                        img:ownImg
                                                })
                                })

                                dispatch(setGlobalNotification({data:"Friend added success" , error:true}));
                        } catch (error) {
                                console.log(error.code , error.message);
                                dispatch(setGlobalNotification({data:"Friend added failure !" , error:false}));
                                throw error;
                        }
        }
);

export const RemoveFriend = createAsyncThunk(
        'user/RemoveFriend',
        async({ownUsername , ownUid , userUsername , userUid , ownImg , userImg} , {dispatch}) => {
                        try {
                                await updateDoc(doc(firestore , 'users' , `${ownUsername}`) , {
                                                friendList:arrayRemove({
                                                        username:userUsername,
                                                        uid:userUid,
                                                        img:userImg
                                                })
                                });

                                await updateDoc(doc(firestore , 'users' , `${userUsername}`) , {
                                                friendList:arrayRemove({
                                                         username:ownUsername,
                                                         uid:ownUid,
                                                         img:ownImg    
                                                })
                                })

                                dispatch(setGlobalNotification({data:"Friend deleted success" , error:true}));
                        } catch (error) {
                                console.log(error.code , error.message);
                                dispatch(setGlobalNotification({data:"Friend delete failure !" , error:false}));
                                throw error;
                        }
        }
);

export const updateNickname = createAsyncThunk(
                'user/updateNickname',
                async({username , nickname} , {dispatch}) => {
                                try {
                                        await updateDoc(doc(firestore , 'users' , `${username}`),{
                                                        nickname
                                        })
                                        dispatch(setGlobalNotification({data:"Update nickname success !" , error:true}));
                                } catch (error) {
                                        console.log(error.code , error.message);
                                        dispatch(setGlobalNotification({data:"Update nickname failure !" , error:false}));
                                        throw error;
                                }
                }
);

export const updateDesc = createAsyncThunk(
                'user/updateDesc',
                async({username , desc} , {dispatch}) => {
                                try {
                                        await updateDoc(doc(firestore , 'users' , `${username}`) ,{
                                                description:desc
                                        })
                                        dispatch(setGlobalNotification({data:"Update description success" , error:true}));
                                } catch (error) {
                                        console.log(error.code , error.message);
                                        dispatch(setGlobalNotification({data:"Update description failure !" , error:false}));
                                        throw error;
                                }
                }
);

export const updateUserPassword = createAsyncThunk(
                'user/updateUserPassword',
                async({newPassword} , {dispatch}) => {
                                try {
                                         await updatePassword(auth.currentUser , newPassword);
                                         dispatch(setGlobalNotification({data:"Update password success" , error:true}));
                                } catch (error) {
                                        console.log(error.code , error.message);
                                        switch(error.code){
                                                        case 'auth/requires-recent-login':
                                                                dispatch(setGlobalNotification({data:"Due to sensitive information , please re-login again to proceed" , error:false}));
                                                                break;
                                                        default:
                                                                dispatch(setGlobalNotification({data:"Update password failure !" , error:false}));
                                        }
                                        throw error;
                                }
                }
);

export const updateUserBackground = createAsyncThunk(
                'user/updateUserBackground',
                async({oldBackground , newBackground , userUsername} , {dispatch}) => {
                                try {
                                        if(oldBackground !== ""){
                                                        const deleteRef = ref(storage , `backgroundMedia/${oldBackground}`);
                                                        await deleteObject(deleteRef);
                                                        const userBackgroundRef = ref(storage , `backgroundMedia/${newBackground.name}.${auth.currentUser.uid}`);
                                                        await uploadBytes(userBackgroundRef , newBackground);
                                                        const newBackUrl = await getDownloadURL(userBackgroundRef);
                                                        await updateDoc(doc(firestore , 'users' , `${userUsername}`),{
                                                                        backgroundImg:`${newBackground.name}.${auth.currentUser.uid}`,
                                                                        backgroundImgUrl:newBackUrl
                                                        })
                                                        dispatch(setGlobalNotification({data:"Update background success !" , error:true}));                                                        
                                        }else{
                                                const userBackgroundRef = ref(storage , `backgroundMedia/${newBackground.name}.${auth.currentUser.uid}`);
                                                await uploadBytes(userBackgroundRef , newBackground);
                                                const newBackUrl = await getDownloadURL(userBackgroundRef);
                                                await updateDoc(doc(firestore , 'users' , `${userUsername}`),{
                                                                backgroundImg:`${newBackground.name}.${auth.currentUser.uid}`,
                                                                backgroundImgUrl:newBackUrl
                                                })
                                                dispatch(setGlobalNotification({data:"Update background success !" , error:true}));
                                        }

                                } catch (error) {
                                        console.log(error.code , error.message);
                                        dispatch(setGlobalNotification({data:"Update background failure !" , error:false}));
                                        throw error;
                                }
                }
);

