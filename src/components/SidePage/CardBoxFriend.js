import React from 'react';
import uploadIcon from '../../assets/uploadIcon.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LinkContainer } from 'react-router-bootstrap';
import { extractUserDataOut , AddFriend , RemoveFriend } from '../../redux/Action/userThunk';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../config/firebase';

const CardBoxFriend = ({friend}) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const checkFriendSystem = (username) => {
            const userFriendlist = user.current.friendList.filter((item) => item.username === username);
            if(userFriendlist.length !== 0){
                    return false;
            }
            return true;
    };

    const addFriendTask = (userUsername , userUid , userImg) => {
                const ownUsername = user.current.username;
                const ownUid = user.current.userId;
                const ownImg = user.current.profileImgUrl;
                dispatch(AddFriend({ownUsername , ownUid , userUsername , userUid , ownImg , userImg}))
                        .then(() => {
                                dispatch(extractUserDataOut({email: auth.currentUser.email}));
                        });
    }

    const removeFriendTask = (userUsername , userUid , userImg) => {
        const ownUsername = user.current.username;
        const ownUid = user.current.userId;
        const ownImg = user.current.profileImgUrl;
        dispatch(RemoveFriend({ownUsername , ownUid , userUsername , userUid , ownImg , userImg}))
                .then(() => {
                        dispatch(extractUserDataOut({email: auth.currentUser.email}));
                });
    }

  return (
    <>
        {
            user.current.friendList ? 
                    <div className='card friendList-card'>
                            <LazyLoadImage
                                width={"100%"}
                                height={"300px"}
                                effect='blur'
                                src={`${uploadIcon}`}
                            />
                            <div className='position-relative'>
                                    <LazyLoadImage
                                        className='friendList-profile-img'
                                        effect='blur'
                                        src={`${friend.profileImgUrl}`}
                                    />
                            </div>
                            <div className='card-body'>
                                    <h5 className='card-title'>{friend.username}</h5>
                                    <p className='card-text'>
                                            {
                                                friend.description !== "" ? 
                                                <>    
                                                    {friend.description} 
                                                </>
                                                : 
                                                <>
                                                    No description yet
                                                </>
                                            }
                                    </p>
                                    <div>
                                            <LinkContainer to="/main">
                                                    <button type='button' className='btn btn-info'>Details</button>
                                            </LinkContainer>
                                            {
                                                checkFriendSystem(friend.username) ? 
                                                <button type='button' className='btn btn-primary margin-left-sm' onClick={() => addFriendTask(friend.username , friend.userId , friend.profileImgUrl)}>
                                                        Add Friend
                                                </button>
                                                : 
                                                <button type='button' className='btn btn-danger margin-left-sm' onClick={() => removeFriendTask(friend.username , friend.userId , friend.profileImgUrl)}>
                                                        Remove Friend
                                                </button>                                                
                                            }
                                    </div>
                            </div>
                    </div>            
            : null
        }
    </>
  )
}

export default CardBoxFriend