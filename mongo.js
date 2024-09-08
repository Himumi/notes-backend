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

if (process.argv.length === 2) {
	return Note.find({}).then(result => {
		console.log('Note:');
		result.forEach(n => console.log(n.content));
		mongoose.connection.close();
	});
}

if (process.argv.length < 4) {
	console.log('give content and important');
	process.exit(1);
}

const noteContent = process.argv[2];
const noteImportant = process.argv[3];

const newNote = new Note({
	content: noteContent,
	important: noteImportant,
});

newNote
	.save()
	.then(result => {
		console.log('note saved!');
		console.log(`content: ${result.content} important: ${result.important}`);
		mongoose.connection.close();
	});
