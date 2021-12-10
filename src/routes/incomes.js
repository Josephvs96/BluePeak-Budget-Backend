const express = require('express');
const Income = require('../models/income.js');
const auth = require('../middleware/authMiddleware');

const router = new express.Router();
router.use(auth);

router.post('/incomes', async (req, res) => {
	try {
		const incomeData = req.body;
		const income = new Income({ ...incomeData, owner: req.user._id });
		await income.save();
		res.status(201).send({ message: 'One Income added successfully' });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/incomes', async (req, res) => {
	try {
		await req.user.populate('incomes');
		const incomes = req.user.incomes;
		res.status(200).send(incomes);
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/incomes/:id', async (req, res) => {
	const { id: _id } = req.params;

	try {
		const income = await Income.findOne({ _id, owner: req.user._id });

		if (!income) {
			return res
				.status(404)
				.send({ error: 'No income with the provided id found' });
		}

		res.status(200).send(income);
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.patch('/incomes/:id', async (req, res) => {
	const { id: _id } = req.params;

	try {
		const newIncomeData = req.body;
		const income = await Income.findOneAndUpdate(
			{
				_id,
				owner: req.user._id,
			},
			newIncomeData,
			{
				new: true,
				runValidators: true,
			}
		);

		if (!income) {
			return res
				.status(404)
				.send({ error: 'No income with the provided id found' });
		}

		res.status(200).send({ message: 'One income updated' });
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete('/incomes/:id', async (req, res) => {
	try {
		const { id: _id } = req.params;
		const income = await Income.findOneAndDelete({
			_id,
			owner: req.user._id,
		});

		if (!income) {
			return res
				.status(404)
				.send({ error: 'No income with the provided id found' });
		}

		res.status(200).send({ message: 'One income deleted' });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

module.exports = router;
