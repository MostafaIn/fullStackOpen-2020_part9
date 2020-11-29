"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNever = exports.toNewEntry = exports.toNewPatient = void 0;
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
var types_1 = require("./types");
var isString = function (text) {
    return typeof text === 'string' || text instanceof String;
};
var isDate = function (date) {
    return Boolean(Date.parse(date));
};
var isGender = function (param) {
    return Object.values(types_1.Gender).includes(param);
};
var isRating = function (param) {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
var isValidNewEntryType = function (entry) {
    var healthCheck = entry.type === 'HealthCheck';
    var occupationalHealthcare = entry.type === 'OccupationalHealthcare';
    var hospital = entry.type === 'Hospital';
    return healthCheck || occupationalHealthcare || hospital;
};
var parseEntry = function (entry) {
    if (!entry || !isValidNewEntryType(entry)) {
        throw new Error("Incorrect or missing entry type: " + entry);
    }
    return entry;
};
var parseString = function (paramLabel, param) {
    if (!param || !isString(param)) {
        throw new Error("Incorrect or missing param: " + paramLabel + " " + param);
    }
    return param;
};
var parseDate = function (date) {
    if (!date || !isDate(date) || !isString(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};
var parseOccupation = function (occupation) {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation: " + occupation);
    }
    return occupation;
};
var parseGender = function (gender) {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};
var parseRating = function (rating) {
    if (!rating) {
        throw new Error("Incorrect or missing rate: " + rating);
    }
    var rate = parseInt(rating);
    if (isNaN(rate) || !isRating(rate)) {
        throw new Error('Incorrect rate');
    }
    return rate;
};
var parseArrayofStringCodes = function (data) {
    if (!data)
        return [];
    var codes = [];
    try {
        var dataCodes = typeof data === 'object' ? data : JSON.parse(data);
        if (!Array.isArray(dataCodes))
            throw new Error('Incorrect Array of codes');
        dataCodes.forEach(function (code) {
            if (!isString(code)) {
                throw new Error('Incorrect Array of codes');
            }
            codes.push(code);
        });
    }
    catch (error) {
        throw new Error(error);
    }
    return codes;
};
exports.toNewPatient = function (object) {
    return {
        name: parseString('name', object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
    };
};
exports.toNewEntry = function (object) {
    var validEntryType = parseEntry(object);
    if (!validEntryType)
        throw new Error('Entry not valid!');
    var newBaseEntry = {
        id: Math.floor(Math.random() * 10000).toString(),
        description: parseString('description', validEntryType.description),
        date: parseDate(validEntryType.date),
        specialist: parseString('specialist', validEntryType.specialist),
    };
    if (object.diagnosisCodes) {
        newBaseEntry.diagnosisCodes = parseArrayofStringCodes(object.diagnosisCodes);
    }
    switch (validEntryType.type) {
        case 'HealthCheck':
            return __assign(__assign({}, newBaseEntry), { type: validEntryType.type, healthCheckRating: parseRating(object.healthCheckRating) });
        case 'Hospital':
            var discharge = void 0;
            if (object.discharge.date && object.discharge.criteria) {
                discharge = {
                    date: parseDate(object.discharge.date),
                    criteria: parseString('criteria', object.discharge.criteria),
                };
            }
            return __assign(__assign({}, newBaseEntry), { type: validEntryType.type, discharge: discharge });
        case 'OccupationalHealthcare':
            var sickLeave = void 0;
            if (object.sickLeave.startDate && object.sickLeave.endDate) {
                sickLeave = {
                    startDate: parseDate(object.sickLeave.startDate),
                    endDate: parseDate(object.sickLeave.endDate),
                };
            }
            return __assign(__assign({}, newBaseEntry), { type: validEntryType.type, employerName: parseString('employerName', object.employerName), sickLeave: sickLeave });
        default:
            throw new Error('Incorrect entry type!');
    }
};
// Helper function for exhaustive type checking
exports.assertNever = function (value) {
    throw new Error("Unhandled discriminated union member: " + JSON.stringify(value));
};
