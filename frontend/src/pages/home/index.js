import { Card } from "../../components/card"
import { Header } from "../../components/header"
import "./style.css"

export const Home = () => {
    return (
        <>
            <Header />
            <div className="cards">
                <Card
                    titulo="Cadastro Colaborador"
                    icone="fa-regular fa-user"
                    botao="Cadastrar"
                    link="/cadastro"
                />
                <Card
                    titulo="Lista Colaboradores"
                    icone="fa-solid fa-users"
                    botao="Visualizar"
                    link="/colaboradores"
                />
                <Card
                    titulo="Solicitar Férias"
                    icone="fas fa-plane-departure"
                    botao="Solicitar"
                    link="/solicitar"
                />
            </div>
        </>
    )
}