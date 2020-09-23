//Função que vai converter horas em minutos
export default function convertHourToMinutes(time: string){

    //Vai dividir com :
   const [hour, minutes] = time.split(':').map(Number)//Vai trasnformar em tipo numerico 
   //Vai retornar um array com dois numeros 

   const timeInMinutes = (hour * 60) + minutes
    
   //Vai retornar os minutos
   return timeInMinutes
};