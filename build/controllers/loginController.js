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
    listuser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* seleccionamos todos los usuarios */
            database_1.default.promise().query('SELECT * FROM usuario')
                .then(([rows]) => {
                res.json(rows);
            })
                .catch(() => {
                console.log('error');
            });
        });
    }
    listdirc(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* seleccionamos todos las direcciones */
            database_1.default.promise().query('SELECT * FROM usuario_direccion')
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
            /* seleccionamos todos los roles */
            database_1.default.promise().query('SELECT * FROM rol')
                .then(([rows]) => {
                res.json(rows);
            })
                .catch(() => {
                console.log('error');
            });
        });
    }
    listuserrol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* mostramos la direccion de cada usuario*/
            database_1.default.promise().query('SELECT usuario.nombre, rol.nombre_rol FROM rol INNER JOIN usuario WHERE usuario.Id_rol=rol.Id_rol')
                .then(([rows]) => {
                res.json(rows);
            })
                .catch(() => {
                console.log('error');
            });
        });
    }
    listuserdirc(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* mostramos el rol de cada usuario*/
            database_1.default.promise().query(`SELECT usuario.nombre, usuario_direccion.calle,numero,colonia,municipio,estado,pais,codigo_postal FROM
        usuario_direccion INNER JOIN usuario WHERE usuario.Id_usuario=usuario_direccion.Id_usuario `)
                .then(([rows]) => {
                res.json(rows);
            })
                .catch(() => {
                console.log('error');
            });
        });
    }
    listid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* obtenemos un un producto por el id */
            database_1.default.promise().query(`SELECT * FROM  usuario_direccion,usuario,rol WHERE usuario_direccion.id_usuario=${req.params.id} 
        AND usuario.id_usuario=${req.params.id} AND rol.id_rol=${req.params.id} `)
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
    recover(req, res) {
        /* recuperamos contraseña por correo */
        database_1.default.promise().query(`SELECT password FROM usuario WHERE correo = "${req.body.correo}" `)
            .then(([rows]) => {
            res.json(rows);
        })
            .catch(() => {
            console.log('error no se encontro la contraseña');
        });
    }
    register(req, res) {
        /* registramos un usuario en la base de datos */
        database_1.default.promise().query(`INSERT INTO rol (id_rol,nombre_rol) VALUES 
        ('${req.body.id_rol}', '${req.body.nombre_rol}')`);
        database_1.default.promise().query(`INSERT INTO usuario (id_usuario,nombre,id_rol,password,correo) VALUES
        ('${req.body.id_usuario}', '${req.body.nombre}', '${req.body.id_rol}'
        ,'${req.body.password}', '${req.body.correo}')`);
        database_1.default.promise().query(`INSERT INTO usuario_direccion (id_usuario_direccion,id_usuario,calle,numero,colonia,municipio,estado,pais,codigo_postal) VALUES
        ('${req.body.id_usuario_direccion}', '${req.body.id_usuario}', '${req.body.calle}'
        ,'${req.body.numero}', '${req.body.colonia}', '${req.body.municipio}'
        , '${req.body.estado}', '${req.body.pais}', '${req.body.codigo_postal}')`)
            .then(([rows, fields]) => {
            console.log(rows);
        })
            .catch(() => console.log('error al registrar'))
            .then(() => console.log('registrado'));
        res.json({ message: 'usuario registrado' });
    }
    delete(req, res) {
        /* eliminamos un usuario de la base de datos */
        database_1.default.promise().query(`DELETE usuario_direccion,usuario,rol FROM usuario_direccion,usuario,rol WHERE 
        usuario_direccion.id_usuario=${req.params.id} AND usuario.id_usuario=${req.params.id} AND rol.id_rol=${req.params.id} `)
            .then(([rows, fields]) => {
            console.log(rows);
        })
            .catch(() => console.log('error al eliminar'))
            .then(() => console.log('eliminado'));
        res.json({ message: 'usuario eliminado' });
    }
    update(req, res) {
        /* actualizamos un usuario de la base de datos */
        database_1.default.promise().query(`UPDATE usuario_direccion,usuario,rol SET ? WHERE
        usuario_direccion.id_usuario=${req.params.id} AND usuario.id_usuario=${req.params.id} AND rol.id_rol=${req.params.id}`, [req.body])
            .then(([rows, fields]) => {
            console.log(rows);
        })
            .catch(() => console.log('error al editar '))
            .then(() => console.log('editado...'));
        res.json({ message: 'usuario editado..' });
    }
}
exports.LoginController = new loginController();
exports.default = exports.LoginController;
