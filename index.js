const express = require('express')
const {MongoClient} = require('mongodb')

let db

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

async function connectDB() {
	const uri = "mongodb://mongo:27017/acme"
	const client = new MongoClient(uri)
	await client.connect()
	console.log('MongoDB connected')
	db = client.db()
}

connectDB()

app.get('/', async (req, res) => {
        const results = await db.collection("animals").find().toArray()
	res.status(200)
        res.send(results)
})

app.post('/', async (req, res) => {
	await db.collection("animals").insertOne({
                animal: req.body.animal,
		species: req.body.species,
		genus: req.body.genus,
		family: req.body.family,
		order: req.body.order,
		class: req.body.class,
		domesticated: req.body.domesticated,
		extinct: req.body.extinct
        })
	res.status(201)
        res.send(`Animal '${req.body.animal}' is added to the database`)
})

app.patch('/', async (req, res) => {
	await db.collection("animals").updateOne({animal: req.body.animal},
		{
			$set:{
				animal: req.body.animal,
				species: req.body.species,
				genus: req.body.genus,
				family: req.body.family,
				order: req.body.order,
				class: req.body.class,
				domesticated: req.body.domesticated,
				extinct: req.body.extinct
			}
		})
	res.send(`Animal '${req.body.animal}' is updated`)
})

app.delete('/', async (req, res) => {
	await db.collection("animals").findOneAndDelete({animal: req.body.animal})
	res.send(`Animal '${req.body.animal}' deleted`)
})


app.listen(3000, () => console.log('Server running on port 3000...')) 
