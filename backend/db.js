// backend/db.js
const mongoose = require('mongoose');
const { userSchema, accountSchema } = require('./model/model');


mongoose.connect("mongodb://localhost:27017/paytm")

try {
    console.log('Successfully connected to MongoDB');
} catch (error) {
    console.error('Error connecting to MongoDB:', err.message);
}


const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
	User,
    Account
};