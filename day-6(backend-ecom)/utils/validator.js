// utils/validator.js
export default schema => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400);
    next(new Error(error.details[0].message));
  } else {
    next();
  }
};
