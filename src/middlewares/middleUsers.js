// Dependencies
import User from '../model/userModel.js';

// Middlewares

export const middleUserExists = async (req, resp, next) => {
  try {
    const { username } = req.body;
    let searchResult = await User.find({ username });
    searchResult = Object.keys(searchResult).length;
    searchResult > 0 ? resp.status(406).end('Username is already taken') : next();
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

export const middleValidatePass = (req, resp, next) => {
  const { pass } = req.body;
  let message = '';
  if (!pass) {
    resp.status(400).end('Error getting password. Try again');
  }

  // Valida longitud total
  /[\d\w\W]{8,}/.test(pass) ? message += 'Longitud total : OK' : message += 'Longitud total: X';
  message += '\n';

  // Valida cantidad de digitos de al menos 2
  /(?=\D*\d{2,})/.test(pass) ? message += 'Numeros: OK' : message += 'Numeros: X';
  message += '\n';

  // Valida cantidad de mayusculas de almenos 1
  /(?=[^A-Z]*[A-Z]{1,})/.test(pass) ? message += 'Mayusculas: OK' : message += 'Mayusculas: X';
  message += '\n';

  // Valida minusculas, almenos 1
  /(?=[^a-z]*[a-z]{1,})/.test(pass) ? message += 'Minusculas: OK' : message += 'Minusculas: X';
  message += '\n';

  // Cantidad de caracteres especiales de al menos 2
  /(?=[^\W]*\W{2,})/.test(pass) ? message += 'Especiales: OK' : message += 'Especiales: X';

  // Valida si cumple o no cumple
  if (/(?=[^xX]*X)/gm.test(message)) {
    // Si no cumple
    resp.status(400).end(`Password :${pass}\n\n${message}`);
  } else {
    // Si cumple
    next();
  }
};

export const middleValidateUpdate = async (req, resp, next) => {
  try {
    const idUser = req.params.id;
    let userFinded = await User.findById(idUser);
    if (userFinded) {
      if (Object.keys(userFinded).length > 0) {
        userFinded = userFinded.toJSON();
        const mixedUser = { ...userFinded, ...req.body };
        const updatedUser = new User({ ...mixedUser });
        await updatedUser.validate();
        req.params.parsedUser = updatedUser;
        next();
      } else {
        resp.status(400).end(`User ID : ${idUser} doesn't exist in database`);
      }
    } else {
      resp.status(400).end(`User ID : ${idUser} doesn't exist in database`);
    }
  } catch (err) {
    resp.status(400).end('Params are invalid');
  }
};
