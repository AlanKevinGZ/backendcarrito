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
exports.gameController = void 0;
const database_1 = __importDefault(require("../database"));
/* obtener por get y post la lista de los productos por id o todos y post para crear un nuevo producto */
class GameController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* seleccionamos todo los productos */
            database_1.default.promise().query("SELECT * FROM productos ")
                .then(([rows]) => {
                res.json(rows);
            })
                .catch(() => {
                console.log('error');
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* obtenemos un un producto por el id */
            /*   res.json({text:'desde'+req.params.id}); */
            database_1.default.promise().query(`SELECT * FROM productos WHERE id = ${req.params.id} `)
                .then(([rows]) => {
                if (Object.keys(rows).length !== 0) {
                    return res.json(rows);
                }
                else {
                    res.status(400).json({ text: 'no existe el producto' });
                }
            })
                .catch(() => {
                console.log('error');
            });
        });
    }
    create(req, res) {
        /* creamos un producto en la base de datos */
        /*  pool.query( (`INSERT INTO productos (nombre_producto,
            categoria_producto,precio_producto,descripbr_producto,imagen) VALUES
        ('${req.body.nombre_producto}', '${req.body.categoria_producto}',
         '${ req.body.precio_producto}','${req.body.descripbr_producto}',
         '${req.body.imagen}')`)); */
        database_1.default.promise().query(`INSERT INTO productos (nombre_producto,
          categoria_producto,precio_producto,descripbr_producto,imagen) VALUES 
      ('${req.body.nombre_producto}', '${req.body.categoria_producto}',
       '${req.body.precio_producto}','${req.body.descripbr_producto}',
       '${req.body.imagen}')`)
            .then(([rows, fields]) => {
            console.log(rows);
        })
            .catch(() => console.log('error al crear '))
            .then(() => console.log('creado...'));
        res.json({ message: 'creando' });
    }
}
exports.gameController = new GameController();
exports.default = exports.gameController;
