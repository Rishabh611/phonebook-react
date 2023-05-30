const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
// app.use(morgan(":method :url :body"));

let data = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];
const now = new Date();
app.get("/api/persons", (req, res) => {
	res.json(data);
});
app.get("/info", (req, res) => {
	res.send(`<p>Phonebook has info for ${data.length} persons</p><br>${now.toLocaleTimeString()}`);
});

app.get("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	const person = data.find((obj) => obj.id === id);
	if (person) {
		res.json(person);
	} else {
		res.status(404).end();
	}
	res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
	const id = Number(req.param.id);
	data = data.filter((obj) => obj.id !== id);
	res.status(204).end();
});

const getRandomId = () => {
	return Math.floor(Math.random() * 100000);
};
app.post("/api/persons", (req, res) => {
	const id = getRandomId();
	console.log(id);
	const body = req.body;
	console.log(body);
	if (!body.number || !body.name) {
		return res.status(404).json({
			error: "Name or Number is missing",
		});
	}
	if (
		data.find((obj) => {
			obj.name === body.name;
		})
	) {
		return res.status(404).json({
			error: "Name must be unique",
		});
	}
	const person = {name: body.name, number: body.number, id: id};
	data = data.concat(person);
	res.json(data);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});