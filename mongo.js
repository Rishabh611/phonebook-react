const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const url = `mongodb+srv://rishabsinghrock:${password}@cluster0.obgbsat.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const ContactSchema = new mongoose.Schema({
	name: String,
	number: Number,
});

const Contact = mongoose.model("Contact", ContactSchema);

const person = new Contact({
	name: name,
	number: number,
});

person.save().then((result) => {
	console.log("contact saved!");
	mongoose.connection.close();
});

// Note.find({}).then((result) => {
// 	result.forEach((note) => {
// 		console.log(note);
// 	});
// 	mongoose.connection.close();
// });
