const mongoose = require('mongoose');

const Outcome = mongoose.model('Outcome', {
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

module.exports = Outcome;
