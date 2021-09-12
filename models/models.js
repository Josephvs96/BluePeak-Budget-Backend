const mongoose = require('mongoose');

const User = require('./user');
const Income = require('./incomes');
const Outcome = require('./outcome');

const connectDb = () => {
	return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User, Income, Outcome, connectDb };

module.exports = models;
