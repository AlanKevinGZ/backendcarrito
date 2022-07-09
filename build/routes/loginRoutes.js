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
        this.router.get('/usuarios', loginController_1.default.listusuario); /* obtener usuarios */
        this.router.get('/direccion', loginController_1.default.listdireccion); /* obtener direcciones */
        this.router.get('/', loginController_1.default.listurd); /* obtener usuarios, direcciones y roles */
        this.router.get('/useryrol', loginController_1.default.listuseryrol); /* obtener usuarios y su rol*/
        this.router.get('/userydirc', loginController_1.default.listuserydirc); /* obtener usuarios y su direccion*/
        this.router.get('/userrol', loginController_1.default.listuserrol); /* obtener tabla userrol relacionada*/
        this.router.post('/login', loginController_1.default.login); /* ingresar usuario*/
        this.router.post('/recover', loginController_1.default.recover); /* recuperar contraseña */
        this.router.post('/registeruser', loginController_1.default.registeruser); /* registrar usuario  */
        this.router.post('/registerdirc', loginController_1.default.registerdirc); /* registrar direccion de usuario  */
        this.router.post('/registerusr', loginController_1.default.registeruserrol); /* registrar el rol del usuario */
        this.router.delete('/:id', loginController_1.default.delete); /* eliminar usuario */
        this.router.put('/:id', loginController_1.default.update); /* actualizar usuario */
    }
}
const indexRoutes = new LoginRoutes();
exports.default = indexRoutes.router;
