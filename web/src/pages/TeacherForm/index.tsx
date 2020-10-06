import React from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader'
import "./styles.css";

export default function TeacherForm(){
    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas."
                descripions="O primeiro passo é preencher esse formulário de inscrição" 
                />

                <main>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input name="name" label="Nome completo" placeholder="Digite aqui seu nome"/>
                        <Input name="avatar" label="Avatar" />
                        <Input name="whatsapp" label="Whatsapp" />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Input name="subject" label="Matéria" placeholder="Digite aqui seu nome"/>
                        <Input name="cost" label="Custo da sua hora por aula" />
                    </fieldset>

                    <fieldset>
                        <legend>Horários disponíveis</legend>

                        <Input name="name" label="Nome completo" placeholder="Digite aqui seu nome"/>
                        <Input name="avatar" label="Avatar" />
                        <Input name="whatsapp" label="Whatsapp" />
                    </fieldset>
                </main>
        </div>
    )
}