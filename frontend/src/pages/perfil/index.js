import { Header } from "../../components/header"
import "./style.css"

export const Perfil = () => {

    return (
        <>
            <Header />
            <h1>Perfil</h1>
            <div className="container-principal-perfil">
                <div className="container-perfil">

                    <div className="dado">
                        <span>Nome</span>
                        <span>Fulano da Silva</span>
                    </div>

                    <div className="dado">
                        <span>CPF</span>
                        <span>123.456.789-10</span>
                    </div>

                    <div className="dado">
                        <span>Email</span>
                        <span>Fulano@email.com</span>
                    </div>

                    <div className="dado">
                        <span>Setor</span>
                        <span>T.I.</span>
                    </div>

                    <div className="dado">
                        <span>Alterar Senha</span>
                        <input type="checkbox" id="check" />
                    </div>

                    <div className="dado">
                        <span>Senha</span>
                        <input type="text" disabled />
                    </div>

                    <div className="dado">
                        <span>Confirmar Senha</span>
                        <input type="text" disabled />
                    </div>

                </div>
                <button>Salvar Dados</button>
            </div>
        </>
    )
}

/**
 * <div className="labels">
                        <span>Nome</span>
                        <span>CPF</span>
                        <span>Email</span>
                        <span>Setor</span>
                        <span>Alterar Senha</span>
                        <span>Senha</span>
                        <span>Confirmar Senha</span>
                    </div>
                    <div className="valores">
                        <span>Fulano da Silva</span>
                        <span>123.456.789-10</span>
                        <span>fulaninho@email.com</span>
                        <span>Recursos Humanos</span>
                        <input type="checkbox" id="check" />
                        <input type="text" disabled />
                        <input type="text" disabled />
                    </div>
 */