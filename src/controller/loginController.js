// Dependencies
import bcrypt from 'bcrypt';
import User from '../model/userModel.js';
import jsonwebtoken from 'jsonwebtoken';

// Methods

export const logUser = async (params) => {
  const jwt = jsonwebtoken;
  const ERR_MESSAGE = 'Invalid user or password';
  const { username, password } = params;
  let result = await User.findOne({ username });
  delete result.passwordHash;
  delete result.notes;
  if (!result) throw new Error(ERR_MESSAGE);
  const canLog = await bcrypt.compare(password, result.passwordHash);
  if (!canLog) throw new Error(ERR_MESSAGE);
  console.log({ result });
  result = jwt.sign(result.toJSON(), process.env.JWTKEY, { expiresIn: 60 });
  return result;
};
