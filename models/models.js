const mongoose = require('mongoose');

const User = require('./user');
const Income = require('./incomes');
const Outcome = require('./outcome');

const connectDb = () => {
	return mongoose.connect(
		'mongodb+srv://bluepeak:bluepeak-123@bluepeak.ryv7v.mongodb.net/bluepeak?retryWrites=true&w=majority'
	);
};

const models = { User, Income, Outcome, connectDb };

module.exports = models;
