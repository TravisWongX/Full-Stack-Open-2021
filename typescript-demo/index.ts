// import express from 'express'
import express = require('express')
const app = express()
import calculator from './calculator'

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body

  const result = calculator(value1, value2, op)
  res.send(result)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
