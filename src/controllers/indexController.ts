import {Request,Response } from 'express';

/* codigo rut Principal toma un json que marca en donde esta la api */
class IndexController{
   
   public index (req:Request,res:Response){
         res.json({text:'API Is /api/productos'})
    }

}

export const indexController=new IndexController();