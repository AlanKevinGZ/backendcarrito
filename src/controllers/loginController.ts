import {Request,Response } from 'express';
import pool  from '../database';

class loginController{

    public async listuser (req:Request,res:Response){
        /* seleccionamos todos los usuarios */
        pool.promise().query('SELECT * FROM usuario')
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error');
            } )
    }

    public async listdirc (req:Request,res:Response){
        /* seleccionamos todos las direcciones */
        pool.promise().query('SELECT * FROM usuario_direccion')
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error');
            } )
    }

    public async listrol (req:Request,res:Response){
        /* seleccionamos todos los roles */
        pool.promise().query('SELECT * FROM rol')
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error');
            } )
    }

    public async listuserrol (req:Request,res:Response){
        /* mostramos la direccion de cada usuario*/
        pool.promise().query('SELECT usuario.nombre, rol.nombre_rol FROM rol INNER JOIN usuario WHERE usuario.Id_rol=rol.Id_rol')
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error');
            } )
    }

    public async listuserdirc (req:Request,res:Response){
        /* mostramos el rol de cada usuario*/
        pool.promise().query(`SELECT usuario.nombre, usuario_direccion.calle,numero,colonia,municipio,estado,pais,codigo_postal FROM
        usuario_direccion INNER JOIN usuario WHERE usuario.Id_usuario=usuario_direccion.Id_usuario `)
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error');
            } )
    }

    public async listid(req:Request,res:Response):Promise<any>{
        /* obtenemos un un producto por el id */
        pool.promise().query(`SELECT * FROM  usuario_direccion,usuario,rol WHERE usuario_direccion.id_usuario=${req.params.id} 
        AND usuario.id_usuario=${req.params.id} AND rol.id_rol=${req.params.id} `)
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

    public recover(req:Request,res:Response){
        /* recuperamos contraseña por correo */
        pool.promise().query(`SELECT password FROM usuario WHERE correo = "${req.body.correo}" `)
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error no se encontro la contraseña');
            } )
    }

    public register(req:Request,res:Response){
        /* registramos un usuario en la base de datos */
        pool.promise().query(`INSERT INTO rol (id_rol,nombre_rol) VALUES 
        ('${req.body.id_rol}', '${req.body.nombre_rol}')`)
        pool.promise().query(`INSERT INTO usuario (id_usuario,nombre,id_rol,password,correo) VALUES
        ('${req.body.id_usuario}', '${req.body.nombre}', '${req.body.id_rol}'
        ,'${req.body.password}', '${req.body.correo}')`)
        pool.promise().query(`INSERT INTO usuario_direccion (id_usuario_direccion,id_usuario,calle,numero,colonia,municipio,estado,pais,codigo_postal) VALUES
        ('${req.body.id_usuario_direccion}', '${req.body.id_usuario}', '${req.body.calle}'
        ,'${req.body.numero}', '${req.body.colonia}', '${req.body.municipio}'
        , '${req.body.estado}', '${req.body.pais}', '${req.body.codigo_postal}')`)
            .then( ([rows,fields]) => {
                console.log(rows);
            })
            .catch(()=>console.log('error al registrar'))
            .then( () => console.log('registrado'));

        res.json({message:'usuario registrado'});
    }

    public delete(req:Request,res:Response){
        /* eliminamos un usuario de la base de datos */
        pool.promise().query(`DELETE usuario_direccion,usuario,rol FROM usuario_direccion,usuario,rol WHERE 
        usuario_direccion.id_usuario=${req.params.id} AND usuario.id_usuario=${req.params.id} AND rol.id_rol=${req.params.id} `)
            .then( ([rows,fields]) => {
                console.log(rows);
            })
            .catch(()=>console.log('error al eliminar'))
            .then( () => console.log('eliminado'));

        res.json({message:'usuario eliminado'});
    }

    public update(req:Request,res:Response){
        /* actualizamos un usuario de la base de datos */
        pool.promise().query(`UPDATE usuario_direccion,usuario,rol SET ? WHERE
        usuario_direccion.id_usuario=${req.params.id} AND usuario.id_usuario=${req.params.id} AND rol.id_rol=${req.params.id}`,[req.body])
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