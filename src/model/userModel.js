import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

// Definicion del esquema a nivel de app

const userSchema = new Schema({
  username: String,
  passwordHash: String,
  name: String,
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]

});

userSchema.methods.toJson = function () {
  const userObject = this.toObject();
  userObject.id = userObject._id;
  delete userObject._id;
  delete userObject.__v;
  delete userObject.passwordHash;
  return userObject;
};

const User = model('User', userSchema);

export default User;
