import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import uploadIcon from '../../assets/uploadIcon.jpg';
import ImageUploading from 'react-images-uploading';
import { useDispatch , useSelector } from 'react-redux';
import { clearGlobal } from '../../redux/Slice/globalSlice';
import { useNavigate } from 'react-router-dom';
import { registerAccount } from '../../redux/Action/userThunk';
import Alert from 'react-bootstrap/Alert';
import { showMsg } from '../../utils/tools';
import { Loader } from '../../utils/tools';

const Register = () => {

  const [image , setImage] = useState([]);
  const notification = useSelector(state => state.global);
  const loading = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImage = (imageList , addUpdateIndex) => {
            setImage(imageList);
  }

  const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        const { email , username , password , confirmPassword } = formProps;
        if(!email || !username || !password || !confirmPassword){
                  showMsg("ERROR" , "Please fill in the basic details.");
                  return;
        }
        if(password !== confirmPassword){
                  showMsg("ERROR" , "Password not match !");
                  return;
        }
        if(image.length === 0){
                  showMsg("ERROR" , "Please upload your profile photo !");
                  return;
        }

        dispatch(registerAccount({email , username , password , imgFile:image[0].file}))
            .then((con) => {
                        if(con.type === "user/registerAccount/rejected"){
                                    navigate("/register");
                                    return;
                        }else if(con.type === "user/registerAccount/fulfilled"){
                                navigate("/main");
                                return;
                        }else{
                              navigate("/register");
                              return;
                        }
            })
  }

  useEffect(() => {
            let {error , global} = notification;
            if(error === true){
                        showMsg("SUCCESS" , global);
                        dispatch(clearGlobal());
            }else if(error === false){
                        showMsg("ERROR" , global);
                        dispatch(clearGlobal());
            }
            // eslint-disable-next-line
  } , [notification]);

  return (
          <div className='register-container'>
              <div className='register-container-one'>
                      <h1 className='font-bigger'>Welcome to MichealLook</h1>
              </div>
              <div className='register-container-two'>
                    <div className='register-container-box nunito-family'>
                          <form onSubmit={handleSubmit}>
                                <div>
                                      <label htmlFor='email' className='form-label nunito-400'>Email: </label>
                                      <div className='form-floating'>
                                          <input type='email' className='form-control' id='floatingInput' placeholder='yourname@example.com' name='email'/>
                                          <label htmlFor='floatingInput'>Email address</label>
                                      </div>
                                </div>
                                <div className='mt-2'>
                                      <label htmlFor='username' className='form-label nunito-400'>Username: </label>
                                      <div className='form-floating'>
                                          <input type='text' className='form-control' id='floatingUsername' placeholder='example' name='username'/>
                                          <label htmlFor='floatingUsername'>Username</label>
                                      </div>
                                </div>
                                <div className='mt-2'>
                                      <label htmlFor='password' className='form-label nunito-400'>Password: </label>
                                      <div className='form-floating'>
                                          <input type='password' className='form-control' id='floatingPassword' placeholder='******' name='password'/>
                                          <label htmlFor='floatingPassword'>Password</label>
                                      </div>
                                </div>
                                <div className='mt-2'>
                                      <label htmlFor='confirmPassword' className='form-label nunito-400'>Confirm Password: </label>
                                      <div className='form-floating'>
                                          <input type='password' className='form-control' id='floatingConfirm' placeholder='******' name='confirmPassword'/>
                                          <label htmlFor='floatingConfirm'>Confirm Password</label>
                                      </div>
                                </div>
                                <div className='mt-3'>
                                          <div className='w-100 d-flex justify-content-start align-items-center gap-2'>
                                                      <img src={`${uploadIcon}`} alt='no icon loaded' className='register-image'/>
                                                      <ImageUploading
                                                            value={image}
                                                            onChange={handleImage}
                                                            maxNumber={1}
                                                            dataURLKey='data_url'
                                                            acceptType={["jpg" , "png"]}
                                                            maxFileSize={5000000}
                                                      >
                                                                  {({
                                                                        imageList,
                                                                        onImageUpload,
                                                                        onImageRemoveAll,
                                                                        errors
                                                                  }) => (
                                                                        <>
                                                                              <button type='button' className='btn btn-secondary' onClick={onImageUpload}>Upload Image</button>
                                                                              {
                                                                                    errors && errors.maxFileSize ? 
                                                                                          <Alert variant='danger'>File size cannot exceed 4Mb , please upload again</Alert>
                                                                                    : null
                                                                              }
                                                                              {
                                                                                    errors && errors.acceptType ? 
                                                                                          <Alert variant='danger'>Only JPG and PNG are accepted , please upload again</Alert>
                                                                                    : null
                                                                              }
                                                                              {
                                                                                    errors && errors.maxNumber ? 
                                                                                          <>
                                                                                                {imageList && imageList.length >= 1 ? 
                                                                                                      <Alert variant='danger'>Only 1 image accepted !</Alert>
                                                                                                : null}
                                                                                                {
                                                                                                      imageList.length !== 0 && imageList.length < 2 ? 
                                                                                                            <button
                                                                                                                  type='button'
                                                                                                                  className='btn btn-warning'
                                                                                                                  onClick={onImageRemoveAll}
                                                                                                            >Please click me!</button>
                                                                                                      : null
                                                                                                }
                                                                                          </>
                                                                                    :
                                                                                          <>
                                                                                                {imageList.map((image , index) => (
                                                                                                            <div key={index}>
                                                                                                                  <img src={image['data_url']} alt='no img uploaded' className='register-image'/>
                                                                                                            </div>
                                                                                                ))}
                                                                                          </>
                                                                              }
                                                                        </>
                                                                  )}
                                                      </ImageUploading>
                                          </div>      
                                </div>
                                <div className='w-100 d-flex justify-content-end align-items-center mt-3'>
                                      <button type='submit' className='btn btn-primary width-changed'>Sign Up</button>
                                </div>
                                {
                                    loading.loading ? 
                                          <>
                                                <Loader/>
                                          </>
                                    : null
                                }
                          </form>
                          <div className='w-100 d-flex justify-content-center align-items-center mt-3'>
                                        <LinkContainer to="/">
                                              <p className='login-link'>Want to sign In ?</p>
                                        </LinkContainer>
                          </div>
                    </div>
              </div>
          </div>
  )
}

export default Register