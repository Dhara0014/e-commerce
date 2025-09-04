import axios from "axios";
import {LocalStorageGetItem} from '../constants/LocalStorageData';

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

export const apiAuthClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

apiAuthClient.interceptors.request.use((config) => {
    // const adminData = process.env.REACT_APP_ADMIN_LOGIN
    // const userData = process.env.REACT_APP_LOCAL_STORAGE_USER_DATA
    // const userType = LocalStorageGetItem(`userType`);
    const token = LocalStorageGetItem('userData')?.token;    
    if(token){
        config.headers.Authorization = `Bearer ${token}` ;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
}
)
