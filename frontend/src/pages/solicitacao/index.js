import { Header } from "../../components/header"
import Style from "../solicitar/style.module.css"
import StyleLocal from "./style.module.css"

export const Solicitacao = () => {
    return (
        <>
            <Header />
            <h1 className={Style.titulo}>Solicitação</h1>
            <div className={Style.containerSolicitacao}>

                <div className={StyleLocal.inputNome}>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" value="Fulano da Silva" readOnly />
                </div>

                <div className={Style.containerDuplo}>

                    <div className={Style.inputDuplo}>
                        <label htmlFor="">Matrícula</label>
                        <input type="text" value="123" readOnly />
                    </div>

                    <div className={Style.inputDuplo}>
                        <label htmlFor="">Data da Solicitação</label>
                        <input type="date" value="2023-01-01" readOnly />
                    </div>

                </div>

                <div className={Style.containerDuplo}>


                    <div className={Style.inputDuplo}>
                        <label htmlFor="">Data de Início</label>
                        <input type="date" value="2023-02-01" readOnly />
                    </div>

                    <div className={Style.inputDuplo}>
                        <label htmlFor="">Data de Término</label>
                        <input type="date" value="2023-02-11" readOnly />
                    </div>

                </div>

                <label htmlFor="observacao">Obervação</label>
                <textarea className={Style.textarea} name="observacao" id="observacao" cols="30" rows="3" value="Aceita por favor!"></textarea>

                <div className={Style.antecipacao}>
                    <label htmlFor="antecipacao">Antecipar 13°</label>
                    <input type="checkbox" name="antecipacao" id="antecipacao" checked />
                </div>

                <div className={StyleLocal.statuSolicitacao}>
                    <span className="pendente">Pendente</span>
                </div>

            </div>
        </>
    )
}