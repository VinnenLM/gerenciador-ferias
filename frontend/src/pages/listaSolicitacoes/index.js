import { Header } from "../../components/header"
import { Solicitacao } from "../../components/solicitacao"
import "./style.css"

export const ListaSolicitacoes = () => {

    const solicitacoes = [
        {
            id: 1,
            dataSolicitacao: "01/01/2023",
            dataInicio: "01/01/2023",
            dataFim: "11/01/2023",
            comentario: "",
            status: "pendente",
            idColaborador: 2,
            colaborador: "Fulano da Silva"
        },
        {
            id: 2,
            dataSolicitacao: "02/02/2023",
            dataInicio: "02/02/2023",
            dataFim: "22/02/2023",
            comentario: "",
            status: "negado",
            idColaborador: 3,
            colaborador: "Beltrano da Silva"
        },
        {
            id: 3,
            dataSolicitacao: "03/03/2023",
            dataInicio: "03/03/2023",
            dataFim: "18/03/2023",
            comentario: "",
            status: "aprovado",
            idColaborador: 4,
            colaborador: "Ciclano da Silva"
        },
        {
            id: 4,
            dataSolicitacao: "04/04/2023",
            dataInicio: "04/04/2023",
            dataFim: "14/04/2023",
            comentario: "",
            status: "pendente",
            idColaborador: 5,
            colaborador: "Joaozinho da Silva"
        },
    ];

    return (
        <>
            <Header />
            <h1>Solicitações</h1>
            <input type="search" placeholder="Pesquisar colaborador" id="pesquisar" />

            <div className="container-equipe">
                <table className="table table-bordered">
                    <thead>
                        <tr className="tabela">
                            <th>Data Solicitação</th>
                            <th>Colaborador</th>
                            <th>Data Início</th>
                            <th>Data Fim</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitacoes.map((soli, index) => <Solicitacao key={index} dataSolicitacao={soli.dataSolicitacao} dataInicio={soli.dataInicio} dataFim={soli.dataFim} status={soli.status} colaborador={soli.colaborador} />)}
                    </tbody>
                </table>

            </div>
        </>
    )
}