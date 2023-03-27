const initialValue = {
    idPerfil: null,
    idColaborador: null,
    nomeColaborador: null,
    idGestor: null,
    idWorkplace: null,
    emailGestor: null,
    tipoContratacao: null,
}

function usuarioStore(state = initialValue, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, idPerfil: action.idPerfil, idColaborador: action.idColaborador, nomeColaborador: action.nomeColaborador, idGestor: action.idGestor, emailGestor: action.emailGestor, tipoContratacao: action.tipoContratacao, idWorkplace: action.idWorkplace }
        case 'LOGOUT':
            return { ...state, idPerfil: null, idColaborador: null, nomeColaborador:null, idGestor: null, emailGestor: null, tipoContratacao: null, idWorkplace: null }
        default:
            return state;
    }
}

export default usuarioStore;