import { Link } from "react-router-dom"
import "./style.css"

export const Login = () => {
    return (
        <div className="container-principal">
            <h1>QQFérias</h1>
            <div className="container-login">
                <input type="text" placeholder="Login" />
                <input type="text" placeholder="Senha" />
                <Link to="/home" id="entrar">Entrar</Link>
            </div>
        </div >
    )
}