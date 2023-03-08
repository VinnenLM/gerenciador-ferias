import { Link } from "react-router-dom"
import "./style.css"

export const Notificacoes = ({ texto }) => {

    return (
        <div className="notificacao">
            <span>{texto}</span>
            <Link to="/notificacoes">Visualizar</Link>
        </div>
    )
}