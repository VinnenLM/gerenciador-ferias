import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/header"
import api from "../../services/api";
import { Modal } from "react-bootstrap";
import Style from "../solicitar/style.module.css"
import StyleLocal from "./style.module.css"
import { useSelector } from "react-redux";
import apiPython from "../../services/apiPython";

export const Solicitacao = () => {

    const { idSolicitacao } = useParams();
    const idColaborador = useSelector((state) => state.colaborador.idColaborador);

    const [solicitacao, setSolicitacao] = useState([]);
    const [colaborador, setColaborador] = useState([]);
    const [comentarioGestor, setComentarioGestor] = useState("");
    const [dataSolicitacao, setDataSolicitacao] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [checked, setChecked] = useState(false);
    const [confirmacao, setConfirmacao] = useState(false);
    const [msg, setMsg] = useState("");
    const [alert, setAlert] = useState("");

    useEffect(() => {
        api
            .get(`/solicitacao/${idSolicitacao}`)
            .then((response) => {
                console.log(response.data);
                (response.data.solicitacao13 !== null) ? setChecked(true) : setChecked(false);
                setSolicitacao(response.data);
                setColaborador(response.data.colaborador);
                setDataSolicitacao(format(addDays(new Date(response.data.dataSolicitacao), (1)), 'dd/MM/yyyy'));
                setDataInicio(format(addDays(new Date(response.data.dataInicio), (1)), 'dd/MM/yyyy'));
                setDataFim(format(addDays(new Date(response.data.dataFim), (1)), 'dd/MM/yyyy'));
            })
            .catch((error) => {
                console.log(error);
            })
    }, [idSolicitacao])

    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);

    function handleShow(confirmacao) {
        (confirmacao === true)
            ? setConfirmacao(true)
            : setConfirmacao(false)
        setShow(true);
    }

    function atualizarSolicitacao() {
        let stats = "";
        (confirmacao === true) ? stats = "aprovado" : stats = "negado";
        api
            .put(`/solicitacao/${solicitacao.idSolicitacao}`, {
                "statusSolicitacao": stats,
                "comentarioGestor": comentarioGestor
            })
            .then((response) => {
                setAlert("success")
                setMsg("Solicitação alterada com sucesso!")
                setShow(false);
                apiPython
                    .post("/enviarEmail", {
                        idSolicitacao: response.data.idSolicitacao,
                        email: colaborador.email,
                        resposta: true,
                        analise: (confirmacao === true) ? "aprovado" : "negado"
                    })
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log(error.response.data.message);
                    })

                apiPython
                    .post("/enviarNotificacao", {
                        idWorkplace: colaborador.idWorkplace,
                        idSolicitacao: response.data.idSolicitacao,
                        resposta: true,
                        analise: (confirmacao === true) ? "aprovado" : "negado"
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
                setMsg("Erro ao alterar solicitação!")
                console.log(error);
            })
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

            <h1 className={Style.titulo}>Solicitação</h1>
            <div className={Style.containerSolicitacao}>

                <div className={StyleLocal.inputNome}>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" value={colaborador.nome} readOnly />
                </div>

                <div className={Style.containerDuplo}>

                    <div className={Style.inputDuplo}>
                        <label htmlFor="">Matrícula</label>
                        <input type="text" value={colaborador.matricula} readOnly />
                    </div>

                    <div className={Style.inputDuplo}>
                        <label htmlFor="">Data da Solicitação</label>
                        <input type="text" value={dataSolicitacao} readOnly />
                    </div>

                </div>

                <div className={Style.containerDuplo}>

                    <div className={Style.inputDuplo}>
                        <label htmlFor="">Data de Início</label>
                        <input type="text" value={dataInicio} readOnly />
                    </div>

                    <div className={Style.inputDuplo}>
                        <label htmlFor="">Data de Término</label>
                        <input type="text" value={dataFim} readOnly />
                    </div>

                </div>

                <label htmlFor="observacao">Obervação</label>
                <textarea className={Style.textarea} name="observacao" id="observacao" cols="30" rows="3" value={solicitacao.comentarioColab}></textarea>

                <div className={Style.antecipacao}>
                    <label htmlFor="antecipacao">Antecipar 13°</label>
                    <input type="checkbox" name="antecipacao" id="antecipacao" checked={checked} readOnly />
                </div>

                {
                    (colaborador.idGestor === idColaborador && solicitacao.statusSolicitacao === "pendente")
                        ?
                        <div className={StyleLocal.statusSolicitacaoDuplo}>
                            <button className="negado" onClick={() => { handleShow(false) }}>Negar</button>
                            <button className="aprovado" onClick={() => { handleShow(true) }}>Aprovar</button>
                        </div>
                        :
                        (solicitacao.statusSolicitacao !== "pendente")
                            ?
                            <>
                                <div className={StyleLocal.statusSolicitacao}>
                                    <span className={solicitacao.statusSolicitacao}>{solicitacao.statusSolicitacao}</span>
                                </div>
                                <div className={StyleLocal.inputNome}>
                                    <label htmlFor="comentarioGestor">Comentário</label>
                                    <textarea className={Style.textarea} name="comentarioGestor" id="comentarioGestor" cols="30" rows="3" value={solicitacao.comentarioGestor} readOnly></textarea>
                                </div>
                            </>
                            :
                            <div className={StyleLocal.statusSolicitacao}>
                                <span className="pendente">Pendente</span>
                            </div>
                }

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title className="text-dark">Confirmação</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-dark">
                        <div className={StyleLocal.inputNome}>
                            <label htmlFor="comentarioGestor">Comentário</label>
                            <textarea className={Style.textarea} name="comentarioGestor" id="comentarioGestor" cols="30" rows="3" value={comentarioGestor} onChange={(evt) => setComentarioGestor(evt.target.value)}></textarea>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className={StyleLocal.statusSolicitacaoDuplo}>
                            <button className="pendente" onClick={handleClose}>Cancelar</button>
                            {
                                (confirmacao === true)
                                    ? <button className="aprovado" onClick={atualizarSolicitacao}>Aprovar</button>
                                    : <button className="negado" onClick={atualizarSolicitacao}>Negar</button>
                            }
                        </div>
                    </Modal.Footer>
                </Modal>

            </div>
        </>
    )
}