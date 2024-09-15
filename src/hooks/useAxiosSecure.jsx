import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials:true,
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOutUser} = useAuth();

    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        // console.log('hit interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error){
        return Promise.reject(error);
    });
    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, async(error) => {
        const status = error.response.status;
        // console.log('status error in the interceptor', status)
        //for 401 or 403 logOut the user and move the user to the login
        if(status === 401 || status === 403){
            await logOutUser();
            navigate('/login')
        }
        return Promise.reject(error)
    })


    
    return axiosSecure;
};

export default useAxiosSecure;