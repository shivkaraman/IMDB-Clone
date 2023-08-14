import React from 'react';

//Components
import HeroBannar from './heroBannar/HeroBannar';
import Trending from './trending/Trending';

//Styles
import './home.css';

const Home = () => {
    return (
        <div className='homePage'>
            <HeroBannar />
            <Trending />
        </div>
    );
};

export default Home;
