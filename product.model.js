const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        company: String
    }, {
        timestamps: true  //puts createdAt and updatedAt in the Schema
    }
);

module.exports = mongoose.model('Products', ProductSchema);