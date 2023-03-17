import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Style from "./style.module.css"

export const Solicitacao = ({ id, dataSolicitacao, colaborador, dataInicio, dataFim, status, idColaborador }) => {

    const navigate = useNavigate();
    const role = useSelector((state) => state.role);

    function redirecionar() {
        navigate("/solicitacao");
    }

    return (
        <tr onClick={redirecionar} key={id} className={Style.solicitacao}>
            <td>{dataSolicitacao}</td>
            {(role === "gestor" && idColaborador !== 1 ) ? <td>{colaborador}</td> : null}
            <td>{dataInicio}</td>
            <td>{dataFim}</td>
            <td><span className={`status ${status}`}>{status}</span></td>
        </tr>
    )
}