import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Style from "./style.module.css"
import Logo from "../../assets/imgs/logo.png"

export const Login = () => {

    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [msg, setMsg] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function redirecionar() {
        if (login === "admin" || login === "gestor" || login === "funcionario") {
            dispatch({ type: 'LOGIN', role: login });
            navigate("/home")
        } else {
            setMsg(true)
        }
    }

    return (
        <div className={Style.containerPrincipal}>

            {msg === true ?
                (<div className="alert alert-warning w-25 mx-auto" role="alert">
                    Login ou Senha inválidos!
                </div>)
                :
                null
            }

            <div className={Style.containerLogin}>
                <div className={Style.containerLogo}>
                    <img className={Style.logo} src={Logo} alt="Logo" />
                    <h1>Férias</h1>
                </div>
                <div className={Style.loginInput}>
                    <i className="fa-regular fa-user"></i><input type="text" placeholder="Login" value={login} onChange={(evt) => setLogin(evt.target.value)} />
                </div>
                <div className={Style.loginInput}>
                    <i className="fa-solid fa-lock"></i><input type="password" placeholder="Senha" value={senha} onChange={(evt) => setSenha(evt.target.value)} />
                </div>
                <button to="/home" className={Style.botao} onClick={redirecionar}>Entrar</button>
            </div>
        </div >
    )
}