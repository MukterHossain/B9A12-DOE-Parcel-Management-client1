import { Helmet } from "react-helmet-async";
import SectionTitle from "../Shared/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { IoLocationSharp } from "react-icons/io5";
import { GiCancel } from "react-icons/gi";
import { GrDeliver } from "react-icons/gr";


const DeliveryList = () => {
    
    const axiosSecure = useAxiosSecure()


    const { data:deliveryItems = [], isLoading, refetch } = useQuery({
        queryKey: ['delivery-list'],
        queryFn: async () => {
            // const { data } = await axiosSecure.get(`/myParcel/${id}`)
            const { data } = await axiosSecure.get(`/delivery-list`)
            return data;
        }
    })
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <Helmet>
                <title>DOE Courier || Delivery List</title>
            </Helmet>
            <SectionTitle heading={"Delivery List"}></SectionTitle>
            <div>
                <h1> parcelItem {}</h1>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Receiver Name</th>
                                <th>Phone</th>
                                <th>Booking Date</th>
                                <th>Re. Delivery Date</th>
                                <th>receiverPhone</th>
                                <th>Re. Address</th>
                                <th>Location</th>
                                <th>Cancel</th>
                                <th>Deliver</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {deliveryItems?.map(item => 
                                <tr key={item._id}>
                                    <td>{item?.name} </td>
                                    <td>{item?.receiverName} </td>
                                    <td>{item?.phone}</td>
                                    <td>{item?.requestedDate}</td>
                                    <td>{item?.requestedDate}</td>
                                    <td>{item?.receiverPhone}</td>
                                    <td>{item?.deliveryAddress}</td>
                                    <td>
                                        <button className="btn btn-sm bg-green-400">
                                        <IoLocationSharp size={20}></IoLocationSharp>
                                        </button>
                                        {/* <ManageModal isOpen={isOpen} close={close}></ManageModal> */}
                                    </td>
                                    <td>
                                        <button className="btn btn-sm bg-green-400">
                                        
                                        <GiCancel size={20}></GiCancel>
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm bg-green-400">
                                        <GrDeliver size={20}></GrDeliver>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default DeliveryList;