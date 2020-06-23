import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import routes from './routes/index';
import migrate from './db/migrate';

const port = process.env.PORT || 3001;
const app = express();

dotenv.config();

const mongoUriLocal = 'mongodb://localhost:27017'

const mongoUri = process.env.NODE_ENV === 'production'
  ? process.env.MONGODB_URI : mongoUriLocal

migrate();

try {
  mongoose.connect(mongoUri, {})
} catch (error) {
  console.log('Connecting mongoose error', error);
}

const router = express.Router()

routes(router);

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use('/api', router);

app.listen(<number>port, "0.0.0.0", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server started port: ${port}`);
  }
});
