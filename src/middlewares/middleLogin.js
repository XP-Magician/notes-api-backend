
// Middlewares
const sendErr = (code, message, response) => {
  response.status(code).end(message);
};

export const middleValidateData = async (req, resp, next) => {
  const { username, password } = req.body;
  if (username && password) {
    if (username.length > 1 && password.length > 1) next();
    else sendErr(400, 'Invalid params provided', resp);
  } else {
    sendErr(412, 'Invalid params provided', resp);
  }
};
