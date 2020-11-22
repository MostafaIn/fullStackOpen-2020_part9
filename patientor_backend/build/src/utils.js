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
exports.toNewEntry = exports.toNewPatient = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
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
var isArrayofString = function (param) {
    return param.some(function (item) { return !isString(item); });
};
var parseString = function (paramLabel, param) {
    if (!param || !isString(param)) {
        throw new Error("Incorrect or missing param: " + paramLabel + " " + param);
    }
    return param;
};
var parseDate = function (date) {
    if (!date || !isDate(date) || !isString(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
var parseOccupation = function (occupation) {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
var parseGender = function (gender) {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender' + gender);
    }
    return gender;
};
var parseRating = function (rating) {
    if (!rating) {
        throw new Error('Incorrect or missing rate' + rating);
    }
    var rate = parseInt(rating);
    if (isNaN(rate) || !isRating(rate)) {
        throw new Error('Incorrect rate');
    }
    return rate;
};
var parseArrayofString = function (label, data) {
    if (!data)
        return [];
    if (!isArrayofString(data)) {
        throw new Error('Incorrect of missing data' + data);
    }
    data.forEach(function (code) {
        if (!isString(code)) {
            throw new Error('Incorrect code label' + label);
        }
    });
    return data;
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
    var newBaseEntry = {
        id: Math.floor(Math.random() * 10000).toString(),
        description: parseString('description', object.description),
        date: parseDate(object.date),
        specialist: parseString('specialist', object.specialist),
    };
    if (object.diagnosisCodes) {
        newBaseEntry.diagnosisCodes = parseArrayofString('diagnosisCodes', object.diagnosisCodes);
    }
    switch (object.type) {
        case 'HealthCheck':
            return __assign(__assign({}, newBaseEntry), { type: 'HealthCheck', healthCheckRating: parseRating(object.healthCheckRating) });
        case 'Hospital':
            return __assign(__assign({}, newBaseEntry), { type: 'Hospital', discharge: {
                    date: parseDate(object.date),
                    criteria: parseString('criteria', object.criteria),
                } });
        case 'OccupationalHealthcare':
            var sickLeave = void 0;
            if (object.sickLeave.startDate && object.sickLeave.endDate) {
                sickLeave = {
                    startDate: parseDate(object.sickLeave.startDate),
                    endDate: parseDate(object.sickLeave.endDate),
                };
            }
            return __assign(__assign({}, newBaseEntry), { type: 'OccupationalHealthcare', employerName: parseString('employerName', object.employerName), sickLeave: sickLeave });
        default:
            throw new Error('Incorrect entry type!');
    }
};
