"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const keys_1 = __importDefault(require("./keys"));
const pool = mysql2_1.default.createPool(keys_1.default.database);
/* conexion  a la base de datos */
pool.getConnection(function (err, conn) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('DB is conected');
    }
});
exports.default = pool;
