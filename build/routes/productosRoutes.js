"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controllers/productController"));
/* ruta pra obtener los productos todos y por id */
class ProductRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', productController_1.default.list); /* obtener productos */
        this.router.get('/:id', productController_1.default.getOne); /* obtener por id */
        this.router.post('/', productController_1.default.create); /* crear producto  */
    }
}
const indexRoutes = new ProductRoutes();
exports.default = indexRoutes.router;
