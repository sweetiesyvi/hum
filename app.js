import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
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
    console.log(' Mongo connecté')
  } catch (err) {
    console.error(' Mongo erreur:', err)
  }
}
connectDB()

// ROUTES
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from API (Checkpoint 2)' })
})

app.get('/api/query', (req, res) => {
  res.json({ message: `Hello ${req.query.name}` })
})

app.get('/api/users', async (req, res) => {
  const users = await User.find().sort({ _id: -1 }).limit(10)
  res.json(users)
})

app.post('/api/body', (req, res) => {
  res.json({ message: `Hello ${req.body.name}` })
})

document.getElementById('loadUsers').addEventListener('click', () => {
  fetch('/api/users')
    .then(res => res.json())
    .then(users => {
      const list = document.getElementById('usersList')
      list.innerHTML = ''
      users.forEach(u => {
        const li = document.createElement('li')
        li.textContent = u.name
        list.appendChild(li)
      })
    })
})



app.get('/api/db-test', async (req, res) => {
  try {
    const result = await db.collection('test').insertOne({ time: new Date() })
    res.json({ ok: true, id: result.insertedId })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
