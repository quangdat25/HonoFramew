import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // Password might not be required if logging in via Google/Github
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  account_type: {
    type: String,
    enum: ['LOCAL', 'GOOGLE', 'GITHUB'],
    default: 'LOCAL',
    required: true,
  },
  role: {
    type: String,
    default: 'USER',
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  code_id: {
    type: String,
    required: false,
  },
  code_expired: {
    type: Date,
    required: false,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
