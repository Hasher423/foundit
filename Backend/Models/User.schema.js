import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: String,

  providers: [{
    providerId: String,     // google.com, github.com
    uid: String             // Firebase UID for that provider
  }],

  lostItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  foundItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],

  createdAt: { type: Date, default: Date.now },
});
  

const User = mongoose.model('User', userSchema);

export default User;