import * as jwt from 'express-jwt';
import config from '../config';

console.log('dae', jwt)

const getTokenFromHeader = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
}

export default jwt({
  secret: config.jwtSecretKey,
  userProperty: 'token', // this is where the next middleware can find the encoded data generated in services/auth:generateToken
  getToken: getTokenFromHeader,
})
