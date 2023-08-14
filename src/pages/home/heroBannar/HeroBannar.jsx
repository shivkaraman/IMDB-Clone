import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux/es/hooks/useSelector';

//Components
import ImageLazyLoader from '../../../components/imglazyLoader/ImageLazyLoader';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

//Styles
import './heroBannar.css';

const HeroBannar = () => {
    const [background, setBackground] = useState('');
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { data, loading } = useFetch('/movie/upcoming');
    const { url } = useSelector((state) => state.home);

    const searchQueryHandler = (e) => {
        e.preventDefault();
        if (query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    useEffect(() => {
        const bg =
            url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data]);

    return (
        <div className='heroBanner'>
            {!loading && (
                <div className='backdrop-img'>
                    <ImageLazyLoader src={background} />
                </div>
            )}

            <div className='opacity-layer'></div>

            <ContentWrapper>
                <div className='heroBannerContent'>
                    <span className='title'>Welcome.</span>
                    <span className='subTitle'>
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <form
                        className='searchInput'
                        onSubmit={searchQueryHandler}
                    >
                        <input
                            type='text'
                            placeholder='Search for a movie or tv show....'
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button>Search</button>
                    </form>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBannar;
