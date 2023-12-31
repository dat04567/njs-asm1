const express = require("express");


const router = express.Router();



const movieController = require("../controller/movie");

router.get("/trending", movieController.getTrendingMovies);

router.get("/top-rate", movieController.getTopRateMovies);

router.post('/search', movieController.getSearchMovie);

router.get('/discover/:mediaType',movieController.getNetflixOriginals);

router.get('/discover', movieController.getGenreMovies);



module.exports = router