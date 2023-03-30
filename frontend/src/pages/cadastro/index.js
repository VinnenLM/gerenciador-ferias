import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header"
import api from "../../services/api";
import Style from "./style.module.css"
import InputMask from 'react-input-mask';

export const Cadastro = () => {

    const [matricula, setMatricula] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [gmail, setGmail] = useState("");
    const [tipoContratacao, setTipoContratacao] = useState("CLT");
    const [dataContratacao, setDataContratacao] = useState("");
    const [gestores, setGestores] = useState([]);
    const [setores, setSetores] = useState([]);
    const [idGestor, setIdGestor] = useState(0);
    const [idSetor, setIdSetor] = useState(1);
    const [idPerfil, setIdPerfil] = useState(3);
    const [diasDisponiveis, setDiasDisponiveis] = useState(0);
    const [idWorkplace, setIdWorkplace] = useState("");
    const [msg, setMsg] = useState("");
    const [alert, setAlert] = useState("");
    const colab = useSelector((state) => state.colaborador);
    const navigate = useNavigate();

    useEffect(() => {
        if (colab.idPerfil === 1) {
            api
                .get("/colaborador/gestor")
                .then((response) => {
                    setGestores(response.data)
                })
                .catch((error) => {
                    console.log(error);
                })

            api
                .get("/setor")
                .then((response) => {
                    setSetores(response.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            navigate("/home")
        }

    }, [colab, navigate])

    function cadastrarColaborador() {
        api
            .post("/colaborador", {
                matricula: matricula,
                nome: nome,
                cpf: cpf,
                email: email,
                gmail: gmail ? gmail : null,
                senha: "quero123",
                tipoContratacao: tipoContratacao,
                diasDisponiveis: 0,
                idWorkplace: (idWorkplace !== "") ? idWorkplace : null,
                dataContratacao: (dataContratacao !== "") ? dataContratacao : null,
                idGestor: (parseInt(idGestor) !== 0) ? parseInt(idGestor) : null,
                idPerfil: parseInt(idPerfil),
                idSetor: parseInt(idSetor),
            })
            .then((response) => {
                setAlert("success")
                setMsg("Colaborador cadastrado com sucesso!")
                console.log(response.data);
            })
            .catch((error) => {
                setAlert("warning")
                setMsg("Erro ao cadastrar colaborador!")
                console.log(error.response.data.message);
            })
    }

    return (
        <>
            <Header />
            <div className={Style.containerGeral}>

                {msg !== "" ?
                    (<div className={`alert alert-${alert} w-25 mx-auto text-center border border-${alert}`} role={alert}>
                        {msg}
                    </div>)
                    :
                    null
                }

                <h1 className={Style.titulo}>Cadastrar Colaborador</h1>

                <div className={Style.containerCadastro}>

                    <div className={Style.containerDuplo}>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="tipoContratacao">Contratação</label>
                            <select defaultValue={tipoContratacao} name="tipoContratacao" id="tipoContratacao" onChange={(evt) => setTipoContratacao(evt.target.value)}>
                                <option value="CLT">CLT</option>
                                <option value="PJ">PJ</option>
                            </select>
                        </div>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="dataContratacao">Data da Contratação</label>
                            <input required className={Style.dataContratacao} type="date" name="dataContratacao" id="dataContratacao" value={dataContratacao} onChange={(evt) => setDataContratacao(evt.target.value)} />
                        </div>
                    </div>

                    <div className={Style.containerDuplo}>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="matricula">Matrícula</label>
                            <input type="text" placeholder="0000" name="matricula" id="matricula" value={matricula} onChange={(evt) => setMatricula(evt.target.value)} />
                        </div>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="cpf">CPF</label>
                            <InputMask
                                mask="999.999.999-99"
                                id="cpf"
                                value={cpf}
                                placeholder="___.___.___-__"
                                onChange={(evt) => setCpf(evt.target.value)}
                            />
                        </div>
                    </div>

                    <div className={Style.containerDuplo}>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="nome">Nome</label>
                            <input type="text" placeholder="Insira o nome" name="nome" id="nome" value={nome} onChange={(evt) => setNome(evt.target.value)} />
                        </div>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="idGestor">Gestor</label>
                            <select name="idGestor" id="idGestor" defaultValue={idGestor} onChange={(evt) => setIdGestor(evt.target.value)}>
                                <option value="0">Nenhum</option>
                                {
                                    gestores.map((gestor, index) =>
                                        <option key={index} value={gestor.idColaborador}>{gestor.nome}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>

                    <div className={Style.containerDuplo}>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="email@email.com" name="email" id="email" value={email} onChange={(evt) => setEmail(evt.target.value)} />
                        </div>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="gmail">Gmail</label>
                            <input type="email" placeholder="email@gmail.com" name="gmail" id="gmail" value={gmail} onChange={(evt) => setGmail(evt.target.value)} />
                        </div>
                    </div>

                    <div className={Style.containerDuplo}>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="diasDisponiveis">Dias Disponíveis</label>
                            <input type="number" placeholder="00" name="diasDisponiveis" min="0" max="30" id="diasDisponiveis" value={diasDisponiveis} onChange={(evt) => setDiasDisponiveis(evt.target.value)} />
                        </div>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="idWorkspace">Id no Workspace</label>
                            <input type="text" placeholder="00000000" name="idWorkspace" id="idWorkspace" value={idWorkplace} onChange={(evt) => setIdWorkplace(evt.target.value)} />
                        </div>
                    </div>

                    <div className={Style.containerDuplo}>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="idSetor">Setor</label>
                            <select name="idSetor" id="idSetor" defaultValue={idSetor} onChange={(evt) => setIdSetor(evt.target.value)}>
                                {
                                    setores.map((setor, index) =>
                                        <option key={index} value={setor.idSetor}>{setor.nomeSetor}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className={Style.inputDuplo}>
                            <label htmlFor="idPerfil">Perfil</label>
                            <select name="idPerfil" id="idPerfil" defaultValue={idPerfil} onChange={(evt) => setIdPerfil(evt.target.value)}>
                                <option value="3">Funcionário</option>
                                <option value="2">Gestor</option>
                            </select>
                        </div>

                    </div>
                    <button className={Style.botao} onClick={cadastrarColaborador}>Cadastrar</button>
                </div>
            </div>
        </>
    )
}