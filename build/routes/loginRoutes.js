"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = __importDefault(require("../controllers/loginController"));
const loginController_2 = __importDefault(require("../controllers/loginController"));
const jwt = require('jsonwebtoken');
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/usuarios', loginController_1.default.listusuario); /* obtener usuarios */
        this.router.get('/direccion', loginController_1.default.listdireccion); /* obtener direcciones */
        this.router.get('/', loginController_1.default.listurd); /* obtener usuarios, direcciones y roles */
        this.router.get('/rol', loginController_1.default.listrol); /* obtener tabla usuario y rol*/
        this.router.get('/:id', loginController_1.default.iduser); /* obtener usuario por id*/
        this.router.post('/registeruser', loginController_1.default.registeruser); /* registrar usuario  */
        this.router.post('/registerdirc', loginController_1.default.registerdirc); /* registrar direccion de usuario  */
        this.router.delete('/:id', loginController_1.default.delete); /* eliminar usuario */
        this.router.put('/:id', loginController_1.default.update); /* actualizar usuario */
        this.router.post('/login', loginController_1.default.login);
        this.router.post('/test', verifyToken, loginController_2.default.test);
    }
}
function verifyToken(req, res, next) {
    if (!req.headers.authorization)
        return res.status(401).json('no autorizado');
    const token = req.headers.authorization.substring(7);
    if (token !== '') {
        const content = jwt.verify(token, 'stil');
        console.log(content);
    }
}
const indexRoutes = new LoginRoutes();
exports.default = indexRoutes.router;
