// Dependencies
import bcrypt from 'bcrypt';
import User from '../model/userModel.js';

// Methods

export const logUser = async (params) => {
  const ERR_MESSAGE = 'Invalid user or password';
  const { username, password } = params;
  const result = await User.findOne({ username });
  if (!result) throw new Error(ERR_MESSAGE);
  const canLog = await bcrypt.compare(password, result.passwordHash);
  if (!canLog) throw new Error(ERR_MESSAGE);
  return result;
};
