import express,{Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';


import indexRoutes from './routes/indexRoutes';
import productosRoutes from './routes/productosRoutes';
<<<<<<< Updated upstream
=======
import loginRoutes from "./routes/loginRoutes";
import facturaRouters from './routes/facturaRouters';
>>>>>>> Stashed changes

class Server{

    public app:Application;
    constructor(){
       this.app=express();
       this.config();
       this.routes();

    }

    config():void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }

    routes():void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/productos',productosRoutes);
<<<<<<< Updated upstream
=======
        this.app.use('/api/login',loginRoutes);
        this.app.use('/api/factura', facturaRouters);
>>>>>>> Stashed changes
    }
    
    start():void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log('server on port ',this.app.get('port'));
            
        })
    }
}

const server=new Server();
server.start();

                     

 