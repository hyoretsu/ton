import { API_URL } from '@env';
import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://odontologiadigital.ccs.ufpb.br/ton',
    baseURL: API_URL,
});

export default api;
