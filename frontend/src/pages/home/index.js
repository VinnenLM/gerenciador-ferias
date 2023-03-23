import { useSelector } from "react-redux";
import { Card } from "../../components/card"
import { Header } from "../../components/header"
import Style from "./style.module.css"

export const Home = () => {

    const idPerfil = useSelector((state) => state.idPerfil);

    return (
        <>
            <Header />
            <div className={Style.containerCards}>
                <div className={Style.cards}>
                    {
                        (idPerfil === 2)
                            ?
                            <>
                                <Card titulo="Solicitação de Férias" icone="fas fa-plane-departure" botao="Solicitar" link="/solicitar" />
                                <Card titulo="Minhas Solicitações" icone="fa-regular fa-file-lines" botao="Solicitar" link="/minhas-solicitacoes" />
                                <Card titulo="Dashboard" icone="fa-solid fa-chart-pie" botao="Visualizar" link="/dashboard" />
                            </>
                            :
                            (idPerfil === 3)
                                ?
                                <>
                                    <Card titulo="Solicitação de Férias" icone="fas fa-plane-departure" botao="Solicitar" link="/solicitar" />
                                    <Card titulo="Minhas Solicitações" icone="fa-regular fa-file-lines" botao="Solicitar" link="/minhas-solicitacoes" />
                                </>
                                :
                                <>
                                    <Card titulo="Cadastrar Colaborador" icone="fa-regular fa-user" botao="Cadastrar" link="/cadastro" />
                                    <Card titulo="Listar Colaboradores" icone="fa-solid fa-users" botao="Visualizar" link="/colaboradores" />
                                </>
                    }
                </div>
            </div>
        </>
    )
}