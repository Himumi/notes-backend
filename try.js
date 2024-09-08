const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

app.get(
	'/api/notes',
	(request, response) => {
		Note.find({}).then(notes => {
			console.log(notes);
			response.json(notes);
		});
	}
);

const PORT = 3001;
app.listen(
	PORT,
	() => console.log('server is running')
);
