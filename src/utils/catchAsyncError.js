const catchError = (fn) => {
  return (request, response, next) => {
    fn(request, response, next).catch((error) => {
      next(error);
    });
  };
};
export { catchError };
