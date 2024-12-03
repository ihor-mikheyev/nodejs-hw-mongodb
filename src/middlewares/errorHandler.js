export const errorHandler = (error, req, res, next) => {
  const { status = 500, message = 'Something went wrong', errors } = error;
  console.log(error);
  res.status(status).json({
    status,
    message,
    errors,
  });
};
