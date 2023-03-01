import { Header } from "../../components/header"
import "./style.css"

export const Cadastro = () => {
    return (
        <>
            <Header />
            <h1>Cadastro Colaborador</h1>
            <div className="container">

                <div className="container-duplo">

                    <div className="input-duplo">
                        <label htmlFor="">Contratação</label>
                        <select name="" id="">
                            <option value="CLT" selected>CLT</option>
                            <option value="PJ">PJ</option>
                        </select>
                    </div>

                    <div className="input-duplo">
                        <label htmlFor="">Matrícula</label>
                        <input type="text" />
                    </div>

                </div>

                <label htmlFor="">Nome</label>
                <input type="text" placeholder="seu nome aqui" />

                <div className="container-duplo">

                    <div className="input-duplo">
                        <label htmlFor="">CPF</label>
                        <input type="text" name="" id="" placeholder="___.___.___-__" />
                    </div>

                    <div className="input-duplo">
                        <label htmlFor="">Função</label>
                        <select name="" id="">
                            <option value="Funcionario" selected>Funcionário</option>
                            <option value="Gestor">Gestor</option>
                        </select>
                    </div>
                    
                </div>

                <label htmlFor="">Setor</label>
                <select name="" id="">
                    <option value="TI" selected>TI</option>
                    <option value="RH">RH</option>
                    <option value="RH">Contabilidade</option>
                </select>
                <label htmlFor="">Gestor</label>
                <select name="" id="">
                    <option value="">Nenhum</option>
                    <option value="TI">Fulano</option>
                    <option value="RH">Ciclano</option>
                    <option value="RH">Beltrano</option>
                </select>
                <button className="botao">Cadastrar</button>
            </div>
        </>
    )
}