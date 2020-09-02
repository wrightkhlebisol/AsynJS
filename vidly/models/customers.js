let mongoose = require('mongoose');

let customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 8
    },
    phone: {
        type: String,
        minlength: 10,
        required: true
    }
});

let Customers = mongoose.model('customers', customerSchema);
exports.Customers = Customers;
