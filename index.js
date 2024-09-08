require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const Note = require('./models/note');

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.get('/api/notes', (request, response) => {
	Note
		.find({})
		.then(result => {
			console.log(result);
			response.json(result);
		});
});

app.get('/api/notes/:id', (request, response) => {
	Note
		.findById(request.params.id)
		.then(note => {
			console.log(note);
			response.json(note);
		});
});

app.delete('/api/notes/:id', (request, response) => {
	const id = request.params.id;
	const isInNote = notes.some(n => n.id === id);

	if (!isInNote) return response.status(404).end('note not found');

	notes = notes.filter(n => n.id !== id);

	response.status(204).end();
});


const generateId = () => {
	const maxId = notes.length > 0
		? Math.max(...notes.map(n => Number(n.id)))
		: 0 ;
	
	return String(maxId + 1);
};

app.post('/api/notes', (request, response) => {
	const body = request.body;

	if (!body || !body.content)
		return response.status(400).json({ error: 'content is missing' });

	const note = new Note({
		content: body.content,
		important: body.important,
	});

	note
		.save()
		.then(savedNote => {
			console.log(savedNote);
			response.json(savedNote);
		});
});

app.put('/api/notes/:id', (request, response) => {
	const id = request.params.id;
	const body = request.body;
	const isNotInNotes = !notes.some(n => n.id === id);

	if (!body || isNotInNotes) 
		return response.status(400).json({ error: 'error is happened' });

	notes = notes.map(n => 
		n.id === id 
			?  { ...n, content: body.content, important: body.important } 
			: n
		);

	response.json(body);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
