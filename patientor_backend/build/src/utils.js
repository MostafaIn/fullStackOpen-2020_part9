"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
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
var parseName = function (name) {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
var parseDateOfBirth = function (dateOfBirth) {
    if (!dateOfBirth || !isDate(dateOfBirth) || !isString(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth' + dateOfBirth);
    }
    return dateOfBirth;
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
var toNewPatient = function (object) {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
    };
};
exports.default = toNewPatient;
