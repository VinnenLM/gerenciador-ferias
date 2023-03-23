import { useState } from "react";
import { Header } from "../../components/header"
import api from "../../services/api";
import Style from "./style.module.css"
import { format, addDays } from 'date-fns';
import { useSelector } from "react-redux";

export const Solicitar = () => {

    const [dataInicio, setDataInicio] = useState("");
    const [qntDias, setQntDias] = useState(5);
    const [comentarioColab, setComentarioColab] = useState("");
    const [solicitacao13, setSolicitacao13] = useState(false);
    const [msg, setMsg] = useState("");
    const [alert, setAlert] = useState("");
    const idColaborador = useSelector((state) => state.idColaborador);
    const tipoContratacao = useSelector((state) => state.tipoContratacao);

    function salvarSolicitacao() {
        if (dataInicio === "") {
            setMsg("Informe todos os campos!")
            setAlert("warning")
        } else {
            api
                .post("/solicitacao", {
                    dataSolicitacao: format(new Date(), 'yyyy-MM-dd'),
                    dataInicio: dataInicio,
                    dataFim: format(addDays(new Date(dataInicio), (qntDias)), 'yyyy-MM-dd'),
                    comentarioColab: comentarioColab,
                    idColaborador: parseInt(idColaborador),
                    solicitacao13: (solicitacao13) ? format(new Date(), 'yyyy-MM-dd') : null
                })
                .then((response) => {
                    setAlert("success")
                    setMsg("Solicitação enviada com sucesso!")
                    console.log(response.data);
                })
                .catch((error) => {
                    setAlert("warning")
                    setMsg("Erro ao solicitar férias!")
                    console.log(error.response.data.message);
                })
        }

    }

    function solicitar13() {
        (solicitacao13 === false) ? setSolicitacao13(true) : setSolicitacao13(false);
    }

    return (
        <>
            <Header />

            {msg !== "" ?
                (<div className={`alert alert-${alert} w-25 mt-4 mx-auto text-center border border-${alert}`} role={alert}>
                    {msg}
                </div>)
                :
                null
            }

            <h1 className={Style.titulo}>Solicitar Férias</h1>
            <div className={Style.containerSolicitacao}>

                <div className={Style.containerDuplo}>

                    <div className={Style.inputDuplo}>
                        <label htmlFor="dataInicio">Data de Início</label>
                        <input type="date" name="dataInicio" id="dataInicio" value={dataInicio} onChange={(evt) => setDataInicio(evt.target.value)} />
                    </div>

                    <div className={Style.inputDuplo}>
                        <label htmlFor="duracao">Duração</label>
                        <select name="duracao" id="duracao" defaultValue={qntDias} onChange={(evt) => setQntDias(evt.target.value)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                    </div>

                </div>

                <label htmlFor="comentarioColab">Obervação</label>
                <textarea className={Style.textarea} name="comentarioColab" id="comentarioColab" cols="30" rows="3" onChange={(evt) => setComentarioColab(evt.target.value)} value={comentarioColab}></textarea>

                {
                    (tipoContratacao === "CLT")
                        ?
                        <div className={Style.antecipacao}>
                            <label htmlFor="solicitacao13">Antecipar 13°</label>
                            <input type="checkbox" name="solicitacao13" id="solicitacao13" checked={solicitacao13} onChange={solicitar13} />
                        </div>
                        : null
                }

                <button className={Style.botao} onClick={salvarSolicitacao}>Solicitar</button>
            </div>
        </>
    )
}