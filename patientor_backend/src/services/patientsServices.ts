import patients from '../../data/patients';

import { Patient, NewPatient, PublicPatient, Entry, NewEntry } from '../types';

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

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  const id: string = Math.floor(Math.random() * 10000).toString();

  const entryToAdd: Entry = { ...newEntry, id };
  patient.entries.push(entryToAdd);

  return patient;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry,
};
