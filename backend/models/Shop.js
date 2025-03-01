const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    shop: String,
    accessToken: String,
});

module.exports = mongoose.model('Shop', ShopSchema);