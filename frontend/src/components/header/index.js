//import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { Notificacoes } from "../notificacoes";
import Style from "./style.module.css"
import Logo from "../../assets/imgs/logo.png"

export const Header = () => {

    const dispatch = useDispatch();

    //const [visivel, setVisivel] = useState("");

    //function mostrarNotificacao() {
    //    (visivel === "") ? setVisivel("visivel") : setVisivel("");
    //}

    /*const notificacoes = [
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
    ]*/

    //const numNotific = notificacoes.length;

    return (
        <header>
            <div className={Style.logo}>
                <Link to="/home"><img src={Logo} alt="Logo" /></Link>
            </div>
            <div className={Style.opcoes}>
                {/* {(numNotific > 0) ? <span className={Style.count}>{numNotific}</span> : null}
                <span onClick={mostrarNotificacao}><i className="fa-regular fa-bell" title="notificação"></i></span> */}
                <Link to="/perfil"><i className="fa-regular fa-user" title="perfil"></i></Link>
                <Link to="/" onClick={() => { dispatch({ type: 'LOGOUT' }) }}><i className="fa-solid fa-door-open" title="sair"></i>
                </Link>
                {/* <div className={`containerNotificacao ${visivel}`}>
                    <div className={Style.notificacoes} >
                        <div className={Style.topo}>
                            <span>Notificações</span>
                        </div>
                        {notificacoes.map((notif, index) => <Notificacoes key={index} texto={notif.texto} />)}
                        <div className={Style.fundo}>
                            <span>Visualizar Tudo</span>
                        </div>
                    </div>
                </div> */}
            </div>
        </header >
    )
}