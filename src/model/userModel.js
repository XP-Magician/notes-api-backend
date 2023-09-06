import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

// Definicion del esquema a nivel de app

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]

});

userSchema.methods.toJson = function () {
  const userObject = this.toObject();
  userObject.id = userObject._id;
  delete userObject.passwordHash;
  delete userObject._id;
  delete userObject.__v;
  return userObject;
};

const User = model('User', userSchema);
// hola
// skina 555

export default User;
