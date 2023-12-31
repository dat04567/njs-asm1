const express = require("express");
const cors = require("cors");

const app = express();
const middleware = require('./middleware/authorized')
const movieRouter = require("./routes/movies");
const errorController = require('./controller/erro')

app.use(cors());

app.use(express.json({
   verify :  (req, res, buf, encoding) => {
      try {
        JSON.parse(buf);
      } catch(e) {
        res.status(404).send({message : 'invalid JSON'} );
        throw Error('invalid JSON');
      }
    }
}));

app.use(express.urlencoded({ extended: true  }));

app.use(middleware);

app.use("/api/movies", movieRouter);

app.use(errorController.get404);

app.listen(5000)