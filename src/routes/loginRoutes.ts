import {Router} from 'express';
import LoginController from "../controllers/loginController";

class LoginRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/usuarios', LoginController.listusuario);/* obtener usuarios */
        this.router.get('/direccion', LoginController.listdireccion);/* obtener direcciones */
        this.router.get('/', LoginController.listurd);/* obtener usuarios, direcciones y roles */
        this.router.get('/useryrol', LoginController.listuseryrol);/* obtener usuarios y su rol*/
        this.router.get('/userydirc', LoginController.listuserydirc);/* obtener usuarios y su direccion*/
        this.router.get('/userrol', LoginController.listuserrol);/* obtener tabla userrol relacionada*/

        this.router.post('/login', LoginController.login);/* ingresar usuario*/
        this.router.post('/recover', LoginController.recover);/* recuperar contraseña */
        this.router.post('/registeruser',LoginController.registeruser);/* registrar usuario  */
        this.router.post('/registerdirc',LoginController.registerdirc);/* registrar direccion de usuario  */
        this.router.post('/registerusr',LoginController.registeruserrol);/* registrar el rol del usuario */
        this.router.delete('/:id',LoginController.delete)/* eliminar usuario */
        this.router.put('/:id',LoginController.update)/* actualizar usuario */
    }
}

const indexRoutes=new LoginRoutes();
export default indexRoutes.router;