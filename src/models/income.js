const mongoose = require('mongoose');

const Income = mongoose.model('Income', {
	description: {
		type: String,
		required: true,
		trim: true,
	},
	amount: {
		type: Number,
		required: true,
		validate(value) {
			if (value < 0) {
				throw new Error('Amount must be a positive number');
			}
		},
	},
});

module.exports = Income;
