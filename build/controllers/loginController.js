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
    listusuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* seleccionamos todos los usuarios, con su rol y su direccion */
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
            /* seleccionamos todos los usuarios, con su rol y su direccion */
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
            database_1.default.promise().query(`SELECT usuario.id_usuario,nombre,password,correo,nombre_rol,calle,numero,colonia,municipio,estado,pais,codigo_postal FROM 
        usuario,rol,direccionus,userrol where rol.id_rol=userrol.id_rol and userrol.id_usuario=usuario.id_usuario and direccionus.id_usuario=usuario.id_usuario`)
                .then(([rows]) => {
                res.json(rows);
            })
                .catch(() => {
                console.log('error');
            });
        });
    }
    listuseryrol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* mostramos el rol de cada usuario*/
            database_1.default.promise().query(`SELECT usuario.id_usuario,nombre,nombre_rol FROM usuario,rol,userrol where 
        rol.id_rol=userrol.id_rol and userrol.id_usuario=usuario.id_usuario`)
                .then(([rows]) => {
                res.json(rows);
            })
                .catch(() => {
                console.log('error');
            });
        });
    }
    listuserydirc(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* mostramos la direccion de cada usuario*/
            database_1.default.promise().query(`SELECT usuario.id_usuario,nombre,calle,numero,colonia,municipio,estado,pais,codigo_postal FROM 
        usuario,direccionus,userrol where userrol.id_usuario=usuario.id_usuario and direccionus.id_usuario=usuario.id_usuario`)
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
            /* mostramos el userrol relacionado*/
            database_1.default.promise().query(`SELECT userrol.id_userrol,userrol.id_usuario,userrol.id_rol,nombre,nombre_rol FROM usuario,rol,direccionus,userrol where 
        rol.id_rol=userrol.id_rol and userrol.id_usuario=usuario.id_usuario and direccionus.id_usuario=usuario.id_usuario`)
                .then(([rows]) => {
                res.json(rows);
            })
                .catch(() => {
                console.log('error');
            });
        });
    }
    login(req, res) {
        /* recuperamos contraseña por correo */
        database_1.default.promise().query(`SELECT * FROM usuario WHERE usuario.correo = "${req.body.correo}" and usuario.password = "${req.body.password}" `)
            .then(([rows]) => {
            res.json(rows);
        })
            .catch(() => {
            console.log('usuario no registrado');
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
    registeruser(req, res) {
        /* registramos un usuario en la base de datos */
        database_1.default.promise().query(`insert into usuario (nombre,password,correo)  values ('${req.body.nombre}','${req.body.password}','${req.body.correo}')`)
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
        ('${req.body.calle}','${req.body.numero}','${req.body.colonia}','${req.body.municipio}','${req.body.estadio}',
        '${req.body.pais}','${req.body.codigo_postal}')`)
            .then(([rows, fields]) => {
            console.log(rows);
        })
            .catch(() => console.log('error al registrar'))
            .then(() => console.log('registrado'));
        res.json({ message: 'direccion de usuario registrada' });
    }
    registeruserrol(req, res) {
        /* registramos un usuario en la base de datos */
        database_1.default.promise().query(`insert into userrol (id_usuario,id_rol) values (${req.body.id_usuario},${req.body.id_rol})`)
            .then(([rows, fields]) => {
            console.log(rows);
        })
            .catch(() => console.log('error al registrar'))
            .then(() => console.log('registrado'));
        res.json({ message: 'rol de usuario registrado' });
    }
    delete(req, res) {
        /* eliminamos un usuario de la base de datos */
        database_1.default.promise().query(`DELETE userrol,usuario,direccionus FROM userrol,usuario,direccionus WHERE 
        userrol.id_usuario = ${req.params.id} and usuario.id_usuario = ${req.params.id} and direccionus.id_usuario = ${req.params.id}`)
            .then(([rows, fields]) => {
            console.log(rows);
        })
            .catch(() => console.log('error al eliminar'))
            .then(() => console.log('eliminado'));
        res.json({ message: 'usuario eliminado' });
    }
    update(req, res) {
        /* actualizamos un usuario de la base de datos */
        database_1.default.promise().query(`UPDATE usuario,direccionus SET ? WHERE usuario.id_usuario = ${req.params.id} 
        and direccionus.id_usuario = ${req.params.id}`, [req.body])
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
