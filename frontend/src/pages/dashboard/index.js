import { Card } from "../../components/card"
import { Header } from "../../components/header"
import { DonutChart } from "@tremor/react";
import { BarChart } from "@tremor/react";
import api from "../../services/api";
import Style from "./style.module.css"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import apiPython from "../../services/apiPython";

export const Dashboard = () => {

    const [ativos, setAtivos] = useState(0);
    const [ferias, setFerias] = useState(0);
    const [aprovados, setAprovados] = useState(0);
    const [negados, setNegados] = useState(0);
    const [pendentes, setPendentes] = useState(0);
    const [totalSolicitacoes, setTotalSolicitacoes] = useState(0);
    const [colaboradores, setColaboradores] = useState([]);
    const colab = useSelector((state) => state.colaborador);
    const navigate = useNavigate();
    const [feriasMeses, setFeriasMeses] = useState([])

    useEffect(() => {
        if (colab.idPerfil === 2) {
            api
                .post("/colaborador/gestor", {
                    idGestor: colab.idColaborador
                })
                .then((response) => {
                    setAtivos(response.data.countAtivos);
                    setFerias(response.data.countFerias);
                    setColaboradores(response.data.todosColaboradores)
                })
                .catch((error) => {
                    console.log(error);
                })
            api
                .post("/solicitacao/gestor/count", {
                    idGestor: colab.idColaborador
                })
                .then((response) => {
                    setAprovados(response.data.aprovados)
                    setNegados(response.data.negados)
                    setPendentes(response.data.pendentes)
                    setTotalSolicitacoes(response.data.total)
                })
                .catch((error) => {
                    console.log(error);
                })
            api
                .post("/solicitacao/gestor/meses", {
                    idGestor: colab.idColaborador
                })
                .then((response) => {
                    console.log(response.data)
                    setFeriasMeses(response.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            navigate("/home");
        }

    }, [colab, navigate])

    const feriasTotal = [
        {
            name: "Ativo",
            sales: ativos,
        },
        {
            name: "Férias",
            sales: ferias,
        },
    ];

    function enviarRelatorioAtivosFerias() {
        apiPython
            .post("/enviarRelatorio", {
                data: {
                    ativos: ativos,
                    ferias: ferias
                },
                email: colab.email
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.response.data.message);
            })
    }

    function enviarRelatorioTotalSolicitacoes() {
        apiPython
            .post("/enviarRelatorio", {
                data: {
                    aprovadas: aprovados,
                    negadas: negados,
                    pendentes: pendentes,
                    total: totalSolicitacoes
                },
                email: colab.email
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.response.data.message);
            })
    }

    function enviarRelatorioTodosColaboradores() {

        let dados = []

        colaboradores.forEach((colab) => {
            let array = {
                "matricula": colab.matricula,
                "nome": colab.nome,
                "cpf": colab.cpf,
                "email": colab.email,
                "tipoContratacao": colab.tipoContratacao,
                "dataContratacao": colab.dataContratacao,
                "setor": colab.setor.nomeSetor,
                "status": colab.stats
            };
            dados.push(array)
        })

        apiPython
            .post("/enviarRelatorio", {
                data: {
                    colaboradores: dados,
                },
                email: colab.email,
                colaboradores: true
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.response.data.message);
            })
    }

    /*const feriasMeses = [
        {
            name: "Jan",
            "Funcionários De Férias Por Mês": 14,
        },
        {
            name: "Fev",
            "Funcionários De Férias Por Mês": 14,
        },
        {
            name: "Mar",
            "Funcionários De Férias Por Mês": 5,
        },
        {
            name: "Abr",
            "Funcionários De Férias Por Mês": 6,
        },
        {
            name: "Mai",
            "Funcionários De Férias Por Mês": 0,
        },
        {
            name: "Jun",
            "Funcionários De Férias Por Mês": 1,
        },
        {
            name: "Jul",
            "Funcionários De Férias Por Mês": 2,
        },
        {
            name: "Ago",
            "Funcionários De Férias Por Mês": 4,
        },
        {
            name: "Set",
            "Funcionários De Férias Por Mês": 1,
        },
        {
            name: "Out",
            "Funcionários De Férias Por Mês": 0,
        },
        {
            name: "Nov",
            "Funcionários De Férias Por Mês": 0,
        },
        {
            name: "Dez",
            "Funcionários De Férias Por Mês": 5,
        },
    ];*/

    return (
        <>
            <Header />
            <div className={Style.dashboard}>
                <div className={Style.containerGeral}>

                    <div className={Style.relatorio}>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Relatórios
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => { enviarRelatorioAtivosFerias() }}>Funcionários Ativos/Férias</Dropdown.Item>
                                <Dropdown.Item onClick={() => { enviarRelatorioTotalSolicitacoes() }}>Total Solicitações</Dropdown.Item>
                                <Dropdown.Item onClick={() => { enviarRelatorioTodosColaboradores() }}>Todos Colaboradores</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className={Style.containerRequisicoes}>
                        <h2>Resultado das Solicitações</h2>
                        <div className={Style.requisicoes}>
                            <div className={Style.solicitacoes}>
                                <h3>Aprovadas</h3>
                                <div className={Style.aprovado}>{aprovados}</div>
                            </div>
                            <div className={Style.solicitacoes}>
                                <h3>Negadas</h3>
                                <div className={Style.negado}>{negados}</div>
                            </div>
                            <div className={Style.solicitacoes}>
                                <h3>Pendentes</h3>
                                <div className={Style.pendente}>{pendentes}</div>
                            </div>
                            <div className={Style.solicitacoes}>
                                <h3>Total</h3>
                                <div className={Style.total}>{totalSolicitacoes}</div>
                            </div>
                        </div>
                    </div>

                    <div className={Style.containerCards}>
                        <Card botao="Visualizar" icone="far fa-copy" link="/solicitacoes" titulo="Solicitações" />
                        <Card botao="Visualizar" icone="fa-solid fa-users" link="/equipe" titulo="Equipe" />
                    </div>

                </div>

                <div className={Style.graficoMeses}>
                    <div className={Style.containerChart}>
                        <BarChart
                            className="mt-6"
                            data={feriasMeses}
                            index="name"
                            categories={["FeriasPorMes"]}
                            colors={["green"]}
                            yAxisWidth={30}
                        />
                    </div>

                    <div className={Style.containerGrafico}>
                        <h2>Funcionários</h2>
                        <div className={Style.containerPie}>
                            <div className={Style.graficoPie}>
                                <div className={Style.legenda}>
                                    <div className={Style.item}>
                                        <div className={Style.itemLegenda}>
                                            <span className={Style.spanAtivo}></span><span>Ativos</span>
                                        </div>
                                        {ativos}
                                    </div>
                                    <div className={Style.item}>
                                        <div className={Style.itemLegenda}>
                                            <span className={Style.spanFerias}></span><span>Férias</span>
                                        </div>
                                        {ferias}
                                    </div>
                                    <div className={Style.item}>
                                        <div className={Style.itemLegenda}>
                                            <span className={Style.spanTotal}></span><span>Total</span>
                                        </div>
                                        {ativos + ferias}
                                    </div>
                                </div>
                                <div className={Style.pie}>
                                    <DonutChart
                                        className="mt-2"
                                        data={feriasTotal}
                                        category="sales"
                                        variant="pie"
                                        showLabel={true}
                                        colors={["green", "yellow"]}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}