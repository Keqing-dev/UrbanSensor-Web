import axios from 'axios';
import { GridSortModel } from '@mui/x-data-grid';

const url = 'https://urban.keqing.dev';

/*type Data<Type> = {
    data: Type;
};*/

type Content<Type> = {
    content: [Type];
    paging?: {
        maxItems: number;
    };
};

type Message = {
    message: string;
};

type UserData = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    position?: string;
    createdAt: string;
    updatedAt: string;
    roleId: string;
    orgId?: string;
    organization?: OrganizationData;
};

type OrganizationData = {
    id: string;
    name: string;
    bucket: string;
    createdAt: string;
    updatedAt: string;
};

type User = {
    email: string;
    password: string;
};

type CreateUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    position?: string;
    roleId: string;
    orgId?: string;
};

type CreateOrg = {
    name: string;
    bucket: string;
};

type Role = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

type Search = {
    search: string;
    page: number;
};

export type Token = {
   data:{
       token: string;
   }
};

export function getToken() {
    return localStorage.getItem('tk');
}

function getTokenHeaders() {
    return {
        Authorization: `Bearer ${getToken()}`,
    };
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

