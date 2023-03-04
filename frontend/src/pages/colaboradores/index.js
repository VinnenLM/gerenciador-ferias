import { Header } from "../../components/header"
import { Pessoa } from "../../components/pessoa"
import "./style.css"

export const Colaboradores = () => {
    return (
        <>
            <Header />
            <h1>Equipe</h1>
            <input type="search" placeholder="Pesquisar colaborador" id="pesquisar" />

            <div className="container-equipe">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Colaborador</th>
                            <th>Setor</th>
                            <th>Matrícula</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Pessoa nome="Fulano" setor="TI" matricula="123" status="ferias" />
                        <Pessoa nome="Fulano" setor="TI" matricula="321" status="ativo" />
                    </tbody>
                </table>

            </div>
        </>
    )
}