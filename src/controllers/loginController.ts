import {Request,Response } from 'express';
import pool  from '../database';

class loginController{

    public async list (req:Request,res:Response){
        /* seleccionamos todo los usuarios */
        pool.promise().query("SELECT * FROM login ")
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error');
            } )
    }

    public recover(req:Request,res:Response){
        /* recuperamos contraseña por correo */
        pool.promise().query(`SELECT password FROM login WHERE correo = "${req.body.correo}" `)
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error no se encontro la contraseña');
            } )
    }

    public register(req:Request,res:Response){
        /* registramos un usuario en la base de datos */
        pool.promise().query(`INSERT INTO login (nombre_completo,nombre_usuario,correo,password) VALUES 
        ('${req.body.nombre_completo}', '${req.body.nombre_usuario}',
        '${ req.body.correo}','${req.body.password}')`)
            .then( ([rows,fields]) => {
                console.log(rows);
            })
            .catch(()=>console.log('error al registrar'))
            .then( () => console.log('registrado'));


        res.json({message:'usuario registrado'});
    }

    public delete(req:Request,res:Response){
        /* eliminamos un usuario de la base de datos */
        pool.promise().query(`DELETE FROM login WHERE id=${req.params.id}`)
            .then( ([rows,fields]) => {
                console.log(rows);
            })
            .catch(()=>console.log('error al eliminar'))
            .then( () => console.log('eliminado'));

        res.json({message:'usuario eliminado'});

    }
}

export const LoginController=new loginController();
export default LoginController;