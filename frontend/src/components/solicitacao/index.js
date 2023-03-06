import { useNavigate } from "react-router-dom";
import "./style.css"

export const Solicitacao = ({ dataSolicitacao, dataInicio, DataFim, status }) => {

    const navigate = useNavigate();

    function redirecionar() {
        navigate("/solicitacao");
    }

    return (
        <tr onClick={redirecionar}>
            <td>{dataSolicitacao}</td>
            <td>{dataInicio}</td>
            <td>{DataFim}</td>
            <td><span className={`status ${status}`}>{status}</span></td>
        </tr>
    )
}