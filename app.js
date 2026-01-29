import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World: DEV')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
