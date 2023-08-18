const detectEnvironment = () => {
  if (process.env === 'development') {
    return process.env.MONGO_DB_DEVELOPMENT;
  } else if (process.env === 'test') {
    return process.env.MONGO_DB_TEST;
  } else {
    return process.env.MONGO_DB_PRODUCTION;
  }
};

export default detectEnvironment;
