import {Request,Response } from 'express';
import pool  from '../database';

/* obtener por get y post la lista de los productos por id o todos y post para crear un nuevo producto */
class GameController{
   
   public async list (req:Request,res:Response){
    /* seleccionamos todo los productos */
   pool.promise().query("SELECT * FROM productos ")
   .then( ([rows]) => {
    res.json(rows);
   })
   .catch( ()=>{
     console.log('error');
     
   } )
  
    }

   public async getOne(req:Request,res:Response):Promise<any>{
     /* obtenemos un un producto por el id */  
    pool.promise().query(`SELECT * FROM productos WHERE id = ${req.params.id} `)
    .then( ([rows]) => {
      
      if(Object.keys(rows).length !== 0  ){
        return res.json(rows);
      }else{
        res.status(400).json({text:'no existe el producto'})
      }
      
      
    })
    .catch( ()=>{
      console.log('error');
      
    } )

    }

    public create(req:Request,res:Response){
     /* creamos un producto en la base de datos */

       pool.promise().query(`INSERT INTO productos (nombre_producto,
          categoria_producto,precio_producto,descripbr_producto,imagen,
          cantidad,sub_categoria) VALUES 
      ('${req.body.nombre_producto}', '${req.body.categoria_producto}',
       '${ req.body.precio_producto}','${req.body.descripbr_producto}',
       '${req.body.imagen}', '${req.body.cantidad}', 
       '${req.body.sub_categoria}')`)
       .then( ([rows,fields]) => {
         console.log(rows);
       })
       .catch(()=>console.log('error al crear '))
       .then( () => console.log('creado...'));
     
     
         res.json({message:'creando'}); 
    }

    public update(req:Request,res:Response){

      pool.promise().query(`UPDATE productos SET ? WHERE id = ?`,[req.body, req.params.id])
      .then( ([rows,fields]) => {
        console.log(rows);
      })
      .catch(()=>console.log('error al editar '))
      .then( () => console.log('editando...'));
   
       res.json({message:'editando producto..'}); 

    }

   public delete(req:Request,res:Response){

        pool.promise().query(`DELETE FROM productos WHERE id=${req.params.id}`)
       .then( ([rows,fields]) => {
         console.log(rows);
       })
       .catch(()=>console.log('error al eliminar '))
       .then( () => console.log('elimiando...'));

        res.json({message:'elimando producto..'});

   }


}

export const gameController=new GameController();
export default gameController;