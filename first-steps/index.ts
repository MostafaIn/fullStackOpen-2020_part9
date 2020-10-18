import express from 'express'
import { calculateBMI } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    const { weight, height } = req.query
    const bmi = calculateBMI(Number(height), Number(weight))

    if(!isNaN(Number(height)) && !isNaN(Number(weight))){
        res.send({ 
            weight, 
            height, 
            bmi
        })
    }else{
        res.send({
            error: "malformatted parameters"

        })
    }
})

const PORT = 3003

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))