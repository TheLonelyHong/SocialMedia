import React, { useEffect } from 'react';
import Navbar from '../MainPage/Navbar';
import CardBoxFriend from './CardBoxFriend';
import { useDispatch , useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/Action/friendThunk';

const FriendListPage = () => {

  const dispatch = useDispatch();
  const friend = useSelector(state => state.friend);
  const user = useSelector(state => state.user);

  useEffect(() => {
        if(user.current.username){
           dispatch(getAllUsers({userUsername: user.current.username}));
        }
          // eslint-disable-next-line
  } , [user.current.username]);

  return (
    <>
      {
        user.current && friend.allFriends ? 
            <div className='friendListPage-background'>
                      <Navbar/>
                      <div className='padding-top-enhance width-50'>
                          <h2 className='nunito-family nunito-300-sm'>Available friends</h2>
                          <div className='d-flex gap-4 flex-wrap justify-content-center'>
                              {friend.allFriends? 
                                  <>
                                      {friend.allFriends.map((item) => (
                                              <CardBoxFriend key={item.id} friend = {item}/>
                                      ))}
                                  </>
                              : null}
                          </div>
                      </div>
              </div>        
        : null
      }
    </>
  )
}

export default FriendListPage