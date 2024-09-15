import { Helmet } from "react-helmet-async";
import SectionTitle from "../Shared/SectionTitle";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";


const AllDeliveryMen = () => {
    const axiosSecure = useAxiosSecure()


    const { data:deliveryMens = [], isLoading, refetch } = useQuery({
        queryKey: ['all-delivery-men/deliveryMen'],
        queryFn: async () => {
            // const { data } = await axiosSecure.get(`/myParcel/${id}`)
            const { data } = await axiosSecure.get(`/all-delivery-men/deliveryMen`)
            return data;
        }
    })
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <Helmet>
                <title>DOE Courier || All Delivery Men</title>
            </Helmet>
            <SectionTitle heading={"All Delivery Men"}></SectionTitle>
        <div>
            <h1>deliveryMens {deliveryMens.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Delivery Mans Name</th>
                            <th>Phone Number</th>
                            <th>Number of parcel delivered</th>
                            <th>Average review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {deliveryMens.map((item, index) =><tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item?.name} </td>
                            <td>01245336</td>
                            <td>12/04/2024</td>
                            <td> new Date()</td>
                        </tr> )}
                        
                    </tbody>

                </table>
            </div>
        </div>
        </div>
    );
};

export default AllDeliveryMen;