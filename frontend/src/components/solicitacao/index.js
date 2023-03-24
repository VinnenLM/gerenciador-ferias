import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format, addDays } from 'date-fns';
import Style from "./style.module.css"

export const Solicitacao = ({ id, dataSolicitacao, colaborador, dataInicio, dataFim, status }) => {

    const navigate = useNavigate();
    const idPerfil = useSelector((state) => state.idPerfil);

    function redirecionar() {
        navigate(`/solicitacao/${id}`);
    }

    return (
        <tr onClick={redirecionar} key={id} className={Style.solicitacao}>
            <td>{format(addDays(new Date(dataSolicitacao), (1)), 'dd/MM/yyyy')}</td>
            {
                (colaborador !== undefined)
                    ?
                    (idPerfil === 2) ? <td>{colaborador}</td> : null
                    : null
            }
           <td>{format(addDays(new Date(dataInicio), (1)), 'dd/MM/yyyy')}</td>
           <td>{format(addDays(new Date(dataFim), (1)), 'dd/MM/yyyy')}</td>
            <td><span className={`status ${status}`}>{status}</span></td>
        </tr>
    )
}