import { Header } from "../../components/header"
import "./style.css"

export const Solicitar = () => {
    return (
        <>
            <Header />
            <h1>Solicitar Férias</h1>
            <div className="container-solicitacao">

                <div className="container-duplo">

                    <div className="input-duplo">
                        <label htmlFor="">Data de Início</label>
                        <input type="date" />
                    </div>

                    <div className="input-duplo">
                        <label htmlFor="">Duração</label>
                        <select name="" id="">
                            <option value="5" selected>5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                    </div>

                </div>

                <label htmlFor="">Obervação</label>
                <textarea name="" id="" cols="30" rows="3"></textarea>

                <button className="botao">Solicitar</button>
            </div>
        </>
    )
}