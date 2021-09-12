const mongoose = require('mongoose');

const outcomesSchema = new mongoose.Schema(
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

const Outcome = mongoose.model('Outcome', outcomesSchema);

module.exports = Outcome;
