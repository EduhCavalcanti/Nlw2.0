import Knex from 'knex';

//Tabela que faz conexão do usuário com o professor 

export async function up(knex: Knex){
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        //Criando relacionamento com o professor 
        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

        //Campo de quando foi feita conexão
        table.timestamp('created_at')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        .notNullable()
    });
};

export async function down(knex: Knex){
    return knex.schema.dropTable('connections');
};