import { Helmet } from "react-helmet-async";
import SectionTitle from "../Shared/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ManageModal from "../Modals/ManageModal";


const AllParcels = () => {
    const axiosSecure = useAxiosSecure();
    let [isOpen, setIsOpen] = useState(false)

    const { data: parcelItem = [], isLoading, refetch } = useQuery({
        queryKey: ['parcel-allData'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcel-allData')
            return res.data;
        }
    })
    console.log(parcelItem)
    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    return (
        <div>
            <Helmet>
                <title>DOE Courier || All Parcels</title>
            </Helmet>
            <SectionTitle heading={"Booked parcels"}></SectionTitle>
            <div>
                <h1> parcelItem {parcelItem.length}</h1>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Booking Date</th>
                                <th>Re. Delivery Date</th>
                                <th>Cost</th>
                                <th>Status</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {parcelItem?.map(item => 
                                <tr key={item._id}>
                                    <td>{item?.name} </td>
                                    <td>{item?.phone}</td>
                                    <td>{item?.requestedDate}</td>
                                    <td>12/04/2024</td>
                                    <td>{item?.price}</td>
                                    <td>{item?.status}</td>
                                    <td>
                                        <button onClick={open} className="btn btn-sm bg-green-400">
                                        Manage
                                        </button>
                                        <ManageModal isOpen={isOpen} close={close}></ManageModal>
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

export default AllParcels;