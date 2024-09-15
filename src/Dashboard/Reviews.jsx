import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ReviewsCard from "./ReviewsCard";


const Reviews = () => {
    const axiosSecure = useAxiosSecure()


    const { data:reviewItems = [], isLoading, refetch } = useQuery({
        queryKey: ['delivery-review'],
        queryFn: async () => {
            // const { data } = await axiosSecure.get(`/myParcel/${id}`)
            const { data } = await axiosSecure.get(`/delivery-review`)
            return data;
        }
    })
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <Helmet>
                <title>DOE Courier || Reviews</title>
            </Helmet>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-4">
                {
                reviewItems?.map(item => <ReviewsCard key={item._id} item={item}></ReviewsCard> )
                }               
            </div>
        </div>
    );
};

export default Reviews;