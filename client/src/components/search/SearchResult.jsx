import React, { useState, useEffect } from 'react';

import axios from '../../utils/axios';
import requests from '../../utils/requests';

import './SearchResult.css';

const base_url = 'https://image.tmdb.org/t/p/original';

const SearchResult = ({query}) => {
	const [movies, setMovies] = useState([]);
	console.log(query);
	const url = `${requests.fetchSearch}`;
	// query : query.query,
	// language : query,
	// media_type : query,
	// year : query,
	// genre : query
	useEffect(() => {
		async function fetchData() {
			// test query = conan 
			const request = await axios.post(url,{
				query  : query.query,
				language : query.language,
				media_type : query.media_type
			});
			setMovies(request.data.results);
			return request;
		}

		if (query) {
			fetchData();
		} else {
			setMovies([]);
		}
	}, [url, query]);

	return(
		<div className='row'>
			<h2>Search Result</h2>
			<div className='row_posters search-resul-container sc2'>
				{movies.map((movie) => {
					return (
						<img
							key={movie.id}
							className={`row_poster row_posterLarge`}
							src={`${base_url}${movie.poster_path}`}
							alt={movie.name}
						/>
					);
				})}
				{movies.length === 0 &&  <h3>No find movies </h3>}
			</div>
		</div>
	)
};

export default SearchResult;
