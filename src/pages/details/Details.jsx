import React from 'react';

//Hooks
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router';

//Components
import DetailsBanner from './detaileBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideoSection from './videoSection/VideoSection';
import Recommendation from './carousels/Recommendation';
import Similar from './carousels/Similar';

//Style
import './details.css';

const Details = () => {
    const { mediaType, id } = useParams();
    const { data: video, loading: videoLoading } = useFetch(
        `/${mediaType}/${id}/videos`
    ); //Fetch videos related to curr movie
    const { data: credits, loading: creditsLoading } = useFetch(
        `/${mediaType}/${id}/credits`
    ); //Fetch movie team crew, cast members etc

    return (
        <div>
            <DetailsBanner
                video={video?.results[0]} //Passing only trailer
                crew={credits?.crew} //Passing only crew members
            />
            <Cast
                data={credits?.cast}
                loading={creditsLoading}
            />
            <VideoSection
                data={video}
                loading={videoLoading}
            />
            <Recommendation
                mediaType={mediaType}
                id={id}
            />
            <Similar
                mediaType={mediaType}
                id={id}
            />
        </div>
    );
};

export default Details;
