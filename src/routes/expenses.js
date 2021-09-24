const express = require('express');

const Expense = require('../models/expense');

const router = new express.Router();

router.post('/:group/expenses', async (req, res) => {
	const group = req.params.group;
	const expenseData = req.body;
	try {
		const expense = new Expense({ ...expenseData, group });
		await expense.save();
		res.status(201).send({ message: 'One expense added successfully' });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/:group/expenses', async (req, res) => {
	const group = req.params.group;
	try {
		const expense = await Expense.find({ group });
		res.status(200).send(expense);
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/:group/expenses/:id', async (req, res) => {
	const { id: _id } = req.params;

	try {
		const expense = await Expense.findById(_id);
		if (!expense) {
			return res
				.status(404)
				.send({ error: 'No expense with the provided id found' });
		}

		res.status(200).send(expense);
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.patch('/:group/expenses/:id', async (req, res) => {
	const { id: _id } = req.params;

	try {
		const newExpense = req.body;
		const expense = await Expense.findByIdAndUpdate(_id, newExpense, {
			new: true,
			runValidators: true,
		});

		if (!expense) {
			return res
				.status(404)
				.send({ error: 'No expense with the provided id found' });
		}

		res.status(200).send({ message: 'One expense updated' });
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete('/:group/expenses/:id', async (req, res) => {
	const { id: _id } = req.params;

	try {
		const expense = await Expense.findByIdAndDelete(_id);

		if (!expense) {
			return res
				.status(404)
				.send({ error: 'No expense with the provided id found' });
		}

		res.status(200).send({ message: 'One expense deleted' });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

module.exports = router;
