const { useSelector } = require("react-redux")

export const IsAuth = () => {
    var colaborador = useSelector((state) => state.colaborador)
    if (!colaborador) {
        return false;
    } else {
        return true;
    }
}
