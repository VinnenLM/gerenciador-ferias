import { Header } from "../../components/header"
import Style from "./style.module.css"

export const Solicitar = () => {
    return (
        <>
            <Header />
            <h1 className={Style.titulo}>Solicitar Férias</h1>
            <div className={Style.containerSolicitacao}>

                <div className={Style.containerDuplo}>

                    <div className={Style.inputDuplo}>
                        <label htmlFor="data_inicio">Data de Início</label>
                        <input type="date" name="data_nicio" id="data_inicio" />
                    </div>

                    <div className={Style.inputDuplo}>
                        <label htmlFor="duracao">Duração</label>
                        <select name="duracao" id="duracao" defaultValue={"5"}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                    </div>

                </div>

                <label htmlFor="observacao">Obervação</label>
                <textarea className={Style.textarea} name="observacao" id="observacao" cols="30" rows="3"></textarea>

                <div className={Style.antecipacao}>
                    <label htmlFor="antecipacao">Antecipar 13°</label>
                    <input type="checkbox" name="antecipacao" id="antecipacao" />
                </div>

                <button className={Style.botao}>Solicitar</button>
            </div>
        </>
    )
}