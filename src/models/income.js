const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			trim: true,
		},
		amount: {
			type: Number,
			validate(value) {
				if (value < 0) {
					throw new Error('Amount must be a positive number');
				}
			},
		},
	},
	{ timestamps: true, strict: false }
);

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
