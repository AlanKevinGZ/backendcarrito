import {Router} from 'express';
import gameController from  '../controllers/productController';

/* ruta pra obtener los productos todos y por id */
class ProductRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', gameController.list);/* obtener productos */
        this.router.get('/:id', gameController.getOne);/* obtener por id */
        this.router.post('/',gameController.create);/* crear producto  */
    }
}



const indexRoutes=new ProductRoutes();
export default indexRoutes.router;

