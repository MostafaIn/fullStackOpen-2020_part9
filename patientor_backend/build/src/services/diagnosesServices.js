"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var diagnoses_1 = __importDefault(require("../../data/diagnoses"));
// const diagnoses: Array<Diagnosis> = diagnosesData;
var getDiagnoses = function () {
    return diagnoses_1.default;
};
exports.default = {
    getDiagnoses: getDiagnoses,
};
