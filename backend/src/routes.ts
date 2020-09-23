import { request, Router } from 'express';


const route = Router();

//Rota pra criação da aula
route.post('/classes', (req, res)=>{
    const data = req.body;

    console.log(data)

    return res.send(data)
});


route.get('/',);

export default route;