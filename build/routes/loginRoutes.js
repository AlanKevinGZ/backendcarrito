"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = __importDefault(require("../controllers/loginController"));
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/usuarios', loginController_1.default.listuser); /* obtener usuarios */
        this.router.get('/direcciones', loginController_1.default.listdirc); /* obtener direcciones */
        this.router.get('/roles', loginController_1.default.listrol); /* obtener roles*/
        this.router.get('/userrol', loginController_1.default.listuserrol); /* obtener usuarios y su rol*/
        this.router.get('/userdirc', loginController_1.default.listuserdirc); /* obtener usuarios y su direccion*/
        this.router.get('/:id', loginController_1.default.listid); /* obtener usuario direccion y rol por id*/
        this.router.post('/recover', loginController_1.default.recover); /* recuperar contraseña */
        this.router.post('/register', loginController_1.default.register); /* registrar usuario  */
        this.router.delete('/:id', loginController_1.default.delete); /* eliminar usuario */
        this.router.put('/:id', loginController_1.default.update); /* actualizar usuario */
    }
}
const indexRoutes = new LoginRoutes();
exports.default = indexRoutes.router;
