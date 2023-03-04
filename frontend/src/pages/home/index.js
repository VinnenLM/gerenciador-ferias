import { useSelector } from "react-redux";
import { Card } from "../../components/card"
import { Header } from "../../components/header"
import "./style.css"

export const Home = () => {

    const role = useSelector((state) => state.role);

    return (
        <>
            <Header />
            <div className="cards">
                {
                    (role === "gestor")

                        ?

                        <>
                            <Card titulo="Solicitação de Férias" icone="fas fa-plane-departure" botao="Solicitar" link="/solicitar" />
                            <Card titulo="Minhas Solicitações" icone="fa-regular fa-file-lines" botao="Solicitar" link="/minhas-solicitacoes" />
                            <Card titulo="Dashboard" icone="fa-solid fa-chart-pie" botao="Visualizar" link="/dashboard" />
                        </>

                        :

                        (role === "funcionario" || role === "gestor")

                            ?

                            <>
                                <Card titulo="Solicitação de Férias" icone="fas fa-plane-departure" botao="Solicitar" link="/solicitar" />
                                <Card titulo="Minhas Solicitações" icone="fa-regular fa-file-lines" botao="Solicitar" link="/solicitar" />
                            </>

                            :

                            <>
                                <Card titulo="Cadastrar Colaborador" icone="fa-regular fa-user" botao="Cadastrar" link="/cadastro" />
                                <Card titulo="Listar Colaboradores" icone="fa-solid fa-users" botao="Visualizar" link="/colaboradores" />
                            </>

                }

            </div>
        </>
    )
}