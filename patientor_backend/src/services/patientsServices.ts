import patientData from '../../data/patients.json';

import { Patient, NewPatient } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: Math.floor(Math.random() * 10000).toString(),
    ...patient,
  };

  [...patients, newPatient];
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
