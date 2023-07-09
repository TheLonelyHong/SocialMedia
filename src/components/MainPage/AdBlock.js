import React from 'react';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveFriend , extractUserDataOut } from '../../redux/Action/userThunk';
import { auth } from '../../config/firebase';
import { getAllPosts } from '../../redux/Action/postThunk';
import { convertTimestamp } from '../../utils/tools';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const AdBlock = () => {

      const user = useSelector(state => state.user);
      const post = useSelector(state => state.post);
      const dispatch = useDispatch();

      const removeFriendTask = (userUid , userUsername , userImg) => {
            const ownUsername = user.current.username;
            const ownUid = user.current.userId;
            const ownImg = user.current.profileImgUrl;
                dispatch(RemoveFriend({ownUsername , ownUid , userUsername , userUid , ownImg , userImg}))
                    .then(() => {
                            dispatch(getAllPosts({num:post.allPosts.length}));
                            dispatch(extractUserDataOut({email:auth.currentUser.email}));
                    });
     }

  return (
    <>
      {
            user.current ? 
            <>
                  {
                  user.current && user.current.createdAt? 
                        <>
                              <div className='adBlock-background'>
                                    <div className='p-3'>
                                          <div className='d-flex gap-1 justify-content-center align-items-center'>
                                                <HandshakeIcon className='adBlock-icon'/>
                                                <div>
                                                      <span className='nunito-family nunito-300-sm'> Congrats , you created this account at <br/>
                                                            {convertTimestamp(user.current.createdAt.seconds , user.current.createdAt.nanoseconds)}
                                                      </span>
                                                </div>
                                          </div>
                                    </div>
                              </div>          
                        </>
                  : null
                  }
                  {
                        user.current.friendList && user.current.friendList.length !== 0 ? 
                              <>
                                    <div className='adBlock-background mt-3 p-3'>
                                          <h5 className='nunito-family nunito-300-sm border-bottoms'>FriendList</h5>
                                          <div className='mt-4'>
                                                {
                                                      user.current.friendList.map((item) => (
                                                            <div className='friendlist-item d-flex justify-content-between align-items-center mb-3' key={item.uid}>
                                                                        <div className='d-flex gap-2 align-items-center'>
                                                                              <LazyLoadImage
                                                                                    className='friendlist-img'
                                                                                    draggable={false}
                                                                                    src={`${item.img}`}
                                                                                    effect='blur'
                                                                              />
                                                                              <h5 className='nunito-300-sm font-size-nunito'>{item.username}</h5>
                                                                        </div>
                                                                        <button className='friendlist-icon-remove' type='button' onClick={() => removeFriendTask(item.uid , item.username , item.img)}>
                                                                                    <PersonRemoveAlt1Icon titleAccess='Remove Friend'/>
                                                                        </button>
                                                            </div>
                                                                        
                                                      ))
                                                }
                                    </div>
                                    </div> 
                              </>
                        : 
                              <>    
                                    <div className='adBlock-background mt-3 p-3'>
                                                <h5 className='nunito-family nunito-300-sm border-bottoms'>FriendList</h5>
                                                <div className='mt-4'>
                                                      <h3 className='nunito-family nunito-300-sm'>Add some friends</h3>
                                                </div>
                                    </div>
                              </>
                  }                   
            </>
            : 
            null
      }
    </>
  )
}

export default AdBlock