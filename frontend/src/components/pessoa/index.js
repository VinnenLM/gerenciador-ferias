import "./style.css"

export const Pessoa = ({ matricula, nome, setor, email, diasDisponiveis, status, acumulo, onClick }) => {
    return (
        <tr className="colaborador" onClick={onClick}>
            <td>{matricula}</td>
            <td>{nome}</td>
            <td>{setor}</td>
            <td>{email}</td>
            <td>{diasDisponiveis}</td>
            <td className="spanStatus">
                <span className={`status ${status}`}>{status}</span>
                {(acumulo) ? <span className={"status acumulando"}>acumulando</span> : null}
            </td>
        </tr>
    )
}