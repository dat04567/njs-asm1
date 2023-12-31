// paninating method 
const handlePaging = (collection, page = 1, numItems = 20) => {
   const perPage = +numItems;
   const offset = (page - 1) * perPage;

   const results = collection.slice(offset, offset + perPage);
   return {
      page: page,
      results: results,
      total_pages:  Math.ceil(collection.length / numItems),
   };
};


module.exports = handlePaging
