import React from 'react';
import Navbar from '../MainPage/Navbar';
import CardBox from './CardBox';
import { useSelector } from 'react-redux';

const UserFriendList = () => {

        const user = useSelector(state => state.user);

  return (
        <>
                {
                        user.current ? 
                                <div className='userFriendList-background'>
                                        <Navbar/>
                                        <div className='padding-top-enhance width-50'>
                                                <h2 className='nunito-family nunito-300-sm'>Your friends</h2>
                                                <div className='d-flex gap-4 flex-wrap justify-content-center'>
                                                        {user.current.friendList && user.current.friendList.length !== 0 ? 
                                                        <>
                                                                {user.current.friendList.map((item) => (
                                                                        <CardBox key={item.uid} friend={item}/>
                                                                ))}
                                                        </>
                                                        : 
                                                        <>
                                                                <h3 className='nunito-family nunito-300-sm'>No friends yet</h3>
                                                        </>
                                                        }
                                                </div>
                                        </div>
                                </div>
                        : null
                }
        </>
  )
}

export default UserFriendList