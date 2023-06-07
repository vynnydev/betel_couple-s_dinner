const { MongoClient } = require("mongodb")
const uri = "mongodb+srv://tfk8scloud:k8s_ecommerce@k8s-cluster.xhs1em3.mongodb.net/"
const opts = { useUnifiedTopology: true }

const connect = async () => {
	try {
		console.log("# Connecting to database server...")
		const client = await MongoClient.connect(uri, opts)
		console.log("# Connected")
		return client
	}
	catch(err) {
		console.error("# Database connection error")
		throw err
	}
}

module.exports = connect;
