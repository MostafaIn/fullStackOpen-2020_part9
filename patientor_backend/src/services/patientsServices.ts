import patients from '../../data/patients';

import { Patient, NewPatient, PublicPatient, Entry } from '../types';

// const patients: Array<Patient> = patientData as Patient[];

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: Math.floor(Math.random() * 10000).toString(),
    ...patient,
    entries: [],
  };

  [...patients, newPatient];
  return newPatient;
};

const addEntry = (patientId: string, entry: Entry): Entry => {
  const patient: Patient | undefined = getPatient(patientId);
  if (!patient) {
    throw new Error('Incorrect patient Id');
  }
  patient.entries.push(entry);
  return entry;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry,
};
