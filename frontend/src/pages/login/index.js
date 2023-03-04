import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import "./style.css"

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
        <div className="container-principal">

            {msg === true ?
                (<div className="alert alert-warning w-25 mx-auto" role="alert">
                    Login ou Senha inválidos!
                </div>)
                :
                null
            }

            <h1>QQFérias</h1>
            <div className="container-login">
                <input type="text" placeholder="Login" value={login} onChange={(evt) => setLogin(evt.target.value)} />
                <input type="password" placeholder="Senha" value={senha} onChange={(evt) => setSenha(evt.target.value)} />
                <button to="/home" id="entrar" onClick={redirecionar}>Entrar</button>
            </div>
        </div >
    )
}