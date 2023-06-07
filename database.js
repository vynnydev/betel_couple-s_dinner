import * as dotenv from 'dotenv'
import { MongoClient } from "mongodb"

dotenv.config()

// const MONGODB_URI = "mongodb+srv://tfk8scloud:k8s_ecommerce@k8s-cluster.xhs1em3.mongodb.net/"
const opts = { useUnifiedTopology: true }

export const connectDatabase = async () => {
	try {
		console.log("# Connecting to database server...")
		const client = await MongoClient.connect(process.env.MONGODB_URI, opts)
		console.log("# Connected")
		return client
	}
	catch(err) {
		console.error("# Database connection error")
		throw err
	}
}
