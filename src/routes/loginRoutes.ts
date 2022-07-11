import {NextFunction, Request, Response, Router} from 'express';
import LoginController from "../controllers/loginController";
import loginController from "../controllers/loginController";

const jwt = require('jsonwebtoken');

class LoginRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/usuarios', LoginController.listusuario);/* obtener usuarios */
        this.router.get('/direccion', LoginController.listdireccion);/* obtener direcciones */
        this.router.get('/', LoginController.listurd);/* obtener usuarios, direcciones y roles */
        this.router.get('/rol', LoginController.listrol);/* obtener tabla usuario y rol*/
        this.router.get('/:id', LoginController.iduser);/* obtener usuario por id*/
        this.router.post('/registeruser',LoginController.registeruser);/* registrar usuario  */
        this.router.post('/registerdirc',LoginController.registerdirc);/* registrar direccion de usuario  */
        this.router.delete('/:id',LoginController.delete)/* eliminar usuario */
        this.router.put('/:id',LoginController.update)/* actualizar usuario */
        this.router.post('/login',LoginController.login);/* iniciar sesion del  usuario */

        this.router.post('/test',verifyToken,loginController.test);
    }
}
function verifyToken(req:Request,res:Response,next:NextFunction){
    if(!req.headers.authorization) return res.status(401).json('no autorizado');
    const token = req.headers.authorization.substring(7);
    if(token!==''){
        const content = jwt.verify(token,'stil');
        console.log(content);
    }
}

const indexRoutes=new LoginRoutes();
export default indexRoutes.router;