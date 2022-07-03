import {Request,Response } from 'express';
import pool  from '../database';

class facturaController{

    public async list (req:Request,res:Response){
        /* seleccionamos las facturas (con llaves foraneas) */
        pool.promise().query("SELECT factura.id_factura, factura.fecha_emision, login.nombre_usuario, productos.nombre_producto, productos.categoria_producto, productos.precio_producto, productos.descripbr_producto, productos.imagen, productos.cantidad FROM factura INNER JOIN login, productos WHERE factura.nombre_usuario_fk = login.nombre_usuario AND factura.nombre_producto_fk = productos.nombre_producto AND factura.categoria_producto_fk = productos.categoria_producto AND factura.precio_producto_fk = productos.precio_producto AND factura.descripbr_producto_fk = productos.descripbr_producto AND factura.imagen_fk = productos.imagen AND factura.cantidad_fk = productos.cantidad")
            .then( ([rows]) => {
                res.json(rows);
            })
            .catch( ()=>{
                console.log('error');

            } )

    }

    public async getOne(req:Request,res:Response):Promise<any>{
        /*obtenemos una factura por el id*/

        pool.promise().query(`SELECT * FROM factura WHERE id_factura = ${req.params.id} `)
            .then( ([rows]) => {

                if(Object.keys(rows).length !== 0  ){
                    return res.json(rows);
                }else{
                    res.status(400).json({text:'no existe la factura'})
                }
            })
            .catch( ()=>{
                console.log('error');

            } )
    }

    public create(req:Request,res:Response){
        /* creamos una factura en la base de datos */

        pool.promise().query(`INSERT INTO factura (id_factura,
          fecha_emision, nombre_usuario_fk, nombre_producto_fk, categoria_producto_fk, precio_producto_fk, descripbr_producto_fk, imagen_fk,
          cantidad_fk) VALUES 
      ('${req.body.id_factura}', '${req.body.fecha_emision}' ,'${req.body.nombre_usuario_fk}',
       '${ req.body.nombre_producto_fk}','${req.body.categoria_producto_fk}',
       '${req.body.precio_producto_fk}', '${req.body.descripbr_producto_fk}', '${req.body.imagen_fk}', 
       '${req.body.cantidad_fk}')`)
            .then( ([rows,fields]) => {
                console.log(rows);
            })
            .catch(()=>console.log('error al crear '))
            .then( () => console.log('creado...'));


        res.json({message:'creando'});
    }

    public update(req:Request,res:Response){

        pool.promise().query(`UPDATE factura SET ? WHERE id = ?`,[req.body, req.params.id])
            .then( ([rows,fields]) => {
                console.log(rows);
            })
            .catch(()=>console.log('error al editar '))
            .then( () => console.log('editando...'));

        res.json({message:'editando factura...'});

    }

    public delete(req:Request,res:Response){

        pool.promise().query(`DELETE FROM factura WHERE id_factura=${req.params.id}`)
            .then( ([rows,fields]) => {
                console.log(rows);
            })
            .catch(()=>console.log('error al eliminar '))
            .then( () => console.log('elimiando...'));

        res.json({message:'elimando factura...'});
    }


}

export const FacturaController=new facturaController();
export default facturaController;