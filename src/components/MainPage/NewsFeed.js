import React from 'react';
import PostBlock from './PostBlock';
import FeedsBlock from './FeedsBlock';

const NewsFeed = () => {
  return (
    <>
          <div>
              <PostBlock/>
          </div>
          <div>
              <FeedsBlock/>
          </div>
    </>
  )
}

export default NewsFeed