import * as mongooseWrapped from 'mongoose';

const mongoose = mongooseWrapped.default;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  
  password: {
    type: String,
    required: true,
  },

  salt: {
    type: String,
    required: true,
  },

  name: {
    type: String
  },

  role: {
    type: String,
    default: 'user', // Possible values: user | admin 
  }

})

export default mongoose.model('User', UserSchema)