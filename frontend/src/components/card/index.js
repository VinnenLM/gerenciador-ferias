import { Link } from "react-router-dom"
import "./style.css"

export const Card = ({ titulo, icone, botao, link }) => {
    return (
        <div className="container-card">
            <h2>{titulo}</h2>
            <div className="card">
                <span><i className={`${icone}`} title="perfil"></i></span>
                <Link to={`${link}`} className="botao">{botao}</Link>
            </div>
        </div>
    )
}