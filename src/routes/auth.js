const express = require('express');

const User = require('../models/user.js');

const router = new express.Router();

router.post('/signup', async (req, res) => {
	const user = req.body;
	try {
		const userAlreadyExists = (await User.findOne({
			email: user.email,
		}))
			? true
			: false;
		if (userAlreadyExists)
			return res
				.status(400)
				.send({ error: 'User already exist, please login' });

		const createdUser = new User(user);

		await createdUser.save();

		res.status(201).send({ message: 'User Created successfully' });
	} catch (error) {
		res.status(401).send({ error: error.message });
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email || !password || email.length < 1 || password.length < 1) {
			return res
				.status(400)
				.send({ Error: 'Both email and password must be provided' });
		}

		const user = await User.findByCredentials(email, password);

		res.status(200).send(user);
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

module.exports = router;
