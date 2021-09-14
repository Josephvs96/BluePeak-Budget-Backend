const mongoose = require('mongoose');

const outcomSchema = mongoose.Schema(
	{
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
	},
	{ timestamps: true }
);

const Outcome = mongoose.model('Outcome', outcomSchema);

module.exports = Outcome;
