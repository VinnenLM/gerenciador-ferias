import { Card } from "../../components/card"
import { Header } from "../../components/header"
import "./style.css"

export const Home = () => {
    return (
        <>
            <Header />
            <div className="cards">
                <Card
                    titulo="Teste"
                    icone="fa-regular fa-user"
                    botao="Cadastrar"
                />
                <Card
                    titulo="Teste"
                    icone="fa-regular fa-user"
                    botao="Cadastrar"
                />
                <Card
                    titulo="Teste"
                    icone="fa-regular fa-user"
                    botao="Cadastrar"
                />
            </div>
        </>
    )
}