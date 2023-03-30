import { useState } from "react";
import { Header } from "../../components/header"
import api from "../../services/api";
import Style from "./style.module.css"
import { addDays, addMonths, format } from 'date-fns';
import { useSelector } from "react-redux";
import apiPython from "../../services/apiPython";

export const Solicitar = () => {

    const [dataInicio, setDataInicio] = useState("");
    const [qntDias, setQntDias] = useState(5);
    const [comentarioColab, setComentarioColab] = useState("");
    const [solicitacao13, setSolicitacao13] = useState(false);
    const [msg, setMsg] = useState("");
    const [alert, setAlert] = useState("");
    const colab = useSelector((state) => state.colaborador);

    function salvarSolicitacao() {
        if (dataInicio === "") {
            setMsg("Informe todos os campos!")
            setAlert("warning")
        } else {
            api
                .post("/solicitacao", {
                    dataSolicitacao: new Date(),
                    dataInicio: new Date(dataInicio),
                    dataFim: addDays(new Date(dataInicio), (qntDias - 1)),
                    comentarioColab: comentarioColab,
                    idColaborador: parseInt(colab.idColaborador),
                    solicitacao13: (solicitacao13) ? new Date() : null
                })
                .then((response) => {
                    setAlert("success")
                    setMsg("Solicitação enviada com sucesso!")

                    apiPython
                        .post("/enviarEmail", {
                            nomeColaborador: colab.nome,
                            idSolicitacao: response.data.idSolicitacao,
                            email: colab.colaborador.email,
                            resposta: false
                        })
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.log(error.response.data.message);
                        })

                    apiPython
                        .post("/enviarNotificacao", {
                            idWorkplace: colab.idWorkplace,
                            nomeColaborador: colab.nome,
                            idSolicitacao: response.data.idSolicitacao,
                            resposta: false
                        })
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.log(error.response.data.message);
                        })
                })
                .catch((error) => {
                    setAlert("warning")
                    setMsg(error.response.data.message)
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

            <div className={Style.containerFerias}>
                <div className={Style.periodos}>
                    <span>Dias Disponíveis</span>
                    <span>{colab.diasDisponiveis}</span>
                </div>
                <div className={Style.periodos}>
                    <span>Período Aquisitivo</span>
                    <span>{format(addMonths(new Date(colab.dataContratacao), 12), 'dd/MM/yyyy')}</span>
                </div>
                <div className={Style.periodos}>
                    <span>Período Concessivo</span>
                    <span>{format(addMonths(new Date(colab.dataContratacao), 24), 'dd/MM/yyyy')}</span>
                </div>
            </div>

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
                    (colab.tipoContratacao === "CLT")
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