export const validation = (schema) => {
  return (request, response, next) => {
    let inputs = { ...request.body, ...request.params, ...request.query };
    let { error } = schema.validate(inputs, { abortEarly: false });
    if (error) {
      let errors = error.details.map((detail) => detail.message);
      response.status(400).json(errors);
    } else {
      next();
    }
  };
};
