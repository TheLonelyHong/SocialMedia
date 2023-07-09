import React, { useState } from 'react';
import { editUserTitle , getOwnUserPost , deleteUserPost } from '../../redux/Action/postThunk';
import { useDispatch } from 'react-redux';
import { showMsg } from '../../utils/tools';
import { auth } from '../../config/firebase';


const EditDelete = ({id , img}) => {

    const [showEdit , setShowEdit] = useState(false);

    const handleClose = () => setShowEdit(false);
    const handleEdit = () => setShowEdit(true);
    const dispatch = useDispatch();

    const handleChangeEdit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const formProps = Object.fromEntries(formData);
            const { editText } = formProps;
            if(!editText){
                    showMsg("ERROR" , "Please enter something before submit !");
                    return;
            }

            dispatch(editUserTitle({id , title:editText}))
                .then(() => {
                        dispatch(getOwnUserPost({email:auth.currentUser.email}));
                });
    }

    const deletePostTask = () => {
                const imgName = `${img}.${auth.currentUser.uid}`;
                dispatch(deleteUserPost({id , img:imgName}))
                    .then(() => {
                            dispatch(getOwnUserPost({email:auth.currentUser.email}));
                    })
    }

  return (
    <>
        <div className='w-100 mt-2'>
                <div className='w-100 btn-group'>
                        {
                            showEdit ? 
                            <button type='button' className='btn btn-primary w-50' onClick={() => handleClose()}>Close Edit</button>
                            : 
                            <button type='button' className='btn btn-primary w-50' onClick={() => handleEdit()}>Edit</button>
                        }
                        <button type='button' className='btn btn-danger w-50' onClick={() => deletePostTask()}>Delete</button>
                </div>
                {
                    showEdit ? 
                        <>
                            <form onSubmit={handleChangeEdit} className='w-100 mt-2'>
                                        <div className='form-floating'>
                                                <textarea className='form-control' placeholder='Edit' id='floatingEdit' style={{resize:"none"}} name='editText'></textarea>
                                                <label htmlFor='floatingEdit' className='nunito-family nunito-200-sm'>Edit...</label>
                                        </div>
                                        <button type='submit' className='btn btn-info mt-2'>Edit</button>
                            </form>
                        </> 
                    : null
                }
        </div>
    </>
  )
}

export default EditDelete