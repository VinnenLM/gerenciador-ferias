import { Header } from "../../components/header"
import "./style.css"

export const Colaboradores = () => {
    return (
        <>
            <Header />
            <h1>Colaboradores</h1>
            <input type="search" placeholder="Pesquisar colaborador" id="pesquisar"/>

            <div className="container">
            <table>

            </table>
            </div>
        </>
    )
}