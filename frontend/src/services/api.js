import axios from "axios"; // Fazendo o import da biblioteca axion

// Criando a variável de chamada da API
const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
});

export default api;