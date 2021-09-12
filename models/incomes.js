const mongoose = require('mongoose');

const incomesSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Income = mongoose.model('Income', incomesSchema);

module.exports = Income;
