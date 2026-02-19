import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'


import dotenv from 'dotenv'
import { MongoClient, ServerApiVersion } from 'mongodb'

dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


app.use(express.static(join(__dirname, 'public')))
app.use(express.json())

const uri = process.env.MONGO_URI

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

let db

async function connectDB() {
  try {
    await client.connect()
    await client.db("admin").command({ ping: 1 })
    console.log("Connected to MongoDB")

    db = client.db("test")
  } catch (err) {
    console.error("Mongo error:", err)
  }
}

connectDB()

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from API (Checkpoint 2)' })
})

app.get('/api/query', (req, res) => {
  res.json({ message: `Hello ${req.query.name}` })
})

app.post('/api/body', (req, res) => {
  res.json({ message: `Hello ${req.body.name}` })
})


app.get('/api/db-test', async (req, res) => {
  try {
    const data = await db.collection("demo").find().toArray()
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: "Database error" })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
