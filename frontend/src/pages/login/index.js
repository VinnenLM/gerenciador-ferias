import "./style.css"

export const Login = () => {
    return (
        <div className="container-principal">
            <h1>QQFérias</h1>
            <div className="container">
                <input type="text" placeholder="Login" />
                <input type="text" placeholder="Senha" />
                <button>Entrar</button>
            </div>
        </div>
    )
}