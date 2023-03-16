import { Header } from "../../components/header"
import { Pessoa } from "../../components/pessoa"
import Style from "./style.module.css"

export const Colaboradores = () => {

    const pessoas = [
        {
            nome: "Fulano da Silva",
            setor: "TI",
            matricula: "123",
            status: "ativo"
        },
        {
            nome: "Beltrano da Silva",
            setor: "RH",
            matricula: "321",
            status: "ferias"
        },
        {
            nome: "Ciclano da Silva",
            setor: "Contabilidade",
            matricula: "456",
            status: "ferias"
        },
        {
            nome: "Joaozinho da Silva",
            setor: "TI",
            matricula: "654",
            status: "ativo"
        },
        {
            nome: "Gestor da Silva",
            setor: "TI",
            matricula: "111",
            status: "ativo"
        },
    ]

    return (
        <>
            <Header />
            
            {
                (window.location.pathname === "/equipe") ? <h1 className={Style.titulo}>Equipe</h1> : <h1 className={Style.titulo}>Colaboradores</h1>
            }
            
            <div className={Style.containerPesquisa}>
                <input type="search" placeholder="Pesquisar colaborador" id="pesquisar" className={Style.pesquisa} />
                <span><i class="fa-solid fa-magnifying-glass"></i></span>
            </div>

            <div className={Style.containerEquipe}>
                <table class="table table-bordered">
                    <thead>
                        <tr className="tabela">
                            <th>Colaborador</th>
                            <th>Setor</th>
                            <th>Matrícula</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pessoas.map((pessoa, index) => <Pessoa key={index} nome={pessoa.nome} setor={pessoa.setor} matricula={pessoa.matricula} status={pessoa.status} />)}
                    </tbody>
                </table>

            </div>
        </>
    )
}