import React, { useCallback, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import { useSelector, useDispatch } from "react-redux";
import {getApiConfiguration, getGenres} from './store/homeSlice'
import { fetchDataFromApi } from "./utils/api";

// Components
import Home from './pages/home/Home';
import Explore from './pages/explore/Explore';
import SearchResult from './pages/searchResult/SearchResult';
import PageNotFound from './pages/404/PageNotFound';
import Details from './pages/details/Details';
import Header from "./components/header/Header";
import Footer from './components/footer/Footer'
import useFetch from "./hooks/useFetch";

function App() {  
	const dispatch = useDispatch();

	const fetchApiConfig = useCallback(() => {
		fetchDataFromApi('/configuration')
			.then(res => {
				const url = {
					backdrop: res.images.secure_base_url + "original",
					poster: res.images.secure_base_url + "original",
					profile: res.images.secure_base_url + "original",
				};
				dispatch(getApiConfiguration(url))
			})
	}, []);

	useEffect(() => {
		fetchApiConfig()
	}, [fetchApiConfig])


	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/:mediaType/:id' element={<Details />} />
				<Route path='/search:query' element={<SearchResult />} />
				<Route path='/explore:mediaType' element={<Explore />} />
				<Route path='*' element={<PageNotFound />} />
				</Routes>
				<Footer />  
			</BrowserRouter>
		</div>
	);
}

export default App;
 