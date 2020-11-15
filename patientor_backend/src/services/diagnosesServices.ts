import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

// const diagnoses: Array<Diagnosis> = diagnosesData;

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
