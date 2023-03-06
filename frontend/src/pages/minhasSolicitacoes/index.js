import { Header } from "../../components/header"
import { Solicitacao } from "../../components/solicitacao"
import "./style.css"

export const MinhasSolicitacoes = () => {
    return (
        <>
            <Header />
            <h1>Minhas Solicitações</h1>
            <input type="search" placeholder="Pesquisar colaborador" id="pesquisar" />

            <div className="container-equipe">
                <table class="table table-bordered">
                    <thead>
                        <tr className="tabela">
                            <th>Data Solicitação</th>
                            <th>Data Início</th>
                            <th>Data Fim</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Solicitacao dataSolicitacao="03/03/2023" dataInicio="10/10/2023" DataFim="20/10/2023" status="pendente" />
                        <Solicitacao dataSolicitacao="03/03/2023" dataInicio="10/10/2023" DataFim="20/10/2023" status="aprovado" />
                        <Solicitacao dataSolicitacao="03/03/2023" dataInicio="10/10/2023" DataFim="20/10/2023" status="negado" />
                    </tbody>
                </table>

            </div>
        </>
    )
}