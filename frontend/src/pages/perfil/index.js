import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Header } from "../../components/header"
import api from "../../services/api";
import Style from "./style.module.css"

export const Perfil = () => {

    const [colaborador, setColaborador] = useState({});
    const [setor, setSetor] = useState("");
    const [cpf, setCpf] = useState("");
    const idColaborador = useSelector((state) => state.colaborador.idColaborador);

    useEffect(() => {
        api
            .get(`/colaborador/${idColaborador}`)
            .then((response) => {
                setColaborador(response.data.colaborador)
                formatCPF(response.data.colaborador.cpf)
                setSetor(response.data.colaborador.setor.nomeSetor)
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
        } else if(senha !== repetirSenha) {
            setAlert("warning")
            setMsg("As senha precisam ser iguais!")
        } else {
            setAlert("warning")
            setMsg("Não há o que ser salvo!")
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

    function formatCPF(cpf) {
        console.log(cpf);
        cpf = cpf.replace(/\D/g, '');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        setCpf(cpf);
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
                            {
                                (colaborador.gmail !== null) ? <span>Gmail</span> : null
                            }
                            <span>Setor</span>
                        </div>
                        <div className={Style.valores}>
                            <span>{colaborador.matricula}</span>
                            <span>{colaborador.nome}</span>
                            <span>{cpf}</span>
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