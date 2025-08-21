const Product = require('../models/product');
const User = require('../models/user');

async function buyProductService(productId, userId) {
  try {
    const product = await Product.findById(productId);
    if (!product || product.stock < 1) throw new Error('Product not available');
    
    const user = await User.findById(userId);
    if (user.balance < product.price) throw new Error('Insufficient funds');
    
    user.balance -= product.price;
    product.stock -= 1;
    
    await user.save();
    await product.save();

    return true;
  } catch (error) {
    throw error;
  }
}
module.exports = buyProductService;