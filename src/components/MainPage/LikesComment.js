import React, { useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { userLikeAction , getAllPosts , userDislikeAction , userCommentAction , firstPaginate } from '../../redux/Action/postThunk';
import { showMsg , Loader } from '../../utils/tools';

const LikesComment = ({postListed}) => {

    const [showComment , setShowComment] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const post = useSelector(state => state.post);

    const handleSubmit = (e) => {
            e.preventDefault()
            const formData = new FormData(e.target);
            const formProps = Object.fromEntries(formData);
            const username = user.current.username;
            const { comment } = formProps;
            if(!comment){
                    showMsg("ERROR" , "Please type in comment before submit !");
                    return;
            }
            dispatch(userCommentAction({postId:postListed.id , username , title:comment}))
                .then(() => {
                        dispatch(firstPaginate());
                });
    }

    const handleCloseComment = () => setShowComment(false);
    const handleShowComment = () => setShowComment(true);

    const likeTask = (postId) => {
            const userUsername = user.current.username;
            const userUid = user.current.userId;
            dispatch(userLikeAction({postId , userUsername  , userUid}))
                .then(() => {
                        dispatch(getAllPosts({num:Number(post.allPosts.length)}));
                });
    }

    const dislikeTask = (postId) => {
            const userUsername = user.current.username;
            const userUid = user.current.userId;
            dispatch(userDislikeAction({postId , userUsername  , userUid}))
                .then(() => {
                        dispatch(getAllPosts({num:Number(post.allPosts.length)}));
                });
    }

    const checkDislikeOrLike = ({likesField}) => {
                const userUsername = user.current.username;
                const filterData = likesField.filter((doc) => doc.username === userUsername);
                if(filterData.length !== 0){
                        return false;
                }
                return true;
    }

  return (
        <>
            {
                user.current ? 
                <>
                        <div className='w-100 mt-2'>
                                <div className='btn-group w-100'>
                                    {
                                        checkDislikeOrLike({likesField:[...postListed.likes]}) ? 
                                            <button type='button' className='btn btn-primary w-50' onClick={() => likeTask(postListed.id)}>Like</button>
                                        :
                                        <button type='button' className='btn btn-primary w-50' onClick={() => dislikeTask(postListed.id)}>Dislike</button>
                                    }
                                    {
                                        showComment ? 
                                            <button type='button' className='btn btn-info w-50' onClick={() => handleCloseComment()}>Close Comment</button>
                                        :
                                            <button type='button' className='btn btn-info w-50' onClick={() => handleShowComment()}>Comment</button>
                                    } 
                                </div>
                            </div>
                            {
                                showComment ? 
                                    <>
                                        <form onSubmit={handleSubmit} className='w-100 mt-2'>
                                                    <input type='text' name='comment' className='form-control text-comment' placeholder='Comment...'/>
                                                    <button type='submit' className='btn btn-info mt-2'>Comment</button>
                                        </form>
                                        {
                                            post.commentLoading ? 
                                                <>
                                                    <Loader/>
                                                </>
                                            : null
                                        }
                                        {postListed.comments.length > 0 ? 
                                            <>
                                                    {postListed.comments.map((item) => (
                                                        <div className='w-100 mt-2' key={item.id}>
                                                                <div className='comment-field-background mt-2'>
                                                                        <div className='border-bottom-black'>
                                                                            <span>Comment: {item.title}</span><br/>
                                                                            <span>~ {item.username}</span>
                                                                        </div>
                                                                </div>
                                                        </div>                                         
                                                    ))}
                                            </>
                                        :
                                                <>
                                                    <h3 className='nunito-family nunito-300-sm'>No comments</h3>
                                                </>
                                        }
                                    </>
                                : null
                            }
                  </>
                : null
            }
       </>
  )
}

export default LikesComment