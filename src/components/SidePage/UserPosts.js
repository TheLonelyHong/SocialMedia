import React, { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch , useSelector } from 'react-redux';
import { getOwnUserPost } from '../../redux/Action/postThunk';
import { auth } from '../../config/firebase';
import EditDelete from './EditDelete';
import { convertTimestamp } from '../../utils/tools';
import 'react-lazy-load-image-component/src/effects/blur.css';

const UserPosts = () => {

    const post = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(getOwnUserPost({email:auth.currentUser.email}));
            // eslint-disable-next-line
    } , []);

  return (
    <>
        {post.userPosts ? 
            <>
                {post.userPosts.map((item) => (
                        <div className='userPosts-background p-2 mt-2 mb-2' key={item.id}>
                                <div className='d-flex justify-content-between align-items-center gap-2'>
                                        <div className='flex-2 d-flex gap-1 align-items-center'>
                                                <LazyLoadImage
                                                        className='userPosts-profile-img'
                                                        src={`${item.userImg}`}
                                                        effect='blur'
                                                        draggable={false}
                                                />
                                            <span className='margin-left-sm nunito-family nunito-200-sm'>{item.username}</span>
                                        </div>
                                        <div className='flex-4 nunito-family nunito-200-sm margin-left-sm'>
                                            ~ {convertTimestamp(item.createdAt.seconds , item.createdAt.nanoseconds)}
                                        </div>
                                </div>
                                <div className='d-flex justify-content-start align-items-start gap-3 mt-2 mb-2'>
                                            <div style={{width:"50px" , height:"50px"}} className='userPosts-empty-display'></div>
                                                <div>
                                                        <span className='nunito-famiy nunito-300-b'>{item.title}</span>
                                                </div>
                                </div>
                                <div className='w-100'>
                                        <LazyLoadImage
                                            className='userPosts-img'
                                            src={`${item.imgUrl}`}
                                            effect='blur'
                                            draggable={false}
                                            width={"100%"}
                                        />
                                </div>
                                <EditDelete id = {item.id} img = {item.img}/>
                            </div>                    
                ))}
            </>
        : null}        
    </>
  )
}

export default UserPosts