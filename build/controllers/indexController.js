"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
/* codigo rut Principal toma un json que marca en donde esta la api */
class IndexController {
    index(req, res) {
        res.json({ text: 'API Is /api/productos' });
    }
}
exports.indexController = new IndexController();
