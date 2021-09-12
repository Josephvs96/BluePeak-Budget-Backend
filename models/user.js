const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: { type: String, required: true },
		address: { type: String, required: false },
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
