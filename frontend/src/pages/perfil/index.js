import { useState } from "react"
import { Header } from "../../components/header"
import Style from "./style.module.css"

export const Perfil = () => {

    const [checked, setChecked] = useState(false);
    const [habilitado, setHabilitado] = useState(true);

    function mudarSenha() {
        if (checked === false) {
            setChecked(true);
            setHabilitado(false);
        } else {
            setChecked(false);
            setHabilitado(true);
        }
    }

    return (
        <>
            <Header />
            <h1 className={Style.titulo}>Perfil</h1>
            <div className={Style.containerPrincipal}>
                <div className={Style.containerPerfil}>

                    <div className={Style.containerLabels}>
                        <div className={Style.nomes}>
                            <span>Matrícula</span>
                            <span>Nome</span>
                            <span>CPF</span>
                            <span>Email</span>
                            <span>Gmail</span>
                            <span>Setor</span>
                        </div>
                        <div className={Style.valores}>
                            <span>1234</span>
                            <span>Fulano da Silva jr</span>
                            <span>123.123.123-12</span>
                            <span>empresa@email.com</span>
                            <span>gmail@gmail.com</span>
                            <span>Recursos Humanos</span>
                        </div>
                    </div>

                    <div className={Style.alterarSenha}>
                        <div className={Style.dado}>
                            <span>Alterar Senha</span>
                            <div className={Style.alterar}>
                                <input className={Style.check} type="checkbox" id="check" checked={checked} onClick={mudarSenha} />
                            </div>
                        </div>

                        <div className={Style.dado}>
                            <span>Senha</span>
                            <input type="password" disabled={habilitado} />
                        </div>

                        <div className={Style.dado}>
                            <span>Confirmar Senha</span>
                            <input type="password" disabled={habilitado} />
                        </div>
                    </div>

                    <button>Salvar Dados</button>

                </div>

            </div>
        </>
    )
}