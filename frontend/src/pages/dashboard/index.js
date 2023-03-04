import { Card } from "../../components/card"
import { Header } from "../../components/header"

export const Dashboard = () => {
    return (
        <>
            <Header />
            <h1>Dashboard</h1>
            <div className="grafico-redondo">

            </div>

            <div className="cards">
                <Card botao="Visualizar" icone="far fa-copy" link="/solicitacoes" titulo="Solicitações" />
                <Card botao="Visualizar" icone="fa-solid fa-users" link="/colaboradores" titulo="Equipe" />
            </div>

            <div className="grafico-meses">
            </div>
        </>
    )
}