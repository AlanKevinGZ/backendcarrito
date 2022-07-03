"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facturaController_1 = require("../controllers/facturaController");
class FacturaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', facturaController_1.FacturaController.list); /* obtener facturas generales */
        this.router.get('/:id', facturaController_1.FacturaController.getOne); /*Obtener una factura por ID*/
        this.router.post('/', facturaController_1.FacturaController.create); /*Crear factura*/
        this.router.put('/:id', facturaController_1.FacturaController.update); /*Actualizar datos de factura*/
        this.router.delete('/:id', facturaController_1.FacturaController.delete); /*Eliminar factura por ID */
    }
}
const indexRoutes = new FacturaRoutes();
exports.default = indexRoutes.router;
