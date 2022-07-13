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
const jwt = require('jsonwebtoken');
class loginController {
    listusuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* seleccionamos todos los usuarios*/
            database_1.default.promise().query(`SELECT * FROM usuario`)
                .then(([rows]) => {
                res.json(rows);
            })
                .catch(() => {
                console.log('error');
            });
        });
    }
    listdireccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* seleccionamos la direccion de los usuarios*/
            database_1.default.promise().query(`SELECT * FROM direccionus`)
                .then(([rows]) => {
                res.json(rows);
            })
                .catch(() => {
                console.log('error');
            });
        });
    }
    listurd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* seleccionamos todos los usuarios, con su rol y su direccion */
            database_1.default.promise().query(`SELECT usuario.id_usuario,nombre,correo,password,usuario.id_rol,calle,numero,colonia,municipio,estado,pais,codigo_postal 
        FROM usuario,rol,direccionus where rol.id_rol=usuario.id_rol and direccionus.id_usuario=usuario.id_usuario `)
                .then(([rows]) => {
                res.json(rows);
            })
                .catch(() => {
                console.log('error');
            });
        });
    }
    listrol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* mostramos el rol del usuario*/
            database_1.default.promise().query(`SELECT usuario.id_usuario,nombre,nombre_rol FROM usuario,rol where rol.id_rol=usuario.id_rol `)
                .then(([rows]) => {
                res.json(rows);
            })
                .catch(() => {
                console.log('error');
            });
        });
    }
    iduser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* mostramos un usuario por el id */
            database_1.default.promise().query(`SELECT usuario.id_usuario,nombre,correo,password,usuario.id_rol,calle,numero,colonia,municipio,estado,pais,codigo_postal FROM 
        usuario,rol,direccionus where rol.id_rol=usuario.id_rol and direccionus.id_usuario=usuario.id_usuario and usuario.id_usuario = ${req.params.id} `)
                .then(([rows]) => {
                if (Object.keys(rows).length !== 0) {
                    return res.json(rows);
                }
                else {
                    res.status(400).json({ text: 'no existe el usuario' });
                }
            })
                .catch(() => {
                console.log('error');
            });
        });
    }
    login(req, res) {
        /* ingresar usuario */
        database_1.default.promise().query(`SELECT nombre,id_rol FROM usuario WHERE correo = "${req.body.correo}" AND password = "${req.body.password}"`)
            .then(([rows, fields]) => {
            if (Object(rows).length > 0) {
                let data = JSON.stringify(Object(rows)[0]);
                const token = jwt.sign(data, 'still');
                res.json({ token });
            }
            else {
                res.json('Usuario o clave incorrecto');
            }
        })
            .catch(() => console.log('error no existe el usuario '));
    }
    /*
    public test ( req:Request,res:Response ){
        res.json('informacion secreta');
    }*/
    registeruser(req, res) {
        /* registramos un usuario en la base de datos */
        database_1.default.promise().query(`insert into usuario (nombre,password,correo,id_rol)  values ('${req.body.nombre}','${req.body.password}',
        '${req.body.correo}','${req.body.id_rol}')`)
            .then(([rows, fields]) => {
            console.log(rows);
        })
            .catch(() => console.log('error al registrar'))
            .then(() => console.log('registrado'));
        res.json({ message: 'usuario registrado' });
    }
    registerdirc(req, res) {
        /* registramos un usuario en la base de datos */
        database_1.default.promise().query(`insert into direccionus (calle,numero,colonia,municipio,estado,pais,codigo_postal) values 
        ('${req.body.calle}','${req.body.numero}','${req.body.colonia}','${req.body.municipio}','${req.body.estado}',
        '${req.body.pais}','${req.body.codigo_postal}')`)
            .then(([rows, fields]) => {
            console.log(rows);
        })
            .catch(() => console.log('error al registrar'))
            .then(() => console.log('registrado'));
        res.json({ message: 'direccion de usuario registrada' });
    }
    delete(req, res) {
        /* eliminamos un usuario de la base de datos */
        database_1.default.promise().query(`DELETE usuario,direccionus FROM usuario,direccionus WHERE usuario.id_usuario = direccionus.id_usuario 
        and usuario.id_usuario = ${req.params.id}`)
            .then(([rows, fields]) => {
            console.log(rows);
        })
            .catch(() => console.log('error al eliminar'))
            .then(() => console.log('eliminado'));
        res.json({ message: 'usuario eliminado' });
    }
    update(req, res) {
        /* actualizamos un usuario de la base de datos */
        database_1.default.promise().query(`UPDATE usuario,direccionus SET ? WHERE usuario.id_usuario = direccionus.id_usuario  and 
        usuario.id_usuario = ${req.params.id}`, [req.body])
            .then(([rows, fields]) => {
            console.log(rows);
        })
            .catch(() => console.log('error al editar '))
            .then(() => console.log('editando...'));
        res.json({ message: 'usuario editado..' });
    }
}
exports.LoginController = new loginController();
exports.default = exports.LoginController;
