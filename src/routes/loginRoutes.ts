import {Router} from 'express';
import LoginController from "../controllers/loginController";

class LoginRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/usuarios', LoginController.listuser);/* obtener usuarios */
        this.router.get('/direcciones', LoginController.listdirc);/* obtener direcciones */
        this.router.get('/roles', LoginController.listrol);/* obtener roles*/
        this.router.get('/userrol', LoginController.listuserrol);/* obtener usuarios y su rol*/
        this.router.get('/userdirc', LoginController.listuserdirc);/* obtener usuarios y su direccion*/

        this.router.post('/recover', LoginController.recover);/* recuperar contraseña */
        this.router.post('/register',LoginController.register);/* registrar usuario  */
        this.router.delete('/:id',LoginController.delete)/* eliminar usuario */
        this.router.put('/:id',LoginController.update)/* actualizar usuario */
    }
}

const indexRoutes=new LoginRoutes();
export default indexRoutes.router;