import React from 'react';
import Navbar from '../MainPage/Navbar';
import uploadIcon from '../../assets/uploadIcon.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import UserPosts from './UserPosts';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useSelector } from 'react-redux';

const UserProfile = () => {

  const user = useSelector(state => state.user);

  return (
  <>
    {
      user.current ? 
          <div className='userProfile-background'>
                  <Navbar/>
                  <div className='padding-top-enhance width-50'>
                          <div className='w-100 position-relative'>
                                      <LazyLoadImage
                                          width={"100%"}
                                          src={`${user.current.backgroundImgUrl === "" ? uploadIcon : user.current.backgroundImgUrl}`}
                                          effect='blur'
                                          draggable={false}
                                          className='userProfile-background-img'
                                      />
                                      <div>
                                          <LazyLoadImage
                                              src={`${user.current.profileImgUrl}`}
                                              effect='blur'
                                              draggable={false}
                                              className='userProfile-user-img'
                                          />
                                      </div>
                          </div>
                          <div className='mt-5'>
                                  <h2 className='text-center nunito-family nunito-300-sm'>You can delete and edit your own post here</h2>
                                  <UserPosts/>
                          </div>
                  </div>
            </div>
      : null
    }
  </>
  )
}

export default UserProfile