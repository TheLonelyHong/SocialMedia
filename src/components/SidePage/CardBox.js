import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { RemoveFriend } from '../../redux/Action/userThunk';
import { extractUserDataOut } from '../../redux/Action/userThunk';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../config/firebase';

const CardBox = ({friend}) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const removeFriendTask = (userUid , userUsername , userImg) => {
                const ownUsername = user.current.username;
                const ownUid = user.current.userId;
                const ownImg = user.current.profileImgUrl;
                dispatch(RemoveFriend({ownUsername , ownUid , userUsername , userUid , ownImg , userImg}))
                   .then(() => {
                            dispatch(extractUserDataOut({email:auth.currentUser.email}));
                   });
    }

  return (
            <>
                {
                    user.current ? 
                        <div className='card friendList-card'>
                                        <LazyLoadImage
                                            className='card-img-top friendList-card-img'
                                            width={"100%"}
                                            height={"300px"}
                                            effect='blur'
                                            src={`${friend.img}`}
                                        />
                                    <div className='card-body'>
                                            <h5 className='card-title'>Nickname: {friend.username}</h5>
                                            <div>
                                                <button type='button' className='btn btn-danger margin-left-sm' onClick={() => removeFriendTask(friend.uid , friend.username , friend.img)}>
                                                    Remove Friend
                                                </button>
                                            </div>
                                    </div>
                        </div>
                    : null
                }
            </>
  )
}

export default CardBox