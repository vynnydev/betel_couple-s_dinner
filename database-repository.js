import { ObjectId } from "mongodb"
const dbName = "betel_dinners"
const coll = "couples"
let db

const databaseRepository = {
	getDb: async (client) => {
		db = await client.db(dbName)
	},

	getAllDocs: async () => {
		return await db.collection(coll).find().toArray()
	},
	
	addDoc: async (doc) => {
		return await db.collection(coll).insertOne(doc)
	},
	
	deleteDoc: async (id) => {
		const filter = { _id: new ObjectId(id) }
		return await db.collection(coll).deleteOne(filter)
	}
}

export default databaseRepository