import express from 'express'
import dotenv from 'dotenv'
import { MongoClient, ObjectId } from 'mongodb'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(join(__dirname, 'public')))
app.use(express.json())

const client = new MongoClient(process.env.MONGO_URI)
let db

async function connectDB() {
  try {
    await client.connect()
    db = client.db('school')
    console.log("MongoDB connected")
  } catch (err) {
    console.error("MongoDB connection error:", err)
  }
}

/* CREATE */
app.post('/api/users', async (req, res) => {
  const { name } = req.body

  await db.collection('users').insertOne({ name })

  res.json({ message: "User added" })
})

/* READ */
app.get('/api/users', async (req, res) => {

  const users = await db.collection('users')
    .find()
    .sort({ _id: -1 })
    .toArray()

  res.json(users)
})

/* UPDATE */
app.put('/api/users/:id', async (req, res) => {

  const { id } = req.params
  const { name } = req.body

  await db.collection('users').updateOne(
    { _id: new ObjectId(id) },
    { $set: { name } }
  )

  res.json({ message: "User updated" })
})

/* DELETE */
app.delete('/api/users/:id', async (req, res) => {

  const { id } = req.params

  await db.collection('users').deleteOne({
    _id: new ObjectId(id)
  })

  res.json({ message: "User deleted" })
})

const PORT = process.env.PORT || 3000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port", PORT)
  })
})
