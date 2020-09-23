import Knex from 'knex';

//Tabela do cronograma de aulas do professor 

export async function up(knex: Knex){
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();

        //dia da semana 
        table.integer('week_day').notNullable();
        //horario que começa a aula e que termina
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        //Criando relacionamento com o classes
        table.integer('class_id')
        .notNullable()
        .references('id')
        .inTable('classes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    });
};

export async function down(knex: Knex){
    return knex.schema.dropTable('class_schedule');
};