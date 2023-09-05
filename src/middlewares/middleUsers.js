// Dependencies
import User from '../model/userModel.js';

// Middlewares

export const middleUserExists = async (req, resp, next) => {
  try {
    const { username } = req.body;
    const searchResult = User.find({ username });
    Object.keys(searchResult).length > 0 ? resp.status('Username is already taken') : next();
  } catch (err) {
    resp.status(409).end('There was an error checking availability, please try again');
  }
};

export const middleValidateUser = async (req, resp, next) => {
  try {
    const userToAdd = new User({ ...req.body });
    await userToAdd.validate();
    next();
  } catch (err) {
    resp.status(400).end('Params are invalid');
  }
};

export const middleValidateUpdate = async (req, resp, next) => {
  try {
    const idUser = req.params.id;
    const userFinded = await User.findById(idUser);
    if (Object.keys(userFinded).length > 0) {
      const updatedUser = new User({ ...userFinded, ...req.body });
      await updatedUser.validate();
      req.params.parsedUser = updatedUser;
      next();
    } else {
      resp.status(400).end(`User ID : ${idUser} doesn't exist in database`);
    }
  } catch (err) {
    resp.status(400).end('Params are invalid');
  }
};
