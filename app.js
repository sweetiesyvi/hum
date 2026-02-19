import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'
import { MongoClient, ServerApiVersion } from 'mongodb'

dotenv.config()

const app = express()

// Paths
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(join(__dirname, 'public')))
app.use(express.json())

const uri = process.env.MONGO_URI

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

let db

async function connectDB() {
  try {
    await client.connect()
    db = client.db("test") // database name
    console.log("Connected to MongoDB")
  } catch (err) {
    console.error(" MongoDB connection error:", err)
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
    await db.command({ ping: 1 })
    res.json({ message: "MongoDB is working" })
  } catch (err) {
    res.status(500).json({ error: "DB connection failed" })
  }
})

app.post('/api/save', async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ error: "Name is required" })
    }

    const result = await db.collection("demo").insertOne({
      name,
      createdAt: new Date()
    })

    res.json({
      message: "Saved to database",
      id: result.insertedId
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Save failed" })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

  console.log(`Server running on port ${PORT}`)
})
