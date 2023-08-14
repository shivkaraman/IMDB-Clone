import React from 'react';

//Components
import HeroBannar from './heroBannar/HeroBannar';
import Trending from './trending/Trending';
import Popular from './popular/Popular';
import TopRated from './topRated/TopRated';

//Styles
import './home.css';

const Home = () => {
    return (
        <div className='homePage'>
            <HeroBannar />
            <Trending />
            <Popular />
            <TopRated />
        </div>
    );
};

export default Home;
