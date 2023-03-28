const initialValue = {
    colaborador: null,
}

function usuarioStore(state = initialValue, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, colaborador: action.colaborador }
        case 'LOGOUT':
            return { ...state, colaborador: null }
        default:
            return state;
    }
}

export default usuarioStore;