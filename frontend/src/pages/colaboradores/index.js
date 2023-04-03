import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header"
import { Pessoa } from "../../components/pessoa"
import api from "../../services/api";
import Style from "./style.module.css"

export const Colaboradores = () => {

    const [colaboradores, setColaboradores] = useState([]);
    const [query, setQuery] = useState("");
    const idColaborador = useSelector((state) => state.colaborador.idColaborador);
    const idPerfil = useSelector((state) => state.colaborador.idPerfil);
    const [pesquisa] = useState(["nome", "matricula", "stats"]);
    const navigate = useNavigate();

    useEffect(() => {
        if (idPerfil === 1) {
            api
                .get("/colaborador")
                .then((response) => {
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
                            <th>Colaborador</th>
                            <th>Setor</th>
                            <th>Matrícula</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buscarColaborador(colaboradores).map((pessoa, index) =>
                            <Pessoa
                                key={index}
                                nome={pessoa.nome}
                                setor={pessoa.setor.nomeSetor}
                                matricula={pessoa.matricula}
                                status={pessoa.stats}
                            />
                        )}
                    </tbody>
                </table>

            </div>
        </>
    )
}