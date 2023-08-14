import React, { useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { fetchDataFromApi } from './utils/api';

// Components
import Home from './pages/home/Home';
import Explore from './pages/explore/Explore';
import SearchResult from './pages/searchResult/SearchResult';
import PageNotFound from './pages/404/PageNotFound';
import Details from './pages/details/Details';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import useFetch from './hooks/useFetch';

function App() {
    const dispatch = useDispatch();

    //UPdating the redux store to contain the base url+ size
    const fetchApiConfig = useCallback(() => {
        fetchDataFromApi('/configuration').then((res) => {
            const url = {
                backdrop: res.images.secure_base_url + 'original',
                poster: res.images.secure_base_url + 'original',
                profile: res.images.secure_base_url + 'original',
            };
            dispatch(getApiConfiguration(url));
        });
    }, []);

    //Fetching both movie and tv shows list using promise all
    const genresCall = async () => {
        let promises = [];
        let endPoints = ['tv', 'movie'];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);
        // console.log(data);
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        dispatch(getGenres(allGenres));
    };

    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, [fetchApiConfig]);

    return (
        <div className='App'>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route
                        path='/'
                        element={<Home />}
                    />
                    <Route
                        path='/:mediaType/:id'
                        element={<Details />}
                    />
                    <Route
                        path='/search:query'
                        element={<SearchResult />}
                    />
                    <Route
                        path='/explore:mediaType'
                        element={<Explore />}
                    />
                    <Route
                        path='*'
                        element={<PageNotFound />}
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
