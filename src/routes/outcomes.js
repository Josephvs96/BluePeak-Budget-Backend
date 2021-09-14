const express = require('express');

const Outcome = require('../models/outcome.js');

const router = new express.Router();

router.post('/outcomes', async (req, res) => {
	const outcomeData = req.body;
	try {
		const outcome = new Outcome(outcomeData);
		await outcome.save();
		res.status(201).send({ message: 'One outcome added successfully' });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/outcomes', async (req, res) => {
	try {
		const outcomes = await Outcome.find({});
		res.status(200).send(outcomes);
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/outcomes/:id', async (req, res) => {
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

router.patch('/outcomes/:id', async (req, res) => {
	const { id: _id } = req.params;

	const updates = Object.keys(req.body);
	const allowedUpdates = ['amount', 'description'];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation)
		return res.status(400).send({ error: 'Invalid update object!' });

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

router.delete('/outcomes/:id', async (req, res) => {
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
