import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components/header"
import { Solicitacao } from "../../components/solicitacao"
import api from "../../services/api";
import Style from "./style.module.css"

export const MinhasSolicitacoes = () => {

    const idColaborador = useSelector((state) => state.colaborador.idColaborador);
    const [solicitacoes, setSolicitacoes] = useState([]);

    useEffect(() => {
        api
            .post("/solicitacao/minhasSolicitacoes", {
                idColaborador: idColaborador
            })
            .then((response) => {
                setSolicitacoes(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [idColaborador])

    return (
        <>
            <Header />
            <h1 className={Style.titulo}>Minhas Solicitações</h1>
           
            <div className="containerPesquisa">
                <input type="search" placeholder="Pesquisar colaborador" id="pesquisar" className="pesquisa" />
                <span><i className="fa-solid fa-magnifying-glass"></i></span>
            </div>
            
            <div className={Style.containerSolicitacoes}>
                <table className="table table-bordered">
                    <thead>
                        <tr className={Style.tabela}>
                            <th>Data Solicitação</th>
                            <th>Data Início</th>
                            <th>Data Fim</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitacoes.map((soli, index) => <Solicitacao key={index} id={soli.idSolicitacao} dataSolicitacao={soli.dataSolicitacao} dataInicio={soli.dataInicio} dataFim={soli.dataFim} status={soli.statusSolicitacao} />)}
                    </tbody>
                </table>

            </div>
        </>
    )
}