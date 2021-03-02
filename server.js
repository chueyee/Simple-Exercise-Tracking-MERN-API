const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
//useNewUrlParser, useCreateIndex, and useUnifiedTopology used to deal with mongoDB depricating the index functions
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully!');
});

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
