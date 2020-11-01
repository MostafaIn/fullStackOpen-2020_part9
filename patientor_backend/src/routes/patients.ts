/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import patientsServices from '../services/patientsServices';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsServices.getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedpatient = patientsServices.addPatient(newPatient);

    res.json(addedpatient);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
