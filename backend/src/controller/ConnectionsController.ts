import { Request,Response} from 'express';
import db from '../database/connection';

export default class ConnectionsController {

    async  index (req:Request, res:Response) {
        try {
            const totalConnections = await db('connections').count('* as total')
            
            const { total } = totalConnections[0]

            return res.json({total})
        } catch (error) {
            console.log(error)
        }
    };

    async  create (req:Request, res:Response) {
        const {user_id} = req.body;

       try{
        await db('connections').insert({
            user_id
        })
        return res.send().status(201)

       }catch(err){
           console.log(err)
       }
    };
};