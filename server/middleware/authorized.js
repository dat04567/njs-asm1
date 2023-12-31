const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.use((req, res, next) => {
   const tokenId = req.query.token;
   User.fetchAll((users) => {
      const isToken = users.some((user) => user.token === tokenId );
      if(isToken)
      {
         return next();
      }
      
      res.status(401).send({ error: 'Unauthorized' });
   });
 
});

module.exports = router;
