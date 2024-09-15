import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../Shared/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";

import TopDeliveryManCard from "./TopDeliveryManCard";



const TopDeliveryMan = () => {

    const axiosSecure = useAxiosSecure();


    const { data: users = [] } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings')
            return res.data;
        }
    })

   

   
    return (
        <div className="my-20">
            <SectionTitle heading={"Top Delivery Man"} subHeading={"Traditional couriers have a fleet of vehicles like motorcycle, car, van, and truck to transport goods from one location to another"}></SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-4">
                {
                users?.map(item => <TopDeliveryManCard key={item._id} item={item}></TopDeliveryManCard>)
                
                }               
            </div>
        </div>
    );
};

export default TopDeliveryMan;