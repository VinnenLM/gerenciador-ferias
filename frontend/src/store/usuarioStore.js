const initialValue = {
    role: null,
}

function usuarioStore(state = initialValue, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, role: action.role }
        case 'LOGOUT':
            return { ...state, role: null }
        default:
            return state;
    }
}

export default usuarioStore;