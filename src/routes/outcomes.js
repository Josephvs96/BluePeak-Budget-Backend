const express = require('express');

const Outcome = require('../models/outcome.js');

const router = new express.Router();

router.post('/:group/outcomes', async (req, res) => {
	const group = req.params.group;
	const outcomeData = req.body;
	try {
		const outcome = new Outcome({ ...outcomeData, group });
		await outcome.save();
		res.status(201).send({ message: 'One outcome added successfully' });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/:group/outcomes', async (req, res) => {
	const group = req.params.group;
	try {
		const outcomes = await Outcome.find({ group });
		res.status(200).send(outcomes);
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/:group/outcomes/:id', async (req, res) => {
	const { id: _id } = req.params;

	try {
		const outcome = await Outcome.findById(_id);
		if (!outcome) {
			return res
				.status(404)
				.send({ error: 'No outcome with the provided id found' });
		}

		res.status(200).send(outcome);
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.patch('/:group/outcomes/:id', async (req, res) => {
	const { id: _id } = req.params;

	try {
		const newOutcome = req.body;
		const outcome = await Outcome.findByIdAndUpdate(_id, newOutcome, {
			new: true,
			runValidators: true,
		});

		if (!outcome) {
			return res
				.status(404)
				.send({ error: 'No outcome with the provided id found' });
		}

		res.status(200).send({ message: 'One income updated' });
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete('/:group/outcomes/:id', async (req, res) => {
	const { id: _id } = req.params;

	try {
		const outcome = await Outcome.findByIdAndDelete(_id);

		if (!outcome) {
			return res
				.status(404)
				.send({ error: 'No outcome with the provided id found' });
		}

		res.status(200).send({ message: 'One outcome deleted' });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

module.exports = router;
