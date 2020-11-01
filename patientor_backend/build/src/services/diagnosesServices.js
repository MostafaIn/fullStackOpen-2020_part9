"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var diagnoses_json_1 = __importDefault(require("../../data/diagnoses.json"));
var diagnoses = diagnoses_json_1.default;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var getDiagnoses = function () {
    return diagnoses;
};
exports.default = {
    getDiagnoses: getDiagnoses,
};
