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
     /*   res.json({text:'desde'+req.params.id}); */
     
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

      /*  pool.query( (`INSERT INTO productos (nombre_producto,
          categoria_producto,precio_producto,descripbr_producto,imagen) VALUES 
      ('${req.body.nombre_producto}', '${req.body.categoria_producto}',
       '${ req.body.precio_producto}','${req.body.descripbr_producto}',
       '${req.body.imagen}')`)); */

       pool.promise().query(`INSERT INTO productos (nombre_producto,
          categoria_producto,precio_producto,descripbr_producto,imagen) VALUES 
      ('${req.body.nombre_producto}', '${req.body.categoria_producto}',
       '${ req.body.precio_producto}','${req.body.descripbr_producto}',
       '${req.body.imagen}')`)
       .then( ([rows,fields]) => {
         console.log(rows);
       })
       .catch(()=>console.log('error al crear '))
       .then( () => console.log('creado...'));
     
     
         res.json({message:'creando'}); 
    }

}

export const gameController=new GameController();
export default gameController;