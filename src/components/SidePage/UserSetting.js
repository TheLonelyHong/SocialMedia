import React , { useState } from 'react';
import Navbar from '../MainPage/Navbar';
import SettingsIcon from '@mui/icons-material/Settings';
import ImageUploading from './ImageUploading';
import { useDispatch, useSelector } from 'react-redux';
import { updateNickname , updateDesc , updateUserPassword , updateUserBackground } from '../../redux/Action/userThunk';
import { showMsg , Loader } from '../../utils/tools';

const UserSetting = () => {

    const [imgUpload , setImgUpload] = useState([]);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleImage = (imageList , addUpdateIndex) => {
                setImgUpload(imageList);
    }

    const handleBackgroundImgUpload = (oldBackground , userUsername) => {
                if(imgUpload.length === 0){
                                showMsg("ERROR" , "Please upload an image before submitting !");
                                return;
                }

                dispatch(updateUserBackground({oldBackground , newBackground:imgUpload[0].file , userUsername}));
    }

    const handleNickname = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const formProps = Object.fromEntries(formData);
            const {nickname} = formProps;
            if(!nickname){
                        showMsg("ERROR" , "Please enter a nickname before update !");
                        return;
            }

            dispatch(updateNickname({username: user.current.username , nickname}));
    }

    const handleChangePassword = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const formProps = Object.fromEntries(formData);
            const {newPassword , confirmPassword} = formProps;
            if(!newPassword || !confirmPassword){
                                showMsg("ERROR" , "Please enter your new password before update !");
                                return;
            }

            if(newPassword !== confirmPassword){
                                showMsg("ERROR" , "New password not match");
                                return;
            }

            dispatch(updateUserPassword({newPassword}));
    }

    const handleDesc = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const formProps = Object.fromEntries(formData);
            const {description} = formProps;
            if(!description){
                        showMsg("ERROR" , "Please enter your description before update!");
                        return;
            }
            dispatch(updateDesc({username:user.current.username , desc:description}));
    }

  return (
        <>
        {
                user.current ? 
                        <div className='userSetting-background'>
                                        <Navbar/>
                                        <div className='padding-top-enhance width-50'>
                                                <h1 className='nunito-family nunito-300-sm margin-left-sm'>
                                                        Setting <span><SettingsIcon className='animation-rotate'/></span>
                                                </h1>
                                                <div className='userSettingBlock-background p-3 mt-4'>
                                                        <h2 className='nunito-family nunito-300-sm'>Change Nickname ?</h2>
                                                        <form onSubmit={handleNickname}>
                                                                <div>
                                                                        <label className='form-label nunito-family nunito-300-sm'>Nickname : </label>
                                                                        <div className='form-floating'>
                                                                                <input type='text' className='form-control userSettingNickname' id='floatingNickname' placeholder='Nickname' name='nickname'/>
                                                                                <label htmlFor='floatingNickname' className='nunito-family nunito-200-sm'>Nickname</label>
                                                                        </div>
                                                                </div>
                                                                <button type='submit' className='btn btn-primary mt-2'>Update Nickname</button>
                                                        </form>
                                                        {
                                                                user.nickLoading ? 
                                                                        <>
                                                                                <Loader/>
                                                                        </>
                                                                : null
                                                        }
                                                </div>
                                                <div className='userSettingBlock-background p-3 mt-4'>
                                                        <h2 className='nunito-family nunito-300-sm'>Change Password ?</h2>
                                                        <form onSubmit={handleChangePassword}>
                                                                <div>
                                                                        <label className='form-label nunito-family nunito-300-sm'>New Password : </label>
                                                                        <div className='form-floating'>
                                                                                <input type='password' className='form-control userSettingPassword' id='floatingNew' placeholder='New Password' name='newPassword'/>
                                                                                <label htmlFor='floatingNew' className='nunito-family nunito-200-sm'>New Password</label>
                                                                        </div>
                                                                </div>
                                                                <div className='mt-2'>
                                                                        <label className='form-label nunito-family nunito-300-sm'> Confirm New Password : </label>
                                                                        <div className='form-floating'>
                                                                                <input type='password' className='form-control userSettingPassword' id='floatingConfirm' placeholder='Confirm Password' name='confirmPassword'/>
                                                                                <label htmlFor='floatingConfirm' className='nunito-family nunito-200-sm'>Confirm Password</label>
                                                                        </div>
                                                                </div>
                                                                <button type='submit' className='btn btn-primary mt-2'>Update Password</button>
                                                        </form>
                                                        {
                                                                user.passLoading ? 
                                                                        <>
                                                                                <Loader/>
                                                                        </>
                                                                : null
                                                        }
                                                </div>
                                                <div className='userSettingBlock-background p-3 mt-4'>
                                                        <h2 className='nunito-family nunito-300-sm'>Change Description ?</h2>
                                                        <form onSubmit={handleDesc}>
                                                                <div>
                                                                        <label className='form-label nunito-family nunito-300-sm'>Description : </label>
                                                                        <div className='form-floating'>
                                                                                <textarea type='text' className='form-control userSettingDesc' id='floatingDesc' placeholder='Description here' name='description'></textarea>
                                                                                <label htmlFor='floatingDesc' className='nunito-family nunito-200-sm'>Description here</label>
                                                                        </div>
                                                                </div>
                                                                <button type='submit' className='btn btn-primary mt-2'>Update Description</button>
                                                        </form>
                                                        {
                                                                user.descLoading ? 
                                                                        <>
                                                                                <Loader/>
                                                                        </>
                                                                : null
                                                        }
                                                </div>
                                                <div className='userSettingBlock-background p-3 mt-4'>
                                                        <h2 className='nunito-family nunito-300-sm'>Change Background Image ?</h2>
                                                        <ImageUploading handleImg = {handleImage} img={imgUpload}/>
                                                        {
                                                        imgUpload.length !== 0 ? 
                                                                <button type='button' className='btn btn-primary' onClick={() => handleBackgroundImgUpload(user.current.backgroundImg , user.current.username)}>Upload</button>
                                                        : null
                                                        }
                                                        {
                                                                user.backLoading ? 
                                                                        <>
                                                                                <Loader/>
                                                                        </>
                                                                : null
                                                        }
                                                </div>
                                        </div>
                                </div>             
                : null
        }
        </>
  )
}

export default UserSetting