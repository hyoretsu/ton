import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://odontologiadigital.ccs.ufpb.br/ton',
    baseURL: process.env.API_URL,
});

export default api;
