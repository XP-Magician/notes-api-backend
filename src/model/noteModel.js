import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

// Definir esquema a nivel de app
const noteSchema = Schema({
  content: { type: String, required: true },
  date: Date,
  important: Boolean,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}
);

noteSchema.methods.toJSON = function () {
  const noteObject = this.toObject();
  noteObject.id = noteObject._id;
  delete noteObject._id;
  delete noteObject.__v;
  return noteObject;
};

// Modelo
export const Note = model('Note', noteSchema);
