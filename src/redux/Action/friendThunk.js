import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection , getDocs } from 'firebase/firestore';
import { firestore } from '../../config/firebase';

const usersRef = collection(firestore , 'users');


export const getAllUsers = createAsyncThunk(
        'friend/getAllUsers',
        async({userUsername}) => {
                    try {
                            const querySnapshot = await getDocs(usersRef);
                            const data = querySnapshot.docs.map((doc) => ({...doc.data() , id:doc.id}));
                            const filterOwn = data.filter((doc) => doc.username !== userUsername);
                            return filterOwn;
                    } catch (error) {
                            console.log(error.code , error.message);
                            throw error;
                    }
        }
);
