/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import patientsServices from '../services/patientsServices';
import { toNewPatient, toNewEntry } from '../utils';
import { NewPatient, Entry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsServices.getPatients());
});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  const patient = patientsServices.getPatient(req.params.id);
  res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedpatient = patientsServices.addPatient(newPatient);

    res.json(addedpatient);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry: Entry = toNewEntry(req.body);
    const addedEntry = patientsServices.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
