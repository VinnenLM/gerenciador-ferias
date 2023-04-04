import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Card } from "../../components/card"
import { Header } from "../../components/header"
import api from "../../services/api";
import Style from "./style.module.css"

export const Home = () => {

    const colab = useSelector((state) => state.colaborador);
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        api
            .get(`/colaborador/${colab.idColaborador}/ferias`)
            .then((response) => {
                console.log(response.data);
                (response.data === true) ? setShow(true) : setShow(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [colab])

    return (
        <>
            <Header />
            <div className={Style.containerCards}>
                <div className={Style.cards}>
                    {
                        (colab.idPerfil === 2)
                            ?
                            <>
                                <Card titulo="Solicitação de Férias" icone="fas fa-plane-departure" botao="Solicitar" link="/solicitar" />
                                <Card titulo="Minhas Solicitações" icone="fa-regular fa-file-lines" botao="Visualizar" link="/minhas-solicitacoes" />
                                <Card titulo="Dashboard" icone="fa-solid fa-chart-pie" botao="Visualizar" link="/dashboard" />
                            </>
                            :
                            (colab.idPerfil === 3)
                                ?
                                <>
                                    <Card titulo="Solicitação de Férias" icone="fas fa-plane-departure" botao="Solicitar" link="/solicitar" />
                                    <Card titulo="Minhas Solicitações" icone="fa-regular fa-file-lines" botao="Visualizar" link="/minhas-solicitacoes" />
                                </>
                                :
                                <>
                                    <Card titulo="Cadastrar Colaborador" icone="fa-regular fa-user" botao="Cadastrar" link="/cadastro" />
                                    <Card titulo="Listar Colaboradores" icone="fa-solid fa-users" botao="Visualizar" link="/colaboradores" />
                                </>
                    }
                </div>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className="text-dark">Aviso Período de Férias</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-dark">
                    <span>Se passaram 11 meses desde seu último período de férias, favor fazer nova solicitação!</span>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <button className={Style.confirmar} onClick={handleClose}>Confirmar</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}