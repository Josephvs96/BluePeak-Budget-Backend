const express = require('express');
const auth = require('../middleware/authMiddleware');
const Outcome = require('../models/outcome.js');

const router = new express.Router();
router.use(auth);

router.post('/outcomes', async (req, res) => {
	const outcomeData = req.body;
	try {
		const outcome = new Outcome({ ...outcomeData, owner: req.user._id });
		await outcome.save();
		res.status(201).send({ message: 'One outcome added successfully' });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/outcomes', async (req, res) => {
	try {
		await req.user.populate('outcomes');
		const outcomes = req.user.outcomes;
		res.status(200).send(outcomes);
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/outcomes/:id', async (req, res) => {
	const { id: _id } = req.params;

	try {
		const outcome = await Outcome.findOne({ _id, owner: req.user._id });
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

	try {
		const newOutcome = req.body;
		const outcome = await Outcome.findOneAndUpdate(
			{ _id, owner: req.user._id },
			newOutcome,
			{
				new: true,
				runValidators: true,
			}
		);

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
		const outcome = await Outcome.findOneAndDelete({
			_id,
			owner: req.user._id,
		});

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
