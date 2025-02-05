"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMetaData = exports.UserMaster = exports.Specialization = exports.SlotMaster = exports.Review = exports.Prescription = exports.AppointmentHistory = exports.Appointment = void 0;
const appointment_1 = __importDefault(require("./appointment"));
exports.Appointment = appointment_1.default;
const appointmentHistory_1 = __importDefault(require("./appointmentHistory"));
exports.AppointmentHistory = appointmentHistory_1.default;
const prescription_1 = __importDefault(require("./prescription"));
exports.Prescription = prescription_1.default;
const review_1 = __importDefault(require("./review"));
exports.Review = review_1.default;
const slot_1 = __importDefault(require("./slot"));
exports.SlotMaster = slot_1.default;
const specialization_1 = __importDefault(require("./specialization"));
exports.Specialization = specialization_1.default;
const user_1 = __importDefault(require("./user"));
exports.UserMaster = user_1.default;
const userMetaData_1 = __importDefault(require("./userMetaData"));
exports.UserMetaData = userMetaData_1.default;
//# sourceMappingURL=index.js.map