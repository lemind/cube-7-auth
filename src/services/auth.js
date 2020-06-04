import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';

import UserModel from '../db/models/user';
import config from '../config';

import * as jwt from 'jsonwebtoken';

const ERRORS = {
  'USER_NOT_FOUND': {id: 101, message: 'User not found'},
  'INCORRECT_PASSWORD': {id: 102, message: 'Incorrect password'}
}

// ToDo: temp
class ErrorSys {
  constructor(errorObject) {
    this.details = errorObject
  }
}


export default class AuthService {
  async Login(email, password) {
    const userRecord = await UserModel.findOne({ email });

    if (!userRecord) {
      throw new ErrorSys(ERRORS.USER_NOT_FOUND)
    } else {
      const correctPassword = await argon2.verify(userRecord.password, password);
      if (!correctPassword) {
        throw new ErrorSys(ERRORS.INCORRECT_PASSWORD)
      }
    }

    const userDataForJWT = {_id: userRecord._id, email}
    return {
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
      token: this.generateJWT(userDataForJWT),
    }
  }

  async SignUp(email, password, name) {
    const salt = randomBytes(32);
    const passwordHashed = await argon2.hash(password, { salt });

    const userRecord = await UserModel.create({
      password: passwordHashed,
      email,
      salt: salt.toString('hex'),
      name,
    });
    const token = this.generateJWT(userRecord);

    return {
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
      token,
    }
  }

  generateJWT(user) {
    return jwt.sign({
        data: {
          _id: user._id,
          email: user.email
        }
      },
      config.jwtSecretKey,
      { expiresIn: config.jwtExpiresIn });
  }
}
