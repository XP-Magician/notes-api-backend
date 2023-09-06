// Dependencies
import supertest from 'supertest';
import { app } from '../../index.js';
import User from '../model/userModel.js';

export const api = supertest(app);

export const initUsers = async () => {
  // Siempre se espera un resultado predecible
  await User.deleteMany({});
  const usersToAdd = [
    {
      name: 'Lionel Messi',
      username: 'Messi',
      passwordHash: 'abcaAs1!skfl'
    },
    {
      name: 'Kim jon uhn',
      username: 'Kim',
      passwordHash: 'chinchenhonchi'
    }
  ];

  const user1 = new User(usersToAdd[0]);
  const user2 = new User(usersToAdd[1]);
  await user1.save();
  await user2.save();
  const listUsers = await User.find({});
  return listUsers;
};

export const initialBdLenght = async () => {
  const listsUsers = await User.find({});
  return listsUsers.length;
};

export const getId = async () => {
  const result = await User.findOne({ username: 'Messi' });
  return result._id.toString();
};

export const badRequests = {
  badPasswordReq: {
    passwordHash: 'aaaaasa'
  },
  goodPassword: {
    passwordHash: 'ABcd35!!'
  },
  badUserBody: {
    username: 'leo',
    abc: 'def'
  },
  existentUsername: {
    username: 'Messi',
    passwordHash: 'ABcd35!!',
    name: 'juan'
  }
};
