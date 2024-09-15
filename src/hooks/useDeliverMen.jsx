import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useDeliverMen = () => {
    const {user,loading} = useAuth();
    
    const axiosSecure = useAxiosSecure();
    const {data: isDeliveryMen, isPending: isDeliveryMenLoading} = useQuery({
        queryKey: [user?.email, 'isDeliveryMen'],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/isDeliveryMen/${user.email}`);
            // console.log(res.data)
            return res.data?.deliveryMen
        },
        enabled:!loading && !!localStorage.getItem('access-token')
    })
    // console.log(isDeliveryMen)
    return [isDeliveryMen, isDeliveryMenLoading]
};

export default useDeliverMen;