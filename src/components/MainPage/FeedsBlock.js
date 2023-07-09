import React, { useEffect } from 'react';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import LikesComment from './LikesComment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector , useDispatch } from 'react-redux';
import { firstPaginate , queryPaginate , getAllPosts } from '../../redux/Action/postThunk';
import { AddFriend , extractUserDataOut , RemoveFriend } from '../../redux/Action/userThunk';
import { auth } from '../../config/firebase';
import { convertTimestamp , Loader} from '../../utils/tools';
import 'react-lazy-load-image-component/src/effects/blur.css';

const FeedsBlock = () => {

    const dispatch = useDispatch();
    const post = useSelector(state => state.post);
    const user = useSelector(state => state.user);

    useEffect(() => {
            dispatch(firstPaginate());
            // eslint-disable-next-line
    },[]);

    const loadMorePost = () => {
            dispatch(queryPaginate());
    };

    const removeAddIconOrAddIcon = (inputUsername) => {
                    const userUsername = user.current.username;
                    if(userUsername === inputUsername){
                            return false;
                    }
                    return true;  
    };

    const addFriendTask = (userUid , userUsername , userImg) => {
                const ownUsername = user.current.username;
                const ownUid = user.current.userId;
                const ownImg = user.current.profileImgUrl;
                dispatch(AddFriend({ownUsername , ownUid , userUsername , userUid , ownImg , userImg}))
                    .then(() => {
                            dispatch(getAllPosts({num: post.allPosts.length}));
                            dispatch(extractUserDataOut({email:auth.currentUser.email}));
                    });
    }

    const checkSystem = (username) => {
                const ownFriendList = user.current.friendList.filter((doc) => doc.username === username);
                if(ownFriendList.length !== 0){
                        return false;
                }
                return true;
    }

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
            post.allPosts && user.current ? 
                <>
                    {post.allPosts.map((postListed) => (
                                            <div className='feedsBlock-background mt-4 p-2' key={postListed.id}>
                                                    <div className='d-flex justify-content-between align-items-center gap-2'>
                                                            <div className='flex-2 d-flex gap-1 align-items-center'>
                                                                <LazyLoadImage
                                                                    className='feedsBlock-profile-img'
                                                                    src={`${postListed.userImg}`}
                                                                    effect='blur'
                                                                    draggable={false}
                                                                />
                                                                <span className='margin-left-sm nunito-family nunito-200-sm'>{postListed.username}</span>
                                                            </div>
                                                            <div className='flex-4 nunito-family nunito-200-sm margin-left-sm'>
                                                                ~ {convertTimestamp(postListed.createdAt.seconds , postListed.createdAt.nanoseconds)}
                                                            </div>
                                                            <div className='flex-1'>
                                                                    {
                                                                        removeAddIconOrAddIcon(postListed.username) ? 
                                                                        <>
                                                                            {
                                                                                user.current.friendList && checkSystem(postListed.username) ? 
                                                                                <button type='button' className='friendlist-icon-add' title='Add Friend' onClick={() => addFriendTask(postListed.createdUid , postListed.username , postListed.userImg)}>
                                                                                        <PersonAddAlt1Icon/>
                                                                                </button> 
                                                                                : 
                                                                                <button type='button' className='friendlist-icon-remove' title="Remove Friend" onClick={() => removeFriendTask(postListed.createdUid , postListed.username , postListed.userImg)}>
                                                                                        <PersonRemoveAlt1Icon/>
                                                                                </button>
                                                                            }   
                                                                        </>
                                                                        :
                                                                        null 
                                                                    }
                                                            </div>
                                                    </div>
                                                    <hr/>
                                                    <div className='d-flex justify-content-start align-items-start gap-3 mt-2 mb-2'>
                                                            <div style={{width:"50px" , height:"50px"}} className='feedsBlock-empty-display'></div>
                                                            <div>
                                                                <span className='nunito-famiy nunito-300-b'>{postListed.title}</span>
                                                            </div>
                                                    </div>
                                                    <div className='w-100 border'>
                                                            <LazyLoadImage
                                                                className='feedsBlock-img'
                                                                src={`${postListed.imgUrl}`}
                                                                effect='blur'
                                                                draggable={false}
                                                                width={"100%"}
                                                            />
                                                    </div>
                                                    <div className='w-100 mt-2'>
                                                            <span className='nunito-family nunito-300-b'>Likes : {postListed.likes.length}</span>
                                                            <span className='margin-left-sm nunito-family nunito-300-b comments-hover'>Comments : {postListed.comments.length}</span>
                                                    </div>
                                                    <LikesComment postListed={postListed}/>
                                            </div>
                            ))}
                            {
                                post.end ? 
                                    <>
                                        <h2 className='nunito-family nunito-300-sm mt-4'> No more posts</h2>
                                    </>
                                :
                                    <>
                                        <button type='button' className='btn btn-info w-100 mt-4' onClick={() => loadMorePost()}>Load more post</button>
                                    </>
                            }
                            {
                                post.postLoading ? 
                                    <>
                                        <Loader/>
                                    </>
                                : null
                            }
                </>
            : null
        }
    </>
  )
}

export default FeedsBlock