const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
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
		group: { type: Number, required: true },
	},
	{ timestamps: true, strict: false }
);

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
