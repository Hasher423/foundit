import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  lostItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }],
  foundItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

export default User;