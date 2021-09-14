const mongoose = require('mongoose');

const incomeSchema = mongoose.Schema(
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

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
