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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var patients_1 = __importDefault(require("../../data/patients"));
// const patients: Array<Patient> = patientData as Patient[];
var getPatients = function () {
    return patients_1.default.map(function (_a) {
        var id = _a.id, name = _a.name, dateOfBirth = _a.dateOfBirth, gender = _a.gender, occupation = _a.occupation;
        return ({
            id: id,
            name: name,
            dateOfBirth: dateOfBirth,
            gender: gender,
            occupation: occupation,
        });
    });
};
var getPatient = function (id) {
    return patients_1.default.find(function (patient) { return patient.id === id; });
};
var addPatient = function (patient) {
    var newPatient = __assign(__assign({ id: Math.floor(Math.random() * 10000).toString() }, patient), { entries: [] });
    patients_1.default.push(newPatient);
    return newPatient;
};
var addEntry = function (patient, newEntry) {
    var id = Math.floor(Math.random() * 10000).toString();
    var entryToAdd = __assign(__assign({}, newEntry), { id: id });
    patient.entries.push(entryToAdd);
    return patient;
};
exports.default = {
    getPatients: getPatients,
    getPatient: getPatient,
    addPatient: addPatient,
    addEntry: addEntry,
};
