import { Header } from "../../components/header"
import "./style.css"

export const Perfil = () => {
    return (
        <>
            <Header />
            <h1>Perfil</h1>
            <div className="container-principal-perfil">
                <div className="container-perfil">
                    <div className="labels">
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
                        <input type="text" />
                        <input type="text" />
                    </div>

                </div>
                <button>Salvar Dados</button>
            </div>
        </>
    )
}