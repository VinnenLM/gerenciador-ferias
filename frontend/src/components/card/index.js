import "./style.css"

export const Card = ({ titulo, icone, botao }) => {
    return (
        <div className="container-card">
            <h2>{titulo}</h2>
            <div className="card">
                <span><i className={`${icone}`} title="perfil"></i></span>
                <button>{botao}</button>
            </div>
        </div>
    )
}