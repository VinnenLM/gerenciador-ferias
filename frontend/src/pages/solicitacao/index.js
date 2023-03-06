import { Header } from "../../components/header"
import "./style.css"

export const Solicitacao = () => {
    return (
        <>
            <Header />
            <h1>Solicitação</h1>
            <div className="container-solicitacao">

                <label htmlFor="">Nome</label>
                <input type="text" value="Fulano da Silva" readOnly />

                <div className="container-duplo">

                    <div className="input-duplo">
                        <label htmlFor="">Matrícula</label>
                        <input type="text" value="123" readOnly />
                    </div>

                    <div className="input-duplo">
                        <label htmlFor="">Duração</label>
                        <input type="text" value="10 Dias" readOnly />
                    </div>

                </div>

                <div className="container-duplo">

                    <div className="input-duplo">
                        <label htmlFor="">Data Início</label>
                        <input type="date" value="2023-01-01" readOnly />
                    </div>

                    <div className="input-duplo">
                        <label htmlFor="">Data Término</label>
                        <input type="date" value="2023-01-11" readOnly />
                    </div>

                </div>

                <label htmlFor="">Obervação</label>
                <textarea name="" id="" cols="30" rows="3" readOnly>Quero muito tirar férias, aceita ae</textarea>

                <div className="status-solicitacao">
                    <span className="pendente">Pendente</span>
                </div>

            </div>
        </>
    )
}