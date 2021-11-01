import axios from 'axios';

const { REACT_APP_API_URL } = process.env;
const url = REACT_APP_API_URL;



type User = {
    email: string;
    password: string;
};

export type Token = {
   data:{
       token: string;
   }
};

export function getToken() {
    return localStorage.getItem('tk');
}

export function login({ email, password }: User) {
    return axios.post<Token>(`${url}/authenticate/login`, { email, password });
}

export function auth() {
    let token = getToken();
    return axios.get(`${url}/authenticate`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
export function getProjects(page:number) {
    let token = getToken();
    return axios.get(`${url}/project?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function getCsvReports(id:string) {
    let token = getToken();
    return axios.get(`${url}/csv/reports?projectId=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
