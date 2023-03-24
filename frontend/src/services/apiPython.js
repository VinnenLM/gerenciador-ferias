import axios from "axios"; // Fazendo o import da biblioteca axios

// Criando a variável de chamada da API
const apiPython = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
});

export default apiPython;