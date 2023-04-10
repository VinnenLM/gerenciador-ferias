import { useEffect, useState } from "react";
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
    const [colaborador, setColaborador] = useState([]);
    const [msg, setMsg] = useState("");
    const [alert, setAlert] = useState("");
    const [verificarCLT, setVerificarCLT] = useState(false);
    const [periodoAtual, setPeriodoAtual] = useState([]);
    const colab = useSelector((state) => state.colaborador);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
            api
            .get(`/colaborador/${colab.idColaborador}`)
            .then((response) => {
                console.log(response.data);
                setColaborador(response.data.colaborador);
                setVerificarCLT(response.data.verificarCLT);
                setPeriodoAtual(response.data.periodoAtual);
                setCarregando(false);
            })
            .catch((error) => {
                console.log(error);
                setCarregando(false);
            })
    }, [colab])

    if (carregando) {
        return <Header />;
      }

    function salvarSolicitacao() {

        if (colaborador.diasDisponiveis < qntDias) {
            setMsg("Quantidade de dias maior que o disponível")
            setAlert("warning")
        } else {
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
                        idColaborador: parseInt(colaborador.idColaborador),
                        solicitacao13: (solicitacao13) ? new Date() : null
                    })
                    .then((response) => {
                        
                        setMsg("Solicitação enviada com sucesso!")
                        setAlert("success")
                        
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
                                idWorkplace: colab.colaborador.idWorkplace,
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
                    <span>{colaborador.diasDisponiveis}</span>
                </div>
                <div className={Style.periodos}>
                    <span>Período Aquisitivo</span>
                    {
                        (periodoAtual !== null) ?
                            <span>{format(addDays(new Date(periodoAtual.inicio), 1), 'dd/MM/yyy')}</span> :
                            <span>{format(addDays(addMonths(new Date(colab.dataContratacao), 12), 1), 'dd/MM/yyyy')}</span>
                    }
                    
                </div>
                <div className={Style.periodos}>
                    <span>Período Concessivo</span>
                    {
                        (periodoAtual !== null) ?
                            <span>{format(addDays(new Date(periodoAtual.fim), 1), 'dd/MM/yyy')}</span> :
                            <span>{format(addDays(addMonths(new Date(colab.dataContratacao), 24), 1), 'dd/MM/yyyy')}</span>
                    }
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
                    ((colaborador.tipoContratacao === "CLT") && (verificarCLT === false))
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