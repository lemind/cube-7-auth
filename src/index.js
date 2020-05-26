const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const dotenv = require('dotenv');
const routes = require('./routes/');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const app = express();

dotenv.config();

const mongoUriLocal = 'mongodb://localhost:27017'
const mongoDBLocal = 'auth'
const mongoUri = process.env.NODE_ENV === 'production'
  ? process.env.MONGODB_URI : mongoUriLocal
const mongoDB = process.env.NODE_ENV === 'production'
  ? process.env.MONGODB_URI_DATABASE_NAME : mongoDBLocal

const migrate = require('./db/migrate');
const env = {
  'process.env.MONGODB_URI': `"${mongoUri}"`,
  'process.env.MONGODB_URI_DATABASE_NAME': `"${mongoDB}"`
};
migrate.migrate(env);

try {
  mongoose.connect(mongoUri, {})
} catch (error) {
  console.log('Connecting mongoose error', err);
}

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
