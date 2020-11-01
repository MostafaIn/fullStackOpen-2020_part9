import express from 'express';
import cors from 'cors';

import diagnosesRouter from './src/routes/diagnoses';
import patientsRouter from './src/routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
