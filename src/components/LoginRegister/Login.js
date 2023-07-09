import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch , useSelector } from 'react-redux';
import { loginUser } from '../../redux/Action/userThunk';
import { useNavigate } from 'react-router-dom';
import { clearGlobal } from '../../redux/Slice/globalSlice';
import { Loader, showMsg } from '../../utils/tools';

const Login = () => {

  const notification = useSelector(state => state.global);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        const {email , password} = formProps;
        if(!email || !password){
                  showMsg("ERROR" , "Please fill in login details");
                  return;
        }

        dispatch(loginUser({email , password}))
            .then((con) => {
                        if(con.type === "user/loginUser/rejected"){
                                    navigate("/");
                                    return;
                        }else if(con.type === "user/loginUser/fulfilled"){
                                    navigate("/main");
                                    return;
                        }else{
                                    navigate("/");
                                    return;
                        }
            })
  }

  useEffect(() => {
            const {global , error} = notification;
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
    <div className='login-container'>
          <div className='login-container-one'>
                  <h1 className='font-bigger'>Welcome to MichealLook</h1>
          </div>
          <div className='login-container-two'>
                <div className='login-container-box nunito-family'>
                      <form onSubmit={handleSubmit}>
                            <div>
                                  <label htmlFor='email' className='form-label nunito-400'>Email: </label>
                                  <div className='form-floating'>
                                      <input type='email' className='form-control' id='floatingInput' placeholder='yourname@example.com' name='email'/>
                                      <label htmlFor='floatingInput'>Email address</label>
                                  </div>
                            </div>
                            <div className='mt-2'>
                                  <label htmlFor='password' className='form-label nunito-400'>Password: </label>
                                  <div className='form-floating'>
                                      <input type='password' className='form-control' id='floatingPassword' placeholder='******' name='password'/>
                                      <label htmlFor='floatingPassword'>Password</label>
                                  </div>
                            </div>
                            <div className='w-100 d-flex justify-content-end align-items-center mt-3'>
                                  <button type='submit' className='btn btn-primary width-changed'>Sign In</button>
                            </div>
                      </form>
                      {
                        user.loading ? 
                              <>
                                    <Loader/>
                              </>
                        : null
                      }
                      <div className='w-100 d-flex justify-content-center align-items-center mt-3'>
                                    <LinkContainer to="/register">
                                          <p className='register-link'>Don't have account ? Register here</p>
                                    </LinkContainer>
                      </div>
                </div>
          </div>
    </div>
  )
}

export default Login