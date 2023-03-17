import { Card } from "../../components/card"
import { Header } from "../../components/header"
import { DonutChart } from "@tremor/react";
import { BarChart } from "@tremor/react";
import Style from "./style.module.css"

export const Dashboard = () => {

    const feriasTotal = [
        {
            name: "Ativo",
            sales: 21,
        },
        {
            name: "Férias",
            sales: 19,
        },
    ];

    const feriasMeses = [
        {
            name: "Jan",
            "Funcionários De Férias Por Mês": 4,
        },
        {
            name: "Fev",
            "Funcionários De Férias Por Mês": 2,
        },
        {
            name: "Mar",
            "Funcionários De Férias Por Mês": 0,
        },
        {
            name: "Abr",
            "Funcionários De Férias Por Mês": 0,
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
    ];

    return (
        <>
            <Header />
            <div className={Style.dashboard}>

                <div className={Style.containerGeral}>
                    <div className={Style.containerRequisicoes}>
                        <h2>Resultado das Solicitações</h2>
                        <div className={Style.requisicoes}>
                            <div className={Style.solicitacoes}>
                                <h3>Aprovadas</h3>
                                <div className={Style.aprovado}>10</div>
                            </div>
                            <div className={Style.solicitacoes}>
                                <h3>Negadas</h3>
                                <div className={Style.negado}>5</div>
                            </div>
                            <div className={Style.solicitacoes}>
                                <h3>Pendentes</h3>
                                <div className={Style.pendente}>15</div>
                            </div>
                            <div className={Style.solicitacoes}>
                                <h3>Total</h3>
                                <div className={Style.total}>30</div>
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
                            categories={["Funcionários De Férias Por Mês"]}
                            colors={["green"]}
                            yAxisWidth={25}
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
                                        {21}
                                    </div>
                                    <div className={Style.item}>
                                        <div className={Style.itemLegenda}>
                                            <span className={Style.spanFerias}></span><span>Férias</span>
                                        </div>
                                        {19}
                                    </div>
                                    <div className={Style.item}>
                                        <div className={Style.itemLegenda}>
                                            <span className={Style.spanTotal}></span><span>Total</span>
                                        </div>
                                        {40}
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