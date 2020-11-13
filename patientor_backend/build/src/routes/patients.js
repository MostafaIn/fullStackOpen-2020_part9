"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
var express_1 = __importDefault(require("express"));
var patientsServices_1 = __importDefault(require("../services/patientsServices"));
var utils_1 = __importDefault(require("../utils"));
var router = express_1.default.Router();
router.get('/', function (_req, res) {
    res.send(patientsServices_1.default.getPatients());
});
router.get('/:id', function (req, res) {
    console.log(req.params.id);
    var patient = patientsServices_1.default.getPatient(req.params.id);
    res.send(patient);
});
router.post('/', function (req, res) {
    try {
        var newPatient = utils_1.default(req.body);
        var addedpatient = patientsServices_1.default.addPatient(newPatient);
        res.json(addedpatient);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});
exports.default = router;
