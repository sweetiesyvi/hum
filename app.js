import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const app = express()


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(join(__dirname, 'public')))
app.use(express.json())


app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from API (Checkpoint 2)' })
})

app.get('/api/query', (req, res) => {
  res.json({ message: `Hello ${req.query.name}` })
})

app.post('/api/body', (req, res) => {
  res.json({ message: `Hello ${req.body.name}` })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
