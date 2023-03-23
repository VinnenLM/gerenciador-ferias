import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Header } from "../../components/header"
import api from "../../services/api";
import Style from "./style.module.css"

export const Perfil = () => {

    const [colaborador, setColaborador] = useState({});
    const [setor, setSetor] = useState("");
    const idColaborador = useSelector((state) => state.idColaborador);

    useEffect(() => {
        api
            .get(`/colaborador/${idColaborador}`)
            .then((response) => {
                setColaborador(response.data)
                setSetor(response.data.setor.nomeSetor)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [idColaborador])

    function mudarSenha() {

        if ((senha !== "" && repetirSenha !== "") && (senha === repetirSenha)) {
            api
                .put(`/colaborador/${idColaborador}`, {
                    senha: senha
                })
                .then((response) => {
                    setAlert("success")
                    setMsg("Senha alterada com sucesso!")
                })
                .catch((error) => {
                    setAlert("warning")
                    setMsg("Erro ao alterar senha!")
                    console.log(error);
                })
        } else {
            setAlert("warning")
            setMsg("As senha precisam ser iguais!")
        }
    }

    const [checked, setChecked] = useState(false);
    const [habilitado, setHabilitado] = useState(true);
    const [senha, setSenha] = useState("");
    const [repetirSenha, setRepetirSenha] = useState("");
    const [msg, setMsg] = useState("");
    const [alert, setAlert] = useState("");

    function habilitarSenha() {
        if (checked === false) {
            setChecked(true);
            setHabilitado(false);
        } else {
            setChecked(false);
            setHabilitado(true);
            setSenha("");
            setRepetirSenha("");
        }
    }

    return (
        <>
            <Header />

            {msg !== "" ?
                (<div className={`alert alert-${alert} w-25 mt-4 mx-auto text-center border border-${alert}`} role={alert}>
                    {msg}
                </div>)
                :
                null
            }

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
                            <span>{colaborador.matricula}</span>
                            <span>{colaborador.nome}</span>
                            <span>{colaborador.cpf}</span>
                            <span>{colaborador.email}</span>
                            <span>{colaborador.gmail}</span>
                            <span>{setor}</span>
                        </div>
                    </div>

                    <div className={Style.alterarSenha}>
                        <div className={Style.dado}>
                            <span>Alterar Senha</span>
                            <div className={Style.alterar}>
                                <input className={Style.check} type="checkbox" id="check" checked={checked} onChange={habilitarSenha} />
                            </div>
                        </div>

                        <div className={Style.dado}>
                            <span>Senha</span>
                            <input type="password" disabled={habilitado} value={senha} onChange={(evt) => setSenha(evt.target.value)} />
                        </div>

                        <div className={Style.dado}>
                            <span>Confirmar Senha</span>
                            <input type="password" disabled={habilitado} value={repetirSenha} onChange={(evt) => setRepetirSenha(evt.target.value)} />
                        </div>
                    </div>

                    <button onClick={mudarSenha}>Salvar Dados</button>

                </div>

            </div>
        </>
    )
}