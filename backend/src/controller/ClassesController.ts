import { Request , Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

//Definindo formatado de um objeto...{ Para Typescript}
interface ScheduleItem{
    week_day : number,
    from: string,
    to: string

}

export default class ClassesController {

    // Listagem das aulas 
    async index (req:Request, res:Response){
        const filters = req.query;

        const subject = filters.subject as string //Vai dizer o tipo do filters.time {Typescript}
        const time = filters.time as string
        const week_day = filters.week_day as string


        if(!week_day || !subject || !time){
            return res.json({
                error: " Faltando filtros para pesquisar classes"
            })
        };

        //Convertendo minutos em horas 
        const timeInMinutes = convertHourToMinutes(time)

        const classes = await db('classes')
        //Verificação pra ver se existe um horário e data disponível
        .whereExists(function(){//Querry complexa do 0 
            this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`. `id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
            .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
            .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
        })
        .where('classes.subject', '=' , subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*'])

        res.json(classes)
    };

    // Criação do users e classes 
    async create (req:Request, res:Response) {

        const {
            nome,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;
        
    
        // Txr vai funcionar como uma verificação de transição com banco de dados
        const trx = await db.transaction();
    
        try {
    
            //**CADASTRANDO USERS */
            //O {insertUsersIds} vai retornar os ids dos usuários para fazer os relacionamentos
            const insertUsersIds = await trx('users').insert({ //Salvando usuário no banco de dados
                nome,
                avatar,
                whatsapp,
                bio,
            })
            
            //Pegando o id do usuário na posição 0 "o primeiro q foi inserido"]
            const user_id = insertUsersIds[0]
    
    
            //**CADASTRANDO CLASS */
            //O {insertClassesId} vai retornar os ids das class para fazer os relacionamentos
            const insertClassesId = await trx('classes').insert({//Salvando as classes no banco de dados
                subject,
                cost,
                user_id //Cadastrando o Id do usuário para fazer o relacionamento com o class
            })
            
            //Pegando o id da class na posição zero
            const class_id = insertClassesId[0]
    
    
    
            //Convertendo minutos em horas para armazena no banco de dados
            const classSchedule = schedule.map((scheduleItem:ScheduleItem )=>{
                return{
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                    class_id
                }
            })
    
    
            //**CADASTRANDO SCHEDULE (CRONOGRAMA) */
            await trx('class_schedule').insert(classSchedule)
    
    
            //Se estiver tudo ok ele irá fazer as alterações no banco 
            await trx.commit();
    
            return res.status(201).send()
    
        } catch (error) {
            //Vai desfazer qualquer alteração feita se der algum erro
            trx.rollback();
    
            console.log('Algo deu errado', error)
    
            return res.status(400).json({
                Error: "Erro no cadastro de usuário"
            });
        };
    
    }
}