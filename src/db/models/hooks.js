export const handleSaveError = (error, data, next) => {
  const { code, name } = error;
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next();
};

export const setUpdateSettings = function (next) {
  this.option.runValidators = true;
  this.option.new = true;
  next();
};