import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

dotenv.config()

const app = express()

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(join(__dirname, 'public')))
app.use(express.json())

// Mongo setup
const client = new MongoClient(process.env.MONGO_URI)
let db

async function connectDB() {
  try {
    await client.connect()
    db = client.db('school')
    console.log('Mongo connected')
  } catch (err) {
    console.error('Mongo error:', err)
  }
}
connectDB()

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from API (Checkpoint 2)' })
})

app.post('/api/save', async (req, res) => {
  try {
    const { name } = req.body
    await db.collection('users').insertOne({ name })
    res.json({ message: `Saved ${name} to MongoDB` })
  } catch (err) {
    res.status(500).json({ error: 'DB save error' })
  }
})

app.get('/api/users', async (req, res) => {
  try {
    const users = await db
      .collection('users')
      .find()
      .sort({ _id: -1 })
      .limit(10)
      .toArray()

    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'DB read error' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
