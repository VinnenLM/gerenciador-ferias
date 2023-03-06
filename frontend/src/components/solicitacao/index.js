import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css"

export const Solicitacao = ({ id, dataSolicitacao, colaborador, dataInicio, DataFim, status }) => {

    const navigate = useNavigate();
    const role = useSelector((state) => state.role);

    function redirecionar() {
        navigate("/solicitacao");
    }

    return (
        <tr onClick={redirecionar} key={id}>
            <td>{dataSolicitacao}</td>
            {(role === "gestor" && id !== "1" ) ? <td>{colaborador}</td> : null}
            <td>{dataInicio}</td>
            <td>{DataFim}</td>
            <td><span className={`status ${status}`}>{status}</span></td>
        </tr>
    )
}