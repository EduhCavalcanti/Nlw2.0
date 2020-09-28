import { Router } from 'express';
import ClassesController from './controller/ClassesController';
import ConnectionsController from './controller/ConnectionsController';


const route = Router();

//Instanciando a classes para chamar o método create 
const classesControler = new ClassesController();
const connectionsController = new ConnectionsController()

//Rota pra criação da aula
route.post('/classes', classesControler.create);
//Listagem das aulas por filtragem
route.get('/class',classesControler.index);
//Criaçãos das conexões 
route.post('/connection', connectionsController.create);
//Listagem das conexões 
route.get('/connectionsusers', connectionsController.index)




export default route;