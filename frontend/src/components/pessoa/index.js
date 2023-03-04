export const Pessoa = ({ nome, setor, matricula, status }) => {
    return (
        <tr>
            <td>{nome}</td>
            <td>{setor}</td>
            <td>{matricula}</td>
            <td><span className={`status ${status}`}>{status}</span></td>
        </tr>
    )
}