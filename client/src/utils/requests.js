// const API_KEY = '504b85f6fe0a10a9c7f35945e14e7ddf';
const API_KEY = '8qlOkxz4wq'

const requests = {
	fetchTrending: `/trending?token=${API_KEY}`,
	fetchNetflixOriginals: `/discover/tv?token=${API_KEY}`,
	fetchTopRated: `/top-rate?token=${API_KEY}`,
	fetchActionMovies: `/discover?token=${API_KEY}&genre=28`,
	fetchComedyMovies: `/discover?token=${API_KEY}&genre=35`,
	fetchHorrorMovies: `/discover?token=${API_KEY}&genre=27`,
	fetchRomanceMovies: `/discover?token=${API_KEY}&genre=10749`,
	fetchDocumentaries: `/discover?token=${API_KEY}&genre=99`,
	fetchSearch: `/search?token=${API_KEY}`,
};

export default requests;
