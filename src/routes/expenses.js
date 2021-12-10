const express = require('express');
const auth = require('../middleware/authMiddleware');
const Expense = require('../models/expense');

const router = new express.Router();
router.use(auth);

router.post('/expenses', async (req, res) => {
	const expenseData = req.body;
	try {
		const expense = new Expense({ ...expenseData, owner: req.user._id });
		await expense.save();
		res.status(201).send({ message: 'One expense added successfully' });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/expenses', async (req, res) => {
	try {
		await req.user.populate('expenses');
		const expenses = req.user.expenses;
		res.status(200).send(expenses);
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/expenses/:id', async (req, res) => {
	const { id: _id } = req.params;

	try {
		const expense = await Expense.findOne({ _id, owner: req.user._id });
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

router.patch('/expenses/:id', async (req, res) => {
	const { id: _id } = req.params;

	try {
		const newExpense = req.body;
		const expense = await Expense.findOneAndUpdate(
			{ _id, owner: req.user._id },
			newExpense,
			{
				new: true,
				runValidators: true,
			}
		);

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

router.delete('/expenses/:id', async (req, res) => {
	const { id: _id } = req.params;

	try {
		const expense = await Expense.findOneAndDelete({
			_id,
			owner: req.user._id,
		});

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
