const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
	{
		firstname: { type: String },
		lastname: { type: String },
		email: {
			type: String,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error('Email is invalid');
				}
			},
		},
		password: { type: String },
		address: { type: String },
		group: { type: Number },
	},
	{ timestamps: true, strict: false }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
