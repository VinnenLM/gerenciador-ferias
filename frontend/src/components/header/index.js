import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import "./style.css"

export const Header = () => {

    const dispatch = useDispatch();

    return (
        <header>
            <div className="logo">
                <Link to="/home">QQFérias</Link>
            </div>
            <div className="opcoes">
                <Link to="/notificacao"><i className="fa-regular fa-bell" title="notificação"></i></Link>
                <Link to="/perfil"><i className="fa-regular fa-user" title="perfil"></i></Link>
                <Link to="/" onClick={() => { dispatch({ type: 'LOGOUT' }) }}><i className="fa-solid fa-door-open" title="sair"></i>
                </Link>
            </div>
        </header>
    )
}