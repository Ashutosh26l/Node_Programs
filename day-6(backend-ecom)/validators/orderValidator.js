import Joi from 'joi';

export const orderSchema = Joi.object({
  orderItems: Joi.array().items(
    Joi.object({
      product: Joi.string().hex().length(24).required(),
      qty:     Joi.number().integer().min(1).required(),
      price:   Joi.number().positive().required()
    })
  ).min(1).required(),
  shippingAddress: Joi.object({
    address:    Joi.string().required(),
    city:       Joi.string().required(),
    postalCode: Joi.string().required(),
    country:    Joi.string().required()
  }),
  paymentMethod: Joi.string().required(),
  totalPrice:    Joi.number().positive().required()
});
