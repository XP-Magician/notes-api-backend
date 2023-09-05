// Dependencies
import '../model/connectionBD.js';
import User from '../model/userModel.js';

export const saveUser = async (params) => {
  const userToAdd = new User({ ...params });
  await userToAdd.save();
  return userToAdd;
};

export const findUserById = async (userId) => {
  const userFinded = await User.findById(userId);
  return userFinded;
};

export const resetPassword = async (newPass, userId) => {
  const userUpdated = await User.findByIdAndUpdate(userId, { passwordHash: newPass }, { new: true });
  return userUpdated;
};

export const updateUser = async (userId, userToUpdate) => {
  const userUpdated = await User.findByIdAndUpdate(userId, userToUpdate, { new: true });
  return userUpdated;
};

export const findUsers = async (paramsToSearch) => {
  const usersFinded = await User.find(paramsToSearch);
  return usersFinded;
};
