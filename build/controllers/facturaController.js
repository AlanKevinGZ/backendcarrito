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
exports.FacturaController = void 0;
const database_1 = __importDefault(require("../database"));
class facturaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* seleccionamos las facturas (con llaves foraneas) */
            database_1.default.promise().query("SELECT factura.id_factura, factura.fecha_emision, login.nombre_usuario, productos.nombre_producto, productos.categoria_producto, productos.precio_producto, productos.descripbr_producto, productos.imagen, productos.cantidad FROM factura INNER JOIN login, productos WHERE factura.nombre_usuario_fk = login.nombre_usuario AND factura.nombre_producto_fk = productos.nombre_producto AND factura.categoria_producto_fk = productos.categoria_producto AND factura.precio_producto_fk = productos.precio_producto AND factura.descripbr_producto_fk = productos.descripbr_producto AND factura.imagen_fk = productos.imagen AND factura.cantidad_fk = productos.cantidad")
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
            /*obtenemos una factura por el id*/
            database_1.default.promise().query(`SELECT * FROM factura WHERE id_factura = ${req.params.id} `)
                .then(([rows]) => {
                if (Object.keys(rows).length !== 0) {
                    return res.json(rows);
                }
                else {
                    res.status(400).json({ text: 'no existe la factura' });
                }
            })
                .catch(() => {
                console.log('error');
            });
        });
    }
    create(req, res) {
        /* creamos una factura en la base de datos */
        database_1.default.promise().query(`INSERT INTO factura (id_factura,
          fecha_emision, nombre_usuario_fk, nombre_producto_fk, categoria_producto_fk, precio_producto_fk, descripbr_producto_fk, imagen_fk,
          cantidad_fk) VALUES 
      ('${req.body.id_factura}', '${req.body.fecha_emision}' ,'${req.body.nombre_usuario_fk}',
       '${req.body.nombre_producto_fk}','${req.body.categoria_producto_fk}',
       '${req.body.precio_producto_fk}', '${req.body.descripbr_producto_fk}', '${req.body.imagen_fk}', 
       '${req.body.cantidad_fk}')`)
            .then(([rows, fields]) => {
            console.log(rows);
        })
            .catch(() => console.log('error al crear '))
            .then(() => console.log('creado...'));
        res.json({ message: 'creando' });
    }
    update(req, res) {
        database_1.default.promise().query(`UPDATE factura SET ? WHERE id = ?`, [req.body, req.params.id])
            .then(([rows, fields]) => {
            console.log(rows);
        })
            .catch(() => console.log('error al editar '))
            .then(() => console.log('editando...'));
        res.json({ message: 'editando factura...' });
    }
    delete(req, res) {
        database_1.default.promise().query(`DELETE FROM factura WHERE id_factura=${req.params.id}`)
            .then(([rows, fields]) => {
            console.log(rows);
        })
            .catch(() => console.log('error al eliminar '))
            .then(() => console.log('elimiando...'));
        res.json({ message: 'elimando factura...' });
    }
}
exports.FacturaController = new facturaController();
exports.default = facturaController;
