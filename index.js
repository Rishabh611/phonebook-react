require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const contact = require("./models/phonebook");
const {json} = require("express");

app.use(express.static("build"));
app.use(express.json());
//app.use(requestLogger);
// app.use(morgan(":method :url :body"));
const now = new Date();
app.get("/api/persons", (request, response) => {
	contact.find({}).then((person) => {
		response.json(person);
	});
});
const unknownEndpoint = (request, response) => {
	response.status(404).send({
		error: "unknown endpoint",
	});
};

const errorHandler = (error, request, response, next) => {
	console.error(error);
	if (error.name === "CastError") {
		response.status(404).send({error: "Malformatted Id"});
	} else if (error.name === "ValidationError") {
		return response.status(404).json({error: error.message});
	}
	next(error);
};

app.get("/info", (req, res) => {
	res.send(`<p>Phonebook has info for ${data.length} persons</p><br>${now.toLocaleTimeString()}`);
});

app.get("/api/persons/:id", (req, res, next) => {
	contact
		.findById(req.params.id)
		.then((person) => {
			if (person) {
				res.json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
	contact
		.findByIdAndDelete(req.params.id)
		.then((result) => res.status(204).end)
		.catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
	const body = req.body;
	if (!body.number || !body.name) {
		return res.status(404).json({
			error: "Name or Number is missing",
		});
	}
	const person = new contact({
		name: body.name,
		number: body.number,
	});

	person
		.save()
		.then((savedPerson) => {
			res.json(savedPerson);
		})
		.catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
	const body = request.body;
	if (!body.number || !body.name) {
		return response.status(404).json({
			error: "Name or Number is missing",
		});
	}

	const person = {
		name: body.name,
		number: body.number,
	};

	contact
		.findByIdAndUpdate(request.params.id, person, {new: true})
		.then((updatedContact) => {
			response.json(updatedContact);
		})
		.catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);
const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
