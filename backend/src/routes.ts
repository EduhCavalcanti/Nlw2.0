import { Router } from 'express';
import ClassesController from './controller/ClassesController';


const route = Router();

//Instanciando a classes para chamar o método create 
const classesControler = new ClassesController();

//Rota pra criação da aula
route.post('/classes', classesControler.create);


route.get('/users',);

route.get('/class',classesControler.index);



export default route;