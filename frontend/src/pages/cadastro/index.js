import { Header } from "../../components/header"
import Style from "./style.module.css"

export const Cadastro = () => {
    return (
        <>
            <Header />
            <div className={Style.containerGeral}>

                <h1 className={Style.titulo}>Cadastro Colaborador</h1>

                <div className={Style.containerCadastro}>

                    <div className={Style.containerDuplo}>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="contratacao">Contratação</label>
                            <select name="contratacao" id="contratacao">
                                <option value="CLT" selected>CLT</option>
                                <option value="PJ">PJ</option>
                            </select>
                        </div>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="data_contratacao">Data da Contratação</label>
                            <input className={Style.dataContratacao} type="date" name="data_contratacao" id="data_contratacao" />
                        </div>
                    </div>

                    <div className={Style.containerDuplo}>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="matricula">Matrícula</label>
                            <input type="text" placeholder="0000" name="matricula" id="matricula" />
                        </div>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="cpf">CPF</label>
                            <input type="text" name="cpf" id="cpf" placeholder="___.___.___-__" />
                        </div>
                    </div>

                    <div className={Style.containerDuplo}>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="nome">Nome</label>
                            <input type="text" placeholder="Insira o nome" name="nome" id="nome" />
                        </div>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="id_gestor">Gestor</label>
                            <select name="id_gestor" id="id_gestor">
                                <option value="0">Nenhum</option>
                                <option value="1">Fulano</option>
                                <option value="2">Ciclano</option>
                                <option value="3">Beltrano</option>
                            </select>
                        </div>
                    </div>

                    <div className={Style.containerDuplo}>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="email@email.com" name="email" id="email" />
                        </div>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="gmail">Gmail</label>
                            <input type="email" placeholder="email@gmail.com" name="gmail" id="gmail" />
                        </div>
                    </div>

                    <div className={Style.containerDuplo}>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="id_setor">Setor</label>
                            <select name="id_setor" id="id_setor">
                                <option value="1" selected>TI</option>
                                <option value="2">RH</option>
                                <option value="3">Contabilidade</option>
                            </select>
                        </div>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="id_perfil">Função</label>
                            <select name="id_perfil" id="id_perfil">
                                <option value="1" selected>Funcionário</option>
                                <option value="2">Gestor</option>
                            </select>
                        </div>

                    </div>
                    <button className={Style.botao}>Cadastrar</button>
                </div>
            </div>
        </>
    )
}