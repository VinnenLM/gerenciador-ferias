import { Link } from "react-router-dom"
import "./style.css"

export const Header = () => {
    return (
        <header>
            <div className="logo">
                <Link to="/home">QQFérias</Link>
            </div>
            <div className="opcoes">
                <Link to="/notificacao"><i className="fa-regular fa-bell" title="notificação"></i></Link>
                <Link to="/perfil"><i className="fa-regular fa-user" title="perfil"></i></Link>
                <Link to="/"><i className="fa-solid fa-door-open" title="sair"></i>
                </Link>
            </div>
        </header>
    )
}