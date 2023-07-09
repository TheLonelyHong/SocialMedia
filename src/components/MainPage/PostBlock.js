import React, { useState } from 'react';
import ImageUploadPost from './ImageUploadPost';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector , useDispatch } from 'react-redux';
import { uploadPostfromUser , getAllPosts } from '../../redux/Action/postThunk';
import { showMsg } from '../../utils/tools';
import { Loader } from '../../utils/tools';
import 'react-lazy-load-image-component/src/effects/blur.css';

const PostBlock = () => {

    const [postImage , setPostImage] = useState([]);
    const user = useSelector(state => state.user);
    const post = useSelector(state => state.post);
    const dispatch = useDispatch();

    const handleImage = (imageList , addUpdateIndex) => {
            setPostImage(imageList);
    }

    const handleSubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const formProps = Object.fromEntries(formData);
                const { postArea } = formProps;
                if(!postArea){
                        showMsg("ERROR" , "Please enter something before posting !")
                        return;
                }
                if(postImage.length === 0){
                        showMsg("ERROR" , "Please at least upload image before posting !");
                        return;
                }
                
                dispatch(uploadPostfromUser({title:postArea , imgFile:postImage[0].file , username:user.current.username , userImgUrl:user.current.profileImgUrl}))
                        .then(() => {
                                        dispatch(getAllPosts({num:Number(post.allPosts.length)}));
                        });
    };

  return (
    <>
        {
            user.current ? 
                <div className='postBlock-background p-2'>
                                <form onSubmit={handleSubmit}>
                                        <div className='d-flex gap-2 align-items-center'>
                                                        <LazyLoadImage
                                                                className='postBlock-img'
                                                                src={`${user.current.profileImgUrl}`}
                                                                draggable={false}
                                                                effect='blur'
                                                        />
                                                        <textarea className='form-control resize-none' rows={4} placeholder="What's up today ? ..." name='postArea'></textarea>
                                        </div>
                                        <div className='d-flex gap-2 align-items-start mt-2 w-100'>
                                                <div style={{width:"100px" , height:"100px"}} className='postBlock-empty-display'></div>
                                                <div className='w-100'>
                                                        <ImageUploadPost handleImage = {handleImage} image = {postImage}/>
                                                </div>
                                        </div>
                                        <div className='w-100 d-flex justify-content-end align-items-center'>
                                                <button type='submit' className='btn btn-primary'>
                                                        Post
                                                </button>
                                        </div>
                                </form>
                                {
                                        post.loading ? 
                                                <>
                                                        <Loader/>
                                                </>
                                        : null
                                }
                        </div>            
            : null
        }
    </>
  )
}

export default PostBlock