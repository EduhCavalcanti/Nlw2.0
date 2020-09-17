import { Router } from 'express';

const route = Router();


route.get('/', (req,res)=>{
    return res.json({"Gostosinho no azeite": "Delicia papai"})
});

route.post('/create', (req,res)=>{

    let user = {
        nome: req.body,
        idade: req.body
    };
    return res.json(user)
    console.log(req.body)

})

export default route;