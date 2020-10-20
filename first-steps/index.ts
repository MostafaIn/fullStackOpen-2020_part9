import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { weight, height } = req.query;
    const bmi = calculateBMI(Number(height), Number(weight));

    if(!isNaN(Number(height)) && !isNaN(Number(weight))){
        res.send({ 
            weight, 
            height, 
            bmi
        });
    }else{
        res.send({
            error: "malformatted parameters"

        });
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, dailyH } = req.body;

    if(!target || !dailyH){
        return res.json({ error: "parameters missing"});
    }else if(!Array.isArray(dailyH)){
        return res.json({ error: "malformatted parameters"});
    }

    return res.json(calculateExercises(target, dailyH));

});

const PORT = 3003;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));