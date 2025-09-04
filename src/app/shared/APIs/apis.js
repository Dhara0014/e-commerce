import { apiAuthClient, apiClient } from "./apiClient";

export const getRequest = async(url) => {
try {
    const response = await apiClient.get(url);
    const {status, message, data} = response?.data;
    if(status){
        return{
            status,
            message,
            data
        }
    }
    return {
        status,
        message
    }
} catch (error) {
    return {
        status: false,
        message: error?.response?.data?.message || "Something went wrong"
    }
}
}

export const postRequest = async(url, body)=> {
    try {
        const response = await apiClient.post(url, body);        
        const {status, message, data} = response?.data;
        if(status){
            return{
                status,
                message,
                data
            }
        }
            return  {
                status,
                message
            }
                    
    } catch (error) {
        return {
            status: false,
            message: error.response?.data?.message || "Something went wrong"
        }
    }
}

export const authPostRequest = async(url, body, customHeaders = {}) => {    
    try {
        const response = await apiAuthClient.post(url, body, {
            headers: {
              ...customHeaders,
            },
          });
        const {status, message, data} = response?.data;
       
        if(status){
            return {
                status, message, data
            }
        }else{
            return {
                status,message
            }
        }
    } catch (error) {                
        return {
            status: false,
            message: error.response?.data?.message || "Something went wrong"
        }
    }
}

export const authGetRequest = async(url, body = {}) => {    
    try {
        const response = await apiAuthClient.get(url, body);
        const {status, message, data} = response?.data;
       
        if(status){
            return {
                status, message, data
            }
        }else{
            return {
                status,message
            }
        }
    } catch (error) {        
        return {
            status: false,
            message: error.response?.data?.message || "Something went wrong"
        }
    }
}

export const authPutRequest = async(url, body) => {    
    try {
        const response = await apiAuthClient.put(url, body);
        const {status, message, data} = response?.data;
       
        if(status){
            return {
                status, message, data
            }
        }else{
            return {
                status,message
            }
        }
    } catch (error) {        
        return {
            status: false,
            message: error.response?.data?.message || "Something went wrong"
        }
    }
}

export const authDeleteRequest = async(url, body) => { 
 
    try {
        const response = await apiAuthClient.delete(url, {
            data: body
        });
        const {status, message, data} = response?.data;
       
        if(status){
            return {
                status, message, data
            }
        }else{
            return {
                status,message
            }
        }
    } catch (error) {        
        return {
            status: false,
            message: error.response?.data?.message || "Something went wrong"
        }
    }
}

