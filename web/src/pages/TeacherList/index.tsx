import React from 'react'
import PageHeader from '../../components/PageHeader'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import "./styles.css"

function TeacherList(){
    return(
        <div id="page-teacher-list" className="container">

            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-tearchers">
                    <div className="input-block">
                        <label htmlFor="subject">Matéria</label>
                        <input type="text" id="suject"/>
                    </div>

                    <div className="input-block">
                        <label htmlFor="week_day">Dia da semana</label>
                        <input type="text" id="week_day"/>
                    </div>

                    <div className="input-block">
                        <label htmlFor="time">Hora</label>
                        <input type="text" id="time"/>
                    </div>
                </form>
            </PageHeader>

            <main>
                <article className="teacher-item">
                    <header>
                        <img src="https://avatars3.githubusercontent.com/u/43391873?s=460&u=33476a5365a9ba2084c3d85ec2687874745590c5&v=4" alt="Eduardo cavalcanti"/>
                        <div>
                            <strong>Eduardo Cavalcanti</strong>
                            <span>Matemática</span>
                        </div>
                    </header>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                        <br/>
                        Et perferendis beatae provident atque sapiente illo quas velit, ratione quisquam nihil sint iure, dolores sequi animi. Dolorum repudiandae fugiat expedita mollitia.
                    </p>

                    <footer>
                        <p>
                            Preço/hora
                            <strong>R$ 100,00</strong>
                        </p>

                        <button type='button'>
                            <img src={whatsappIcon} alt="Whatsapp"/>
                            Entrar em contato
                        </button>
                    </footer>

                </article>
            </main>

        </div>
    )
}

export default TeacherList;