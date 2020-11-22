/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Gender,
  NewPatient,
  BaseEntry,
  Entry,
  HealthCheckRating,
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isArrayofString = (param: any[]): param is string[] => {
  return param.some((item) => !isString(item));
};

const parseString = (paramLabel: string, param: any): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing param: ${paramLabel} ${param}`);
  }
  return param;
};

const parseDate = (date: any): string => {
  if (!date || !isDate(date) || !isString(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender' + gender);
  }
  return gender;
};

const parseRating = (rating: any): HealthCheckRating => {
  if (!rating) {
    throw new Error('Incorrect or missing rate' + rating);
  }
  const rate: number = parseInt(rating);
  if (isNaN(rate) || !isRating(rate)) {
    throw new Error('Incorrect rate');
  }
  return rate;
};

const parseArrayofString = (label: string, data: any): string[] => {
  if (!data) return [];
  if (!isArrayofString(data)) {
    throw new Error('Incorrect of missing data' + data);
  }
  data.forEach((code) => {
    if (!isString(code)) {
      throw new Error('Incorrect code label' + label);
    }
  });
  return data;
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString('name', object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
  };
};

export const toNewEntry = (object: any): Entry => {
  const newBaseEntry: BaseEntry = {
    id: Math.floor(Math.random() * 10000).toString(),
    description: parseString('description', object.description),
    date: parseDate(object.date),
    specialist: parseString('specialist', object.specialist),
  };
  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseArrayofString(
      'diagnosisCodes',
      object.diagnosisCodes,
    );
  }
  switch (object.type) {
    case 'HealthCheck':
      return {
        ...newBaseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseRating(object.healthCheckRating),
      };
    case 'Hospital':
      return {
        ...newBaseEntry,
        type: 'Hospital',
        discharge: {
          date: parseDate(object.date),
          criteria: parseString('criteria', object.criteria),
        },
      };
    case 'OccupationalHealthcare':
      let sickLeave;
      if (object.sickLeave.startDate && object.sickLeave.endDate) {
        sickLeave = {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate),
        };
      }
      return {
        ...newBaseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString('employerName', object.employerName),
        sickLeave,
      };
    default:
      throw new Error('Incorrect entry type!');
  }
};
