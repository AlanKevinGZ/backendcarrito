"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const database_1 = __importDefault(require("../database"));
class loginController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* seleccionamos todo los usuarios */
            database_1.default.promise().query("SELECT * FROM login ")
                .then(([rows]) => {
                res.json(rows);
            })
                .catch(() => {
                console.log('error');
            });
        });
    }
    recover(req, res) {
        /* recuperamos contraseña por correo */
        database_1.default.promise().query(`SELECT password FROM login WHERE correo = "${req.body.correo}" `)
            .then(([rows]) => {
            res.json(rows);
        })
            .catch(() => {
            console.log('error no se encontro la contraseña');
        });
    }
    register(req, res) {
        /* registramos un usuario en la base de datos */
        database_1.default.promise().query(`INSERT INTO login (nombre_completo,nombre_usuario,correo,password) VALUES 
        ('${req.body.nombre_completo}', '${req.body.nombre_usuario}',
        '${req.body.correo}','${req.body.password}')`)
            .then(([rows, fields]) => {
            console.log(rows);
        })
            .catch(() => console.log('error al registrar'))
            .then(() => console.log('registrado'));
        res.json({ message: 'usuario registrado' });
    }
    delete(req, res) {
        /* eliminamos un usuario de la base de datos */
        database_1.default.promise().query(`DELETE FROM login WHERE id=${req.params.id}`)
            .then(([rows, fields]) => {
            console.log(rows);
        })
            .catch(() => console.log('error al eliminar'))
            .then(() => console.log('eliminado'));
        res.json({ message: 'usuario eliminado' });
    }
}
exports.LoginController = new loginController();
exports.default = exports.LoginController;
