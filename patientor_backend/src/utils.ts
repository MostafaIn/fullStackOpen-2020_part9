/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Gender,
  NewPatient,
  BaseEntry,
  NewEntry,
  HealthCheckRating,
  Diagnosis,
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

const isValidNewEntryType = (entry: any): entry is NewEntry => {
  const healthCheck: boolean = entry.type === 'HealthCheck';
  const occupationalHealthcare: boolean =
    entry.type === 'OccupationalHealthcare';
  const hospital: boolean = entry.type === 'Hospital';

  return healthCheck || occupationalHealthcare || hospital;
};

const parseEntry = (entry: any): NewEntry => {
  if (!entry || !isValidNewEntryType(entry)) {
    throw new Error(`Incorrect or missing entry type: ${entry}`);
  }

  return entry;
};

const parseString = (paramLabel: string, param: any): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing param: ${paramLabel} ${param}`);
  }
  return param;
};

const parseDate = (date: any): string => {
  if (!date || !isDate(date) || !isString(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseRating = (rating: any): HealthCheckRating => {
  if (!rating) {
    throw new Error(`Incorrect or missing rate: ${rating}`);
  }
  const rate: number = parseInt(rating);
  if (isNaN(rate) || !isRating(rate)) {
    throw new Error('Incorrect rate');
  }
  return rate;
};

const parseArrayofStringCodes = (data: any): Array<Diagnosis['code']> => {
  if (!data) return [];
  const codes: Array<Diagnosis['code']> = [];

  try {
    const dataCodes: Array<Diagnosis['code']> =
      typeof data === 'object' ? data : JSON.parse(data);
    if (!Array.isArray(dataCodes)) throw new Error('Incorrect Array of codes');

    dataCodes.forEach((code) => {
      if (!isString(code)) {
        throw new Error('Incorrect Array of codes');
      }
      codes.push(code);
    });
  } catch (error) {
    throw new Error(error);
  }
  return codes;
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString('name', object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
  };
};

export const toNewEntry = (object: any): NewEntry => {
  let validEntryType = parseEntry(object);
  if(!validEntryType) throw new Error('Entry not valid!');

  const newBaseEntry: BaseEntry = {
    id: Math.floor(Math.random() * 10000).toString(),
    description: parseString('description', validEntryType.description),
    date: parseDate(validEntryType.date),
    specialist: parseString('specialist', validEntryType.specialist),
  };
  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseArrayofStringCodes(
      object.diagnosisCodes,
    );
  }
  switch (validEntryType.type) {
    case 'HealthCheck':
      return {
        ...newBaseEntry,
        type: validEntryType.type,
        healthCheckRating: parseRating(object.healthCheckRating),
      };
    case 'Hospital':
      let discharge;
      if(object.discharge.date && object.discharge.criteria){
        discharge = {
          date: parseDate(object.discharge.date),
          criteria: parseString('criteria', object.discharge.criteria),
        };
      }
      return {
        ...newBaseEntry,
        type: validEntryType.type,
        discharge
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
        type: validEntryType.type,
        employerName: parseString('employerName', object.employerName),
        sickLeave,
      };
    default:
      throw new Error('Incorrect entry type!');
  }
};

// Helper function for exhaustive type checking
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};
