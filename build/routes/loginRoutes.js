"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = __importDefault(require("../controllers/loginController"));
class ProductRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', loginController_1.default.list); /* obtener usuarios */
        this.router.post('/recover', loginController_1.default.recover); /* recuperar contraseña */
        this.router.post('/register', loginController_1.default.register); /* registrar usuario  */
        this.router.delete('/:id', loginController_1.default.delete); /* eliminar usuario */
    }
}
const indexRoutes = new ProductRoutes();
exports.default = indexRoutes.router;
