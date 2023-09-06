// Dependencies
import '../model/connectionBD.js';
import User from '../model/userModel.js';

export const saveUser = async (params) => {
  const userToAdd = new User({ ...params });
  const userAdded = await userToAdd.save();
  const { passwordHash, ...userFields } = userAdded._doc;
  return userFields;
};

export const findUserById = async (userId) => {
  const NOT_FINDED_ERR = `There aren't any users with id: ${userId} in the database.`;
  const INVALID_FORMAT = 'The id format provided is invalid';
  try {
    const userFinded = await User.findById(userId).select('-passwordHash');
    if (userFinded === null) {
      return [];
    } else {
      return userFinded;
    }
  } catch (err) {
    if (err.message !== NOT_FINDED_ERR) {
      err.message = INVALID_FORMAT;
    }
    throw err;
  }
};

export const resetPassword = async (newPass, userId) => {
  const userUpdated = await User.findByIdAndUpdate(userId, { passwordHash: newPass }, { new: true });
  return userUpdated ?? [];
};

export const updateUser = async (userId, userToUpdate) => {
  const userUpdated = await User.findByIdAndUpdate(userId, userToUpdate, { new: true }).select('-passwordHash');
  return userUpdated;
};

export const findUsers = async ({ username, name }) => {
  let paramsToSearch = {};
  if (username) paramsToSearch = { ...paramsToSearch, username };
  if (name) paramsToSearch = { ...paramsToSearch, name };
  const usersFinded = await User.find(paramsToSearch).select('-passwordHash');
  return usersFinded;
};
