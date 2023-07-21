const express = require('express');
const AdminEspecie = require('./AdminEspecie');

class AteneaVetApi{
    constructor(){
        this.port=3000;

        this.app = express();
        this.adminEspecie = new AdminEspecie();

        this.app.use(this.configurarCORS)
        this.app.use(express.json());
        
        this.app.post('/api/crear_especie',(req,res)=>{this.adminEspecie.crearEspecie(req,res);});
        this.app.get('/api/listar_especies',(req,res)=>{this.adminEspecie.listarEspecie(req,res)});
       
    }

    configurarCORS(req,res,next){ //para sobrepasar las restricciones de las politicas
        res.header("Access-control-Allow-Origin","*"); //permito solo el acceso  a ciertas ip
        res.header("Access-control-Allow-Methods","GET,POST");
        res.header("Access-control-Allow-Headers","Content-type");
        next();
    }

    iniciarServidor(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        })
    }

}

const aplicativo = new AteneaVetApi();
aplicativo.iniciarServidor();