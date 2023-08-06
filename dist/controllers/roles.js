"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoles = void 0;
const database_1 = __importDefault(require("../database"));
const getRoles = async (req, res) => {
    try {
        const response = await database_1.default.query("Select * from tbl_rol");
        return res.status(200).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }
};
exports.getRoles = getRoles;
