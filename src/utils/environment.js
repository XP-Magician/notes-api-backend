const detectEnvironment = () => {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    return process.env.MONGO_DB_DEVELOPMENT;
  } else if (process.env.NODE_ENV === 'test') {
    return process.env.MONGO_DB_TEST;
  } else {
    return process.env.MONGO_DB_PRODUCTION;
  }
};

export default detectEnvironment;
