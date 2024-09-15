import Swal from "sweetalert2";
import SectionTitle from "../Shared/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query'
import {  FaUsers } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../Shared/LoadingSpinner";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading,refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })
    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    const handleMakeDeliveryMen = user => {
        axiosSecure.patch(`/users/deliveryMen/${user._id}`)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    if(isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div>
            <Helmet>
                <title>DOE Courier || All Users</title>
            </Helmet>
            <SectionTitle heading={"All Users"}></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <h2>Users {users.length}</h2>
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No </th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Number of parcel Booked</th>
                                <th> Total Spent Amount</th>
                                <th>Make Delivery Men</th>
                                <th> Make Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <td>{index + 1} </td>
                                    <td>{user.name}</td>
                                    <td>{user?.phone} phone</td>
                                    <td>120</td>
                                    <td>1240</td>
                                    <td>
                                       { user.role === 'deliveryMen' ? 'Delivery Man' :<button onClick={() => handleMakeDeliveryMen(user)} className="btn btn-sm w-14 h-10 bg-sky-500">
                                       <img src={'https://i.ibb.co/hWMhjbN/delivery-man1.png'} alt="" />
                                        </button>}
                                    </td>
                                    <td>
                                       { user.role === 'admin' ? 'admin' :<button onClick={() => handleMakeAdmin(user)} className="btn btn-sm bg-orange-600">
                                        <FaUsers className="text-white text-2xl"></FaUsers>
                                        </button>}
                                    </td>
                                </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;