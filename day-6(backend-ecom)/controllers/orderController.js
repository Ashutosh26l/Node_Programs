import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

export const addOrder = asyncHandler(async (req, res) => {
  const order = await Order.create({ ...req.body, user: req.user._id });
  res.status(201).json(order);
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});
