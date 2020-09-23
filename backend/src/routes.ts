import { Router } from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';

const route = Router();

//Definindo formatado de um objeto
interface ScheduleItem{
    week_day : number,
    from: string,
    to: string

}

//Rota pra criação da aula
route.post('/classes', async (req, res)=>{

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

});


route.get('/users', async (req, res) =>{

    try {
        const users =  await db.select("*").from("users")
   
        return res.json(users)


    } catch (error) {
        console.log(error)
    }
    res.send()
});

route.get('/class', async (req, res) =>{

    try {
        const allClass =  await db.select("*").from("classes")
   
        return res.json(allClass)


    } catch (error) {
        console.log(error)
    }
    res.send()
});



export default route;