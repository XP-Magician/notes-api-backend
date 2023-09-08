// Dependencies
import jwt from 'jsonwebtoken';

const AUTH_FAILED = 'Authentication failed';

// Authentication middleware
const errResponse = (resp, message) => {
  resp.status(403).end(message);
};

export const middleInspectSubject = (req, resp, next) => {
  const authorization = req.get('authorization');
  if (!authorization) errResponse(resp, AUTH_FAILED);
  if (!authorization.toLowerCase().startsWith('bearer')) errResponse(resp, AUTH_FAILED);
  let token = authorization.split(' ');
  token = token.length > 1 ? token[1] : undefined;
  if (!token) errResponse(resp, AUTH_FAILED);
  try {
    const decodedToken = jwt.verify(token, process.env.JWTKEY);
    console.log({ decodedToken });
    if (!decodedToken._id) errResponse(resp, AUTH_FAILED);
    else {
      req.body.userId = decodedToken._id;
      next();
    }
  } catch (err) {
    errResponse(resp, AUTH_FAILED);
  }
};
