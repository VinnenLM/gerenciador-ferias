import { Link } from "react-router-dom"
import Style from "./style.module.css"

export const Card = ({ titulo, icone, botao, link }) => {
    return (
        <div className={Style.containerCard}>
            <h2>{titulo}</h2>
            <div className={Style.card}>
                <span><i className={`${icone}`}></i></span>
                <Link to={`${link}`} className={Style.botao}>{botao}</Link>
            </div>
        </div>
    )
}