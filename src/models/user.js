const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
	firstname: { type: String, required: true, trim: true },
	lastname: { type: String, required: true, trim: true },
	email: {
		type: String,
		unique: true,
		trim: true,
		lowercase: true,
		required: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid');
			}
		},
	},
	password: { type: String, required: true },
	address: { type: String, required: false },
});

module.exports = User;
