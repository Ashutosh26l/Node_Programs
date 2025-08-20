import Joi from 'joi';

export const productSchema = Joi.object({
  name:        Joi.string().required(),
  description: Joi.string().required(),
  price:       Joi.number().positive().required(),
  countInStock:Joi.number().integer().min(0).required(),
  category:    Joi.string().allow(''),
  image:       Joi.string().uri().allow('')
});
