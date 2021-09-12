const express = require('express');
const cors = require('cors');

const { User, Income, Outcome, connectDb } = require('./models/models');

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

app.post('/signup', async (req, res) => {
	const user = req.body;
	try {
		await User.create(user);
		res.status(201).json({ message: 'User Created successfully' });
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
});

app.post('/login', async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password || email.length < 1 || password.length < 1) {
		return res
			.status(400)
			.json({ Error: 'Both email and password must be provided' });
	}

	const user = await User.findOne({ email });

	if (!user)
		return res
			.status(400)
			.json({ error: 'No user with the provided email could be found' });

	if (user.password !== password) {
		return res.status(401).json({ error: 'Password is incorrect' });
	}

	res.status(200).json(user);
});

app.post('/incomes', async (req, res) => {
	const incomeData = req.body;

	try {
		await Income.create(incomeData);
		res.status(201).json({ message: '1 Income added successfully' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.get('/incomes', async (req, res) => {
	try {
		const incomes = await Income.find({});
		res.status(200).json(incomes);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.delete('/incomes', async (req, res) => {
	const id = req.body;
	if (!id)
		return res.status(400).json({
			error:
				'You need to provide an id for the income in order for it to be deleted',
		});

	try {
		await Income.deleteOne({ _id: id });
		res.status(200).json({ message: 'One income deleted' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.post('/outcomes', async (req, res) => {
	const outcomesData = req.body;

	try {
		await Outcome.create(outcomesData);
		res.status(201).json({ message: '1 Outcome added successfully' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.get('/outcomes', async (req, res) => {
	try {
		const outcomes = await Outcome.find({});
		res.status(200).json(outcomes);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

app.delete('/outcomes', async (req, res) => {
	const id = req.body;
	if (!id)
		return res.status(400).json({
			error:
				'You need to provide an id for the outcome in order for it to be deleted',
		});

	try {
		await Outcome.deleteOne({ _id: id });
		res.status(200).json({ message: 'One outcome deleted' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

connectDb().then(() => {
	console.log('Db connected');
	app.listen(port, () => {
		console.log(`App is running and listning on port ${port}`);
	});
});
