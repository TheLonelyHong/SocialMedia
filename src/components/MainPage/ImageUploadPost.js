import React from 'react';
import ImageIcon from '@mui/icons-material/Image';
import ImageUploading from 'react-images-uploading';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import Alert from 'react-bootstrap/Alert';

const ImageUploadPost = ({handleImage , image}) => {
  return (
    <div>
        <ImageUploading
                value={image}
                onChange={handleImage}
                maxNumber={1}
                dataURLKey='data_url'
                acceptType={["jpg" , "png"]}
                maxFileSize={5000000}
        >
                {({imageList,
                   onImageRemove,
                   onImageUpdate,
                   onImageRemoveAll,
                   onImageUpload,
                   errors}) => (
                            <>
                                <button type='button' className='btn customized' onClick={onImageUpload} title='Image'><ImageIcon/></button>
                                {
                                    errors && errors.maxFileSize ? 
                                        <Alert variant='danger' className='mt-1'>File size cannot exceed 4Mb</Alert>
                                    : null
                                }
                                {
                                    errors && errors.acceptType ? 
                                        <Alert variant='danger' className='mt-1'>Only PNG and JPG format are accepted</Alert>
                                    : null
                                }
                                {
                                    errors && errors.maxNumber ? 
                                        <>
                                            {imageList && imageList.length >= 1 ? 
                                                <Alert variant='danger' className='mt-1'>Only 1 image is accepted</Alert>
                                             :
                                                null
                                            }
                                            {
                                                imageList.length !== 0 && imageList.length < 2 ? 
                                                    <div>
                                                        <button type='button' className='btn btn-warning' onClick={onImageRemoveAll}>Please click me!</button>
                                                    </div>
                                                :null
                                            }
                                        </>
                                    : 
                                        <>
                                            {imageList.map((image , index) => (
                                                    <div key={index} className='w-100'>
                                                            <img src={image['data_url']} alt='no img loaded' className='imageUpload-img mt-2' draggable={false}/>
                                                            <div className='d-flex justify-content-center align-items-center gap-2 mt-1'>
                                                                    <button type='button' className='btn btn-danger' onClick={onImageRemove}>
                                                                            <CloseIcon/>
                                                                    </button>
                                                                    <button type='button' className='btn btn-primary' onClick={onImageUpdate}>
                                                                            <CreateIcon/>
                                                                    </button>
                                                            </div>
                                                    </div>
                                            ))}
                                        </>
                                }
                            </>
                   )}
        </ImageUploading>
    </div>
  )
}

export default ImageUploadPost