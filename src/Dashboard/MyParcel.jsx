import { Helmet } from "react-helmet-async";
import SectionTitle from "../Shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link  } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Swal from "sweetalert2";
import { useState } from "react";
import BookReview from "../Modals/BookReview";
// import { Dialog, DialogPanel } from '@headlessui/react'

//DialogTitle

const MyParcel = () => {
    const { user } = useAuth()
    // const navigate = useNavigate()
    // const {id} = useParams()
    const axiosSecure = useAxiosSecure()
    const [bookingsData, setBookingData] = useState([])
    const [filterStatus, setFilterStatus] = useState('All')
    const [isOpen, setIsOpen] = useState(false)

    const { data = {}, isLoading, refetch } = useQuery({
        queryKey: ['myParcel', user?.email],
        queryFn: async () => {
            // const { data } = await axiosSecure.get(`/myParcel/${id}`)
            const { data } = await axiosSecure.get(`/myParcel/${user?.email}`)
            setBookingData(data)
            return data;
        }
    })
    // console.log(bookingsData)

    // Status change to Cancel
    const handleCancel = async (id) => {

        const status = 'Cancel';
        const StatusChange = { status }
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Canceled it!"
            }).then(async (data) => {

                if (data.isConfirmed) {
                    const { updateData } = await axiosSecure.put(`/statusUpdate/${id}`, StatusChange)
                    Swal.fire({
                        title: "Canceled!",
                        text: "Your file has been Canceled.",
                        icon: "success"
                    });
                }
                // refresh data
                refetch()
            });

        }
        catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Data not Canceled',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }

    }

    // Filter
    const handleFilter = bookingsData?.filter(book => {

        if (filterStatus === 'All') return true;
        return book.status === filterStatus;
    })
    // console.log(handleFilter)

    // Review
    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

  

    

    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <Helmet>
                <title>DOE Courier || My Parcel</title>
            </Helmet>
            <SectionTitle heading={"My Parcels"}></SectionTitle>
            <div>
                <div className="flex justify-center  my-3 ">
                    <select onChange={(e) => setFilterStatus(e.target.value)}
                        value={filterStatus}
                        name="" id="" className="bg-orange-200 px-4 py-1 rounded-md shadow-lg hover:bg-rose-200 transition-colors">
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="On the way">On the way</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancel">Cancelled</option>
                    </select>
                </div>
                <div className="overflow-x-auto ">
                    <table className="table">
                        {/* head */}
                        <thead >
                            <tr className=" shadow-lg shadow-red-700 rounded-md">
                                <th>Parcel Type</th>
                                <th>Req. Date</th>
                                <th>Ap. Date</th>
                                <th>Booking Date</th>
                                <th>Deli, Men ID</th>
                                <th>Booking Status</th>
                                <th>Update</th>
                                <th>Cancel</th>
                                <th>Review</th>
                                <th>Pay</th>
                            </tr>
                        </thead>
                        <tbody>
                            {handleFilter?.map((item, index) => <tr key={item._id}>
                                <td>{item.parcelType} </td>
                                <td>{item.requestedDate}</td>
                                <td>{item.requestedDate}</td>
                                <td>{new Date().toLocaleDateString()}</td>
                                <td className="w-full">{item._id.slice(0,8)}...</td>
                                <td >{item.status}</td>
                                <td>
                                    <Link to={`/dashboard/update/${item._id}`}>
                                        <button disabled={item?.status !== 'Pending'}
                                            className=" px-2 py-1 mx-1 text-gray-700 transition-colors duration-300  disabled:bg-gray-200 bg-purple-300 transform rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed">
                                            <FaEdit size={20}></FaEdit>
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleCancel(item._id)}
                                        disabled={item?.status !== 'Pending'}
                                        className=" px-2 py-1 mx-1 text-gray-700 transition-colors duration-300  disabled:bg-gray-200 bg-purple-300 transform rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed">
                                        <GiCancel size={20}></GiCancel>
                                    </button>
                                </td>
                                <td>
                                    
                                    <button onClick={open} className="btn btn-sm bg-green-400">
                                            Review
                                        </button>
                                    <BookReview item={item} index={index} isOpen={isOpen} close={close} ></BookReview>
                                </td>
                                <td>
                                    <Link  to='/dashboard/payment'>
                                    <button   className="btn btn-sm">
                                        pay
                                    </button>
                                    </Link>
                                </td>
                            </tr>)}

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyParcel;