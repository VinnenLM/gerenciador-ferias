const initialValue = {
    idPerfil: null,
    idColaborador: null,
    idGestor: null,
    tipoContratacao: null,
}

function usuarioStore(state = initialValue, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, idPerfil: action.idPerfil, idColaborador: action.idColaborador, idGestor: action.idGestor, tipoContratacao: action.tipoContratacao }
        case 'LOGOUT':
            return { ...state, idPerfil: null, idColaborador: null, idGestor: null, tipoContratacao: null }
        default:
            return state;
    }
}

export default usuarioStore;