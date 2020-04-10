const mongoose = require('mongoose');

const ApplicationSchema = mongoose.Schema(
    {
        first_name: String,
        last_name: String,
        birth_date: Date,
        email: String
    }, {
        timestamps: true  //puts createdAt and updatedAt in the Schema
    }
);

module.exports = mongoose.model('Applications', ApplicationSchema);