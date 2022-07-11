import mysql from 'mysql2';
import keys  from './keys';

const pool = mysql.createPool(keys.database);

/* conexion  a la base de datos */
pool.getConnection(function(err,conn){
    if (err) {
        console.log(err);
    }else{
        console.log('DB is conected');
    }
   

});

export default pool;

