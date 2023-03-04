import "./style.css"

export const Solicitacao = ({ dataSolicitacao, dataInicio, DataFim, status }) => {
    return (
        <tr>
            <td>{dataSolicitacao}</td>
            <td>{dataInicio}</td>
            <td>{DataFim}</td>
            <td><span className={`status ${status}`}>{status}</span></td>
        </tr>
    )
}