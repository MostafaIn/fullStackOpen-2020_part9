import diagnosesData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosesData;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
