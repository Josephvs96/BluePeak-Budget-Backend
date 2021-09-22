require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDb = require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

const routes = require('./routes/index');

app.use(routes.authRoute);
app.use(routes.incomesRoute);
app.use(routes.outcomesRoute);
connectToDb().then(() => {
	console.log('Db connected');
	app.listen(port, () => {
		console.log(`App is running and listning on port ${port}`);
	});
});
