const initialValue = {
    idPerfil: null,
    idColaborador: null,
    idGestor: null,
}

function usuarioStore(state = initialValue, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, idPerfil: action.idPerfil, idColaborador: action.idColaborador, idGestor: action.idGestor }
        case 'LOGOUT':
            return { ...state, idPerfil: null, idColaborador: null, idGestor: null }
        default:
            return state;
    }
}

export default usuarioStore;