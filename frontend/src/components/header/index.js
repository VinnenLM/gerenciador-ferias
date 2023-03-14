import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { Notificacoes } from "../notificacoes";
import "./style.css"

export const Header = () => {

    const dispatch = useDispatch();

    const [visivel, setVisivel] = useState("");

    function mostrarNotificacao() {
        (visivel === "") ? setVisivel("visivel") : setVisivel("");
    }

    const notificacoes = [
        {
            id: 1,
            texto: "Solicitação X efetuada!"
        },
        {
            id: 2,
            texto: "Solicitação Y efetuada!"
        },
        {
            id: 3,
            texto: "Solicitação Z efetuada!"
        },
    ]

    const numNotific = notificacoes.length;

    return (
        <header>
            <div className="logo">
                <Link to="/home">QQFérias</Link>
            </div>
            <div className="opcoes">
                {(numNotific > 0) ? <span className="count">{numNotific}</span> : null}
                <span onClick={mostrarNotificacao}><i className="fa-regular fa-bell" title="notificação"></i></span>
                <Link to="/perfil"><i className="fa-regular fa-user" title="perfil"></i></Link>
                <Link to="/" onClick={() => { dispatch({ type: 'LOGOUT' }) }}><i className="fa-solid fa-door-open" title="sair"></i>
                </Link>
                <div className={`notificacoes ${visivel}`} >
                    <div className="topo">
                        <span>Notificações</span>
                    </div>
                    {notificacoes.map((notif, index) => <Notificacoes key={index} texto={notif.texto} />)}
                    <div className="fundo">
                        <span>Visualizar Tudo</span>
                    </div>
                </div>
            </div>
        </header>
    )
}