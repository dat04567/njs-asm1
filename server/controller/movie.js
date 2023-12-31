const handlePaging = require('../util/paging');
const Movie = require('../models/Movie');

exports.getTrendingMovies = (req, res, next) => {
   const page = req.query.page;
     // sort movies to decrease popularity 
   Movie.sortMovies('popularity', (movies) => {
      return res.send({
         ...handlePaging(movies,page)
      });
   });
};

exports.getTopRateMovies = (req, res, next) => {
   const page = req.query.page;
   // sort movies to decrease vote_average 
   Movie.sortMovies('vote_average', (movies) => {
      return res.send({
        ...handlePaging(movies,page)
      });
   });
};



exports.getNetflixOriginals = (req, res, next) => {
   const mediaType = req.params.mediaType;
   Movie.fetchMoviesFromMediaType(mediaType,movies => {

      if (movies.length) {
         const resultsPaging = handlePaging(movies);
         return res.send(resultsPaging);
      }

      res.status(404).send({
         success: false,
         status_code: 34,
         status_message: 'The resource you requested could not be found.',
      });
   });
};


exports.getGenreMovies = (req, res, next) => {
   const genre = req.query.genre;
   const page = req.query.page;
   if (!genre) return res.status(400).send({ message: 'Not found gerne parram' });


   Movie.fetchMoviesFromGenreID(genre, movies => {

      if(!movies.length)
         return res.status(400).send({ message: 'Not found that genre id' });

      const resultsPaging = handlePaging(movies,page);
      // find geenreID 
      Movie.findGenreId(genre, (obj) => {
         res.send({
            ...resultsPaging,
            genre_name : obj.name
         })
      })
  
   });
};


exports.getSearchMovie = (req, res, next) => {
   const query = req.body.query
   // query not found send 404 error message
   if(!query)
      return res.status(400).send({ message: 'Not found keyword parram'});
   // check is tring 
   const isString =  function(value) {
      return typeof value === 'string' ? value : undefined;
   }

   const params = {
      query : req.body.query,
      genre : isString(req.body.genre),
      mediaType : isString(req.body.media_type),
      language : isString(req.body.language) ,
      year : req.body.year
   }
   // pantiatiom
   Movie.searchMovies( params ,movies => {
      res.send({
         ...handlePaging(movies)
      });
   })

}  
