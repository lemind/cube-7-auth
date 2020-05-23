const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const dotenv = require('dotenv');
const routes = require('./routes/');

const port = process.env.PORT || 3000;
const app = express();

dotenv.config();

const router = express.Router()

routes(router);

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use('/api', router);

app.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server started port: ${port}`);
  }
});
