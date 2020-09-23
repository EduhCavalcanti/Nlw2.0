import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        //Matéria 
        table.string('subject').notNullable();
        //Custo da matéria 
        table.decimal('cost').notNullable();

        //Criando relacionamento com o users
        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    });
};

export async function down(knex: Knex){
    return knex.schema.dropTable('classes');
};