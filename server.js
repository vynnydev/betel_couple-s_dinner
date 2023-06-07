import express from 'express'
import cors from 'cors'
import { connectDatabase } from './database.js'
import { ObjectId } from "mongodb"

import databaseRepository from './database-repository.js'

const port = 3000

const app = express()
app.use((req, res, next) => {

	res.header("Access-Control-Allow-Origin", "*")
	app.use(cors())
	next()
})

app.use(express.static("public"))
app.use(express.json())

// The route definitions for get, post and delete

app.get("/api/couples", async (req, res) => {
	try {
		const docs = await databaseRepository.getAllDocs()
		res.json(docs) 
	}
	catch (err) {
		console.error("# Get Error", err)
		res.status(500).send({ error: err.name + ", " + err.message })
	}
})

app.post('/api/addcouple', async (req, res) => {

	let data = req.body;

	try {
		data = await databaseRepository.addDoc(data)
		res.json(data)
	}
	catch (err) {
		console.error("# Post Error", err)
		res.status(500).send({ error: err.name + ", " + err.message })
	}
});

app.delete("/api/deletecouple/:id", async (req, res) => {

	const id = req.params.id
	let respObj = {}
	
	if (id && ObjectId.isValid(id)) {
		try {
			respObj = await databaseRepository.deleteDoc(id)
		}
		catch (err) {
			console.error("# Delete Error", err)
			res.status(500).send({ error: err.name + ", " + err.message })
			return
		}		
	}
	else {
		respObj = { message: "Data not deleted; the id to delete is not valid!" }
	}
	
	res.json(respObj)
})

// Start the web server and connect to the database

let server
let conn

(async () => {
	try {
		conn = await connectDatabase
		()
		await databaseRepository.getDb(conn)
		server = app.listen(port, () => {
			console.log("# App server listening on port " + port)
		})
	}
	catch(err) {
		console.error("# Error:", err)
		console.error("# Exiting the application.")
		await closing()
		process.exit(1)
	}
})()

async function closing() {
	console.log("# Closing resources...")
	if (conn) {
		await conn.close()
		console.log("# Database connection closed.")
	}
	if (server) {
		server.close(() => console.log("# Web server stopped."))
	}
}
