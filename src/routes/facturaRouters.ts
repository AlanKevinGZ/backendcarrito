import { Router } from 'express';
import facturaController, { FacturaController } from '../controllers/facturaController';
import gameController from '../controllers/productController';

class FacturaRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', FacturaController.list);/* obtener facturas generales */
        this.router.get('/:id', FacturaController.getOne); /*Obtener una factura por ID*/
        this.router.post('/', FacturaController.create); /*Crear factura*/
        this.router.put('/:id', FacturaController.update); /*Actualizar datos de factura*/
        this.router.delete('/:id', FacturaController.delete); /*Eliminar factura por ID */
    }
}

const indexRoutes=new FacturaRoutes();
export default indexRoutes.router;