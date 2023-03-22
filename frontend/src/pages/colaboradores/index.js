import { useEffect, useState } from "react"
import { Header } from "../../components/header"
import { Pessoa } from "../../components/pessoa"
import api from "../../services/api";
import Style from "./style.module.css"

export const Colaboradores = () => {

    const [colaboradores, setColaboradores] = useState([]);
    const [query, setQuery] = useState("");
    const [pesquisa] = useState(["nome", "matricula", "nomeSetor"]);

    useEffect(() => {
        api
            .get("/colaborador")
            .then((response) => {
                setColaboradores(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

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

    return (
        <>
            <Header />

            {
                (window.location.pathname === "/equipe") ? <h1 className={Style.titulo}>Equipe</h1> : <h1 className={Style.titulo}>Colaboradores</h1>
            }

            <div className="containerPesquisa">
                <input type="search" placeholder="Pesquisar colaborador" id="pesquisar" className="pesquisa" value={query} onChange={(evt) => setQuery(evt.target.value)}/>
                <span><i className="fa-solid fa-magnifying-glass"></i></span>
            </div>

            <div className={Style.containerEquipe}>
                <table className="table table-bordered">
                    <thead>
                        <tr className={Style.tabela}>
                            <th>Colaborador</th>
                            <th>Setor</th>
                            <th>Matrícula</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buscarColaborador(colaboradores).map((pessoa, index) => <Pessoa key={index} nome={pessoa.nome} setor={pessoa.setor.nomeSetor} matricula={pessoa.matricula}  />)}
                    </tbody>
                </table>

            </div>
        </>
    )
}