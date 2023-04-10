import { useEffect, useState } from "react"
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header"
import { Pessoa } from "../../components/pessoa"
import api from "../../services/api";
import Style from "./style.module.css"

export const Colaboradores = () => {

    const [colaboradores, setColaboradores] = useState([]);
    const [msg, setMsg] = useState(false);
    const [msgTexto, setMsgTexto] = useState("");
    const [idAlterar, setIdAlterar] = useState(0);
    const [diasDisponiveis, setDiasDisponiveis] = useState(0);
    const [query, setQuery] = useState("");
    const idColaborador = useSelector((state) => state.colaborador.idColaborador);
    const idPerfil = useSelector((state) => state.colaborador.idPerfil);
    const [pesquisa] = useState(["nome", "matricula", "nomeSetor", "email", "diasDisponiveis", "stats"]);
    const navigate = useNavigate();
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        if (idPerfil === 1) {
            api
                .get("/colaborador")
                .then((response) => {
                    console.log(response.data);
                    setColaboradores(response.data.todosColaboradores)
                })
                .catch((error) => {
                    console.log(error);
                })
        } else if (idPerfil === 2) {
            api
                .post("/colaborador/gestor", {
                    idGestor: idColaborador
                })
                .then((response) => {
                    setColaboradores(response.data.todosColaboradores)
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            navigate("/home");
        }

    }, [idColaborador, idPerfil, navigate])

    function buscarColaborador(items) {
        return items.filter((item) => {
            return pesquisa.find((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(query.toLowerCase()) > -1
                );
            });
        });
    }

    function alterarDias(id, dias) {
        setIdAlterar(id)
        setDiasDisponiveis(dias)
        setShow(true);
    }

    function alterarDiasDisponiveis() {
        api
            .post("/colaborador/diasDisponiveis", {
                idColaborador: idAlterar,
                diasDisponiveis: diasDisponiveis
            })
            .then((response) => {
                window.location.reload();
                setShow(false);
            })
            .catch((error) => {
                setMsg(true)
                setMsgTexto(error.response.data.message)
                console.log(error);
            })
    }

    return (
        <>
            <Header />

            {
                (window.location.pathname === "/equipe") ? <h1 className={Style.titulo}>Equipe</h1> : <h1 className={Style.titulo}>Colaboradores</h1>
            }

            <div className="containerPesquisa">
                <input type="search" placeholder="Pesquisar colaborador" id="pesquisar" className="pesquisa" value={query} onChange={(evt) => setQuery(evt.target.value)} />
                <span><i className="fa-solid fa-magnifying-glass"></i></span>
            </div>

            <div className={Style.containerEquipe}>
                <table className="table table-bordered">
                    <thead>
                        <tr className={Style.tabela}>
                            <th>Matrícula</th>
                            <th>Colaborador</th>
                            <th>Setor</th>
                            <th>Email</th>
                            <th>Dias Disponíveis</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buscarColaborador(colaboradores).map((pessoa, index) =>
                            <Pessoa
                                onClick={() => alterarDias(pessoa.idColaborador, pessoa.diasDisponiveis)}
                                key={index}
                                matricula={pessoa.matricula}
                                nome={pessoa.nome}
                                setor={pessoa.nomeSetor}
                                email={pessoa.email}
                                diasDisponiveis={pessoa.diasDisponiveis}
                                status={pessoa.stats}
                                acumulo={pessoa.acumuloPeriodo}
                            />
                        )}
                    </tbody>
                </table>

            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="text-dark">Alterar Dias Disponíveis</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`text-dark d-flex flex-column ${Style.bodySpan}`}>
                    {msg === true ?
                        (<div className="alert alert-warning mx-auto" role="alert">
                            {msgTexto}
                        </div>)
                        :
                        null
                    }
                    <label htmlFor="diasDisponiveis">Dias Disponíveis</label>
                    <input className={Style.diasDisponiveis} type="number" placeholder="00" name="diasDisponiveis" min="0" max="30" id="diasDisponiveis" value={diasDisponiveis} onChange={(evt) => setDiasDisponiveis(evt.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <button className={Style.salvar} onClick={alterarDiasDisponiveis}>Salvar</button>
                    </div>
                </Modal.Footer>
            </Modal>

        </>
    )
}