import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Header } from "../../components/header"
import { Solicitacao } from "../../components/solicitacao"
import api from "../../services/api";
import Style from "../minhasSolicitacoes/style.module.css"

export const ListaSolicitacoes = () => {

    const idColaborador = useSelector((state) => state.idColaborador);
    const [solicitacoes, setSolicitacoes] = useState([]);

    useEffect(() => {
        api
            .post("/solicitacao/gestor", {
                idGestor: idColaborador
            })
            .then((response) => {
                setSolicitacoes(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [idColaborador])

    return (
        <>
            <Header />
            <h1 className={Style.titulo}>Solicitações</h1>
           
            <div className="containerPesquisa">
                <input type="search" placeholder="Pesquisar colaborador" id="pesquisar" className="pesquisa" />
                <span><i class="fa-solid fa-magnifying-glass"></i></span>
            </div>
            
            <div className={Style.containerSolicitacoes}>
                <table className="table table-bordered">
                    <thead>
                        <tr className={Style.tabela}>
                            <th>Data Solicitação</th>
                            <th>Colaborador</th>
                            <th>Data Início</th>
                            <th>Data Fim</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitacoes.map((soli, index) => <Solicitacao key={index} dataSolicitacao={soli.dataSolicitacao} colaborador={soli.nome} dataInicio={soli.dataInicio} dataFim={soli.dataFim} status={soli.statusSolicitacao} />)}
                    </tbody>
                </table>

            </div>
        </>
    )
}