import {Router} from 'express';
import LoginController from "../controllers/loginController";

class ProductRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', LoginController.list);/* obtener usuarios */
        this.router.post('/recover', LoginController.recover);/* recuperar contraseña */
        this.router.post('/register',LoginController.register);/* registrar usuario  */
        this.router.delete('/:id',LoginController.delete)/* eliminar usuario */
    }
}

const indexRoutes=new ProductRoutes();
export default indexRoutes.router;