import {Request,Response } from 'express';
import pool  from '../database';

class loginController{

    public async listusuario (req:Request,res:Response){
        /* seleccionamos todos los usuarios, con su rol y su direccion */
        pool.promise().query(`SELECT * FROM usuario`)
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error');
            } )
    }

    public async listdireccion (req:Request,res:Response){
        /* seleccionamos todos los usuarios, con su rol y su direccion */
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
        pool.promise().query(`SELECT usuario.id_usuario,nombre,password,correo,nombre_rol,calle,numero,colonia,municipio,estado,pais,codigo_postal FROM 
        usuario,rol,direccionus,userrol where rol.id_rol=userrol.id_rol and userrol.id_usuario=usuario.id_usuario and direccionus.id_usuario=usuario.id_usuario`)
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error');
            } )
    }

    public async listuseryrol (req:Request,res:Response){
        /* mostramos el rol de cada usuario*/
        pool.promise().query(`SELECT usuario.id_usuario,nombre,nombre_rol FROM usuario,rol,userrol where 
        rol.id_rol=userrol.id_rol and userrol.id_usuario=usuario.id_usuario`)
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error');
            } )
    }

    public async listuserydirc (req:Request,res:Response){
        /* mostramos la direccion de cada usuario*/
        pool.promise().query(`SELECT usuario.id_usuario,nombre,calle,numero,colonia,municipio,estado,pais,codigo_postal FROM 
        usuario,direccionus,userrol where userrol.id_usuario=usuario.id_usuario and direccionus.id_usuario=usuario.id_usuario`)
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error');
            } )
    }

    public async listuserrol (req:Request,res:Response){
        /* mostramos el userrol relacionado*/
        pool.promise().query(`SELECT userrol.id_userrol,userrol.id_usuario,userrol.id_rol,nombre,nombre_rol FROM usuario,rol,direccionus,userrol where 
        rol.id_rol=userrol.id_rol and userrol.id_usuario=usuario.id_usuario and direccionus.id_usuario=usuario.id_usuario`)
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error');
            } )
    }

    public login(req:Request,res:Response){
        /* recuperamos contraseña por correo */
        pool.promise().query(`SELECT * FROM usuario WHERE usuario.correo = "${req.body.correo}" and usuario.password = "${req.body.password}" `)
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('usuario no registrado');
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

    public registeruser(req:Request,res:Response){
        /* registramos un usuario en la base de datos */
        pool.promise().query(`insert into usuario (nombre,password,correo)  values ('${req.body.nombre}','${req.body.password}','${req.body.correo}')`)
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
        ('${req.body.calle}','${req.body.numero}','${req.body.colonia}','${req.body.municipio}','${req.body.estadio}',
        '${req.body.pais}','${req.body.codigo_postal}')`)
            .then( ([rows,fields]) => {
                console.log(rows);
            })
            .catch(()=>console.log('error al registrar'))
            .then( () => console.log('registrado'));
        res.json({message:'direccion de usuario registrada'});
    }

    public registeruserrol(req:Request,res:Response){
        /* registramos un usuario en la base de datos */
        pool.promise().query(`insert into userrol (id_usuario,id_rol) values (${req.body.id_usuario},${req.body.id_rol})`)
            .then( ([rows,fields]) => {
                console.log(rows);
            })
            .catch(()=>console.log('error al registrar'))
            .then( () => console.log('registrado'));
        res.json({message:'rol de usuario registrado'});
    }

    public delete(req:Request,res:Response){
        /* eliminamos un usuario de la base de datos */
        pool.promise().query(`DELETE userrol,usuario,direccionus FROM userrol,usuario,direccionus WHERE 
        userrol.id_usuario = ${req.params.id} and usuario.id_usuario = ${req.params.id} and direccionus.id_usuario = ${req.params.id}`)
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
        and direccionus.id_usuario = ${req.params.id}`,[req.body])
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