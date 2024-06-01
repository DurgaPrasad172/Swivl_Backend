const Joi = require('joi');

const userSchema = Joi.object({
  firstName: Joi.string().pattern(/^[a-zA-Z]+$/).required(),
  lastName: Joi.string().pattern(/^[a-zA-Z]+$/).required(),
  phoneNumber: Joi.string().pattern(/^\+\d{11,13}$/).required(),
  email: Joi.string().email().required(),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateUser;
