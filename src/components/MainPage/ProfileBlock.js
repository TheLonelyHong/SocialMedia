import React from 'react';
import Figure from 'react-bootstrap/Figure';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProfileBlock = () => {

  const user = useSelector(state => state.user);

  return (
      <>
          {
              user.current ? 
                  <div className='profileBlock-background'>
                      <div className='w-100 d-flex justify-content-center align-items-center pt-2'>
                            <Figure>
                                  <LazyLoadImage
                                      src={`${user.current.profileImgUrl}`}
                                      className='profile-img'
                                      draggable={false}
                                      effect='blur'
                                  />
                            </Figure>
                      </div>
                      <div className='w-100 p-3'>
                              <h5 className='text-center nunito-400'>Bio</h5>
                              <hr/>
                              <h6 className='delicious-font'>Nickname: {user.current.nickname}</h6>
                              <h6 className='delicious-font'>Desc: {user.current.description === "" ? "Please update your description at setting" : user.current.description}</h6>
                      </div>
                  </div>
              : null
          }
      </>
  )
}

export default ProfileBlock