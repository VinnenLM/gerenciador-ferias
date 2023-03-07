import { Header } from "../../components/header"
import { Solicitacao } from "../../components/solicitacao"
import "./style.css"

export const MinhasSolicitacoes = () => {

    const minhasSolicitacoes = [
        {
            id: 1,
            dataSolicitacao: "01/01/2023",
            dataInicio: "01/01/2023",
            dataFim: "11/01/2023",
            comentario: "",
            status: "pendente",
            idColaborador: 1
        },
        {
            id: 2,
            dataSolicitacao: "02/02/2023",
            dataInicio: "02/02/2023",
            dataFim: "22/02/2023",
            comentario: "",
            status: "negado",
            idColaborador: 1
        },
        {
            id: 3,
            dataSolicitacao: "03/03/2023",
            dataInicio: "03/03/2023",
            dataFim: "18/03/2023",
            comentario: "",
            status: "aprovado",
            idColaborador: 1
        },
    ]

    return (
        <>
            <Header />
            <h1>Minhas Solicitações</h1>
            <input type="search" placeholder="Pesquisar colaborador" id="pesquisar" />

            <div className="container-equipe">
                <table className="table table-bordered">
                    <thead>
                        <tr className="tabela">
                            <th>Data Solicitação</th>
                            <th>Data Início</th>
                            <th>Data Fim</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {minhasSolicitacoes.map((soli, index) => <Solicitacao key={index} dataSolicitacao={soli.dataSolicitacao} dataInicio={soli.dataInicio} dataFim={soli.dataFim} status={soli.status} colaborador={soli.colaborador} idColaborador={soli.idColaborador} />)}
                    </tbody>
                </table>

            </div>
        </>
    )
}