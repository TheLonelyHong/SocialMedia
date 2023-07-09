import React from 'react';
import Navbar from './Navbar';
import ProfileBlock from './ProfileBlock';
import NewsFeed from './NewsFeed';
import AdBlock from './AdBlock';

const Main = () => {
  return (
    <div className='main-background'>
            <div>
                    <Navbar/>
            </div>
            <div className='d-flex justify-content-around align-items-start padding-around gap-5 width-70 padding-top-enhance'>
                <div className='profileBlock-display'>
                       <ProfileBlock/>
                      <div className='profile-adBlock-display mt-3'>
                          <AdBlock/>
                      </div>
                </div>
                <div className='newsFeed-display'>
                    <NewsFeed/>
                </div>
                <div className='adBlock-display'>
                    <AdBlock/>
                </div>
            </div>
    </div>
  )
}

export default Main