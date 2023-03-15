import { Card } from "../../components/card"
import { Header } from "../../components/header"
import { DonutChart } from "@tremor/react";
import { BarChart } from "@tremor/react";
import "./style.css"

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
            <div className="dashboard">

                <div className="container-geral">
                    <div className="container-cards">
                        <h2>Funcionários</h2>
                        <div className="container-pie">
                            <div className="legenda">
                                <span className="span-ativo">Ativos {21}</span>
                                <span className="span-ferias">Férias {19}</span>
                                <span className="span-total">Total {40}</span>
                            </div>
                            <div className="pie">
                                <DonutChart
                                    className="mt-2"
                                    data={feriasTotal}
                                    category="sales"
                                    variant="pie"
                                    showLabel={true}
                                    colors={["yellow", "green"]}
                                />
                            </div>

                        </div>

                    </div>
                    <Card botao="Visualizar" icone="far fa-copy" link="/solicitacoes" titulo="Solicitações" />
                    <Card botao="Visualizar" icone="fa-solid fa-users" link="/colaboradores" titulo="Equipe" />
                </div>

                <div className="grafico-meses">
                    <div className="container-chart">
                        <BarChart
                            className="mt-6"
                            data={feriasMeses}
                            index="name"
                            categories={["Funcionários De Férias Por Mês"]}
                            colors={["green"]}
                            yAxisWidth={50}
                        />
                    </div>
                    <div className="container-calendar">
                        <BarChart
                            className="mt-6"
                            data={feriasMeses}
                            index="name"
                            categories={["Funcionários De Férias Por Mês"]}
                            colors={["green"]}
                            yAxisWidth={50}
                        />
                    </div>
                </div>

            </div>
        </>
    )
}