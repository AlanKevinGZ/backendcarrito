import {NextFunction, Request, Response} from 'express';

import pool  from '../database';

const jwt = require('jsonwebtoken');

class loginController{

    public async listusuario (req:Request,res:Response){
        /* seleccionamos todos los usuarios*/
        pool.promise().query(`SELECT * FROM usuario`)
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error');
            } )
    }

    public async listdireccion (req:Request,res:Response){
        /* seleccionamos la direccion de los usuarios*/
        pool.promise().query(`SELECT * FROM direccionus`)
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error');
            } )
    }

    public async listurd (req:Request,res:Response){
        /* seleccionamos todos los usuarios, con su rol y su direccion */
        pool.promise().query(`SELECT usuario.id_usuario,nombre,correo,password,nombre_rol,calle,numero,colonia,municipio,estado,pais,codigo_postal 
        FROM usuario,rol,direccionus where rol.id_rol=usuario.id_rol and direccionus.id_usuario=usuario.id_usuario `)
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error');
            } )
    }

    public async listrol (req:Request,res:Response){
        /* mostramos el rol del usuario*/
        pool.promise().query(`SELECT usuario.id_usuario,nombre,nombre_rol FROM usuario,rol where rol.id_rol=usuario.id_rol `)
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error');
            } )
    }

    public async iduser(req:Request,res:Response):Promise<any>{
        /* mostramos un usuario por el id */
        pool.promise().query(`SELECT usuario.id_usuario,nombre,correo,password,usuario.id_rol,calle,numero,colonia,municipio,estado,pais,codigo_postal FROM 
        usuario,rol,direccionus where rol.id_rol=usuario.id_rol and direccionus.id_usuario=usuario.id_usuario and usuario.id_usuario = ${req.params.id} `)
            .then( ([rows]) => {
                if(Object.keys(rows).length !== 0  ){
                    return res.json(rows);
                }else{
                    res.status(400).json({text:'no existe el usuario'})
                }
            })
            .catch( ()=>{
                console.log('error');
            } )

    }
    public login(req:Request,res:Response){
        /* ingresar usuario */
        pool.promise().query(`SELECT nombre,id_rol FROM usuario WHERE correo = "${req.body.correo}" AND password = "${req.body.password}"`)
            .then( ([rows,fields]) => {
                if(Object(rows).length>0){
                    let data = JSON.stringify(Object(rows)[0])
                    const token = jwt.sign(data, 'still');
                    res.json({token})
                }else{
                    res.json('Usuario o clave incorrecto')
                }
                }
            )
            .catch(()=>console.log('error no existe el usuario '))
    }

    public test ( req:Request,res:Response ){
        res.json('informacion secreta');
    }

    public registeruser(req:Request,res:Response){
        /* registramos un usuario en la base de datos */
        pool.promise().query(`insert into usuario (nombre,password,correo,id_rol)  values ('${req.body.nombre}','${req.body.password}','${req.body.correo}','${req.body.id_rol}')`)
            .then( ([rows,fields]) => {
                console.log(rows);
            })
            .catch(()=>console.log('error al registrar'))
            .then( () => console.log('registrado'));
        res.json({message:'usuario registrado'});
    }

    public registerdirc(req:Request,res:Response){
        /* registramos un usuario en la base de datos */
        pool.promise().query(`insert into direccionus (calle,numero,colonia,municipio,estado,pais,codigo_postal) values 
        ('${req.body.calle}','${req.body.numero}','${req.body.colonia}','${req.body.municipio}','${req.body.estado}',
        '${req.body.pais}','${req.body.codigo_postal}')`)
            .then( ([rows,fields]) => {
                console.log(rows);
            })
            .catch(()=>console.log('error al registrar'))
            .then( () => console.log('registrado'));
        res.json({message:'direccion de usuario registrada'});
    }

    public delete(req:Request,res:Response){
        /* eliminamos un usuario de la base de datos */
        pool.promise().query(`DELETE usuario,direccionus FROM usuario,direccionus WHERE 
        usuario.id_usuario = ${req.params.id} and direccionus.id_usuario = ${req.params.id}`)
            .then( ([rows,fields]) => {
                console.log(rows);
            })
            .catch(()=>console.log('error al eliminar'))
            .then( () => console.log('eliminado'));

        res.json({message:'usuario eliminado'});
    }

    public update(req:Request,res:Response){
        /* actualizamos un usuario de la base de datos */
        pool.promise().query(`UPDATE usuario,direccionus SET ? WHERE usuario.id_usuario = ${req.params.id} 
        AND direccionus.id_usuario = ${req.params.id}`,[req.body])
            .then( ([rows,fields]) => {
                console.log(rows);
            })
            .catch(()=>console.log('error al editar '))
            .then( () => console.log('editado...'));
        res.json({message:'usuario editado..'});
    }
}

export const LoginController=new loginController();
export default LoginController;