const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'movieList.json');

const pGenre = path.join(path.dirname(require.main.filename), 'data', 'genreList.json');


// read file
const getDataFromFile = (cb, p) => {
   fs.readFile(p, (err, fileContent) => {
      if (!err) {
         cb(JSON.parse(fileContent));
      } else cb([]);
   });
};

// lowercase 
const lowerText =  (value) => value?.toLowerCase();

// check if value is don;t have return true else return conditon 
const isCheckQuery = (value, condition) => (value ? condition : true);

module.exports = class Movie {
   static fetchAll(cb) {
      getDataFromFile(cb, p);
   }

   static fetchAllGenres(cb) {
      getDataFromFile(cb, pGenre);
   }

   static sortMovies(name ,cb)
   {
      Movie.fetchAll((movies) => {
         const results =  movies.sort((a, b) => b[name] - a[name]);
         cb(results);
      });
   }
   // fetch movies from GenreID
   static fetchMoviesFromGenreID(genreID, cb) {
      Movie.fetchAll((movies) => {
         // filter to genre id and check array genres_ids have genre 
         const results = movies.filter((movie) => {
            return movie.genre_ids.some((id) => id === +genreID);
         });
         cb(results);
      }, p);
   }

   // fetch movies from media type 
   static fetchMoviesFromMediaType(mediaType, cb) {
      Movie.fetchAll( (movies) =>{
         const results = movies.filter((movie) => movie.media_type.includes(mediaType));
         cb(results);
      })
   }

   static findGenreId(genreID, cb) {
      Movie.fetchAllGenres( genres => {
         const obj = genres.find((item) => +item.id === +genreID);
         cb(obj);
      })
   }

   static findGenreIdFromName(genreName, cb)
   {
      // get genres 
      Movie.fetchAllGenres( genres =>{
         // get genre have contain genre name 
         const results =  genres.find( (genre) => lowerText(genre.name).includes(genreName));

         Movie.fetchAll( (movies) =>{
            cb(results, movies);
         })
      })

   }

   static fetchMoviesFromGenreName(genreName,params,  cb) {
      Movie.findGenreIdFromName(genreName, (genre, movies) =>{
         const results = movies.filter( (movie) => {
            // check keyword params
            const textMovie = lowerText(movie.overview) + ' ' + lowerText(movie.title);
            const isKeyword = textMovie?.includes(lowerText(params.query));
            // check language params
            const lowerLanguage = lowerText(movie.original_language);
            const isLanguage = isCheckQuery(params.language, lowerLanguage.includes(lowerText(params.language)));
            // check data params
            const date = new Date(movie.release_date || movie.first_air_date);
            const isYear = isCheckQuery(params.year, date.getFullYear() === +params.year);
            // check media type params
            const isMediaType = isCheckQuery(
               params.mediaType,
               lowerText(movie.media_type).includes(lowerText(params.mediaType))
            );
            // check genre params
            const isGenres = isCheckQuery(genreName,movie.genre_ids.some( (id) => id === +genre?.id));
            return isKeyword && isYear && isLanguage && isMediaType && isGenres;
         });

         cb(results);
      });
   }

   static searchMovies(params, cb) {
      const genreName =  lowerText(params.genre);
      Movie.fetchMoviesFromGenreName(genreName,params,results  => {
         // callback funtion 
         cb(results);
      });
   }

};
