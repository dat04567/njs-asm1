import React, { useState, useReducer } from 'react';
import Nav from '../../components/browse/Nav';
import SearchResult from '../../components/search/SearchResult';
import './Search.css';
import filterGenre from '../../utils/genre';

const initQuery = {
   query: '',
   language: 'en',
   media_type: 'all',
   year: '2022',
   genre: 'Action',
};

function reducer(state, action) {
   switch (action.type) {
      case 'mediaType': {
         return {
            ...state,
            media_type: action.media_type,
         };
      }
      case 'genre': {
         return {
            ...state,
            genre: action.genre,
         };
      }
      case 'year': {
         return {
            ...state,
            year: action.year,
         };
      }
      case 'language': {
         return {
            ...state,
            language: action.language,
         };
      }
      case 'search': {
         return {
            ...state,
            query: action.query,
         };
      }
      default :
      {
         return {...state}
      }
   }
}

const Search = () => {
   const [state, dispatch] = useReducer(reducer, initQuery);
   const [query, setQuery] = useState(initQuery);

   const handleSearch = () => {
      setQuery(state);
   };

   const resetSearch = () => {
      setQuery('');
      dispatch({ type: 'search', ...initQuery });
   };

   return (
      <div className="app">
         <Nav />
         <div className="s009">
            <form>
               <div className="inner-form">
                  <div className="basic-search">
                     <div className="input-field">
                        <input
                           type="text"
                           placeholder="Type Keywords"
                           onChange={(e) => dispatch({ type: 'search', query: e.target.value })}
                           value={state.query}
                        />
                        <div className="icon-wrap">
                           <svg
                              className="svg-inline--fa fa-search fa-w-16"
                              fill="#ccc"
                              aria-hidden="true"
                              data-prefix="fas"
                              data-icon="search"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512">
                              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                           </svg>
                        </div>
                     </div>
                  </div>
                  <div className="advance-search">
                     <div className="row third">
                        <div className="input-field">
                           <div className='params'>
                              <div>
                                 <p>Genre</p>
                                 <select
                                    name="genre "
                                    value={state.genre}
                                    onChange={(e) =>
                                       dispatch({ type: 'genre', genre: e.target.value })
                                    }>
                                    {filterGenre.map((genre, index) => (
                                       <option key={index} value={genre}>
                                          {genre}
                                       </option>
                                    ))}
                                 </select>
                              </div>
                              <div>
                                 <p>Media Type</p>
                                 <select
                                    name="mediaType"
                                    value={state.mediaType}
                                    onChange={(e) => {
                                       dispatch({ type: 'mediaType', media_type: e.target.value });
                                    }}>
                                    <option value="all">all</option>
                                    <option value="tv">tv</option>
                                    <option value="person">person</option>
                                    <option value="movie">movie</option>
                                 </select>
                              </div>
                              <div>
                                 <p>Year</p>
                                 <select
                                    name="year"
                                    id=""
                                    onChange={(e) =>
                                       dispatch({ type: 'year', year: e.target.value })
                                    }>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                 </select>
                              </div>
                              <div>
                                 <p>Language</p>
                                 <select
                                    name="language"
                                    id=""
                                    onChange={(e) =>
                                       dispatch({ type: 'language', language: e.target.value })
                                    }>
                                    <option value="en">en</option>
                                    <option value="ja">ja</option>
                                    <option value="ko">ko</option>
                                 </select>
                              </div>
                           </div>

                           <div className="result-count"></div>
                           <div className="group-btn">
                              <button className="btn-delete" onClick={resetSearch} type="button">
                                 RESET
                              </button>
                              <button
                                 className="btn-search"
                                 type="button"
                                 onClick={() => handleSearch()}>
                                 SEARCH
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
         <SearchResult query={query} />
      </div>
   );
};

export default Search;
