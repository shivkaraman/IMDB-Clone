import React, { useState } from 'react';

//Components
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import Carousel from '../../../components/carousel/Carousel';

//Hooks
import useFetch from '../../../hooks/useFetch';

const Popular = () => {
    const [endpoint, setEndPoint] = useState('movie');
    const { data, loading } = useFetch(`/${endpoint}/popular`); //Fetching popular movies/tv shows

    const onTabChange = (tab) => {
        setEndPoint(tab === 'Movies' ? 'movie' : 'tv');
    };

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className='carouselTitle'>What's Popular</span>
                <SwitchTabs
                    data={['Movies', 'TV Shows']}
                    onTabChange={onTabChange}
                />
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint={endpoint}
            />
        </div>
    );
};

export default Popular;
