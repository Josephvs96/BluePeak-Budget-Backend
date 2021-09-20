const express = require('express');
const Income = require('../models/income.js');

const router = new express.Router();

router.post('/:group/incomes', async (req, res) => {
	const group = req.params.group;
	const incomeData = req.body;
	try {
		const income = new Income({ ...incomeData, group });
		await income.save();
		res.status(201).send({ message: 'One Income added successfully' });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/:group/incomes', async (req, res) => {
	const group = req.params.group;
	try {
		const incomes = await Income.find({ group });
		res.status(200).send(incomes);
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/:group/incomes/:id', async (req, res) => {
	const { id: _id } = req.params;

	try {
		const income = await Income.findById(_id);
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

router.patch('/:group/incomes/:id', async (req, res) => {
	const { id: _id } = req.params;

	try {
		const newIncome = req.body;
		const income = await Income.findByIdAndUpdate(_id, newIncome, {
			new: true,
			runValidators: true,
		});

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

router.delete('/:group/incomes/:id', async (req, res) => {
	try {
		const { id: _id } = req.params;
		const income = await Income.findByIdAndDelete(_id);

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
