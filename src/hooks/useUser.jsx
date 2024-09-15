import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUser = () => {
    const {user,loading} = useAuth();
    
    const axiosSecure = useAxiosSecure();
    const {data: isUser = [], isPending: isUserLoading} = useQuery({
        queryKey: [ 'isUser', user?.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/userRole/user/${user?.email}`);
            // console.log(res.data)
            return res.data?.user
        },
        enabled:!loading && !!localStorage.getItem('access-token')
    })
    return [isUser, isUserLoading]
};

export default useUser;