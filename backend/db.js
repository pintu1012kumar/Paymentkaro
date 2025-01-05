// backend/db.js
const mongoose = require('mongoose');
const { userSchema, accountSchema } = require('./model/model');



// mongoose.connect("mongodb+srv://Pintu1012kumar:123456@cluster0.2ckvt.mongodb.net/")
// mongodb+srv://<db_username>:<db_password>@cluster0.2ckvt.mongodb.net/

try {
    mongoose.connect("mongodb://localhost:27017/paytm")
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