import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SectionTitle from "../Shared/SectionTitle";
import useAuth from "../hooks/useAuth";
// import useAxiosPublic from "../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { useState } from "react";


const UpdateBook = () => {
    const { user } = useAuth()
    const {id} = useParams()
    const navigate = useNavigate()
    // const [getUpdate, setGetUPdate] = useState('')
    // const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { data: updateData = {}, isLoading} = useQuery({
        queryKey: ['updateData', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/updateData/${id}`)
            return res.data;
        }
    })
    const {_id,phone, parcelType, weight,receiverName,receiverPhone,deliveryAddress,requestedDate,latitude,longitude, price} = updateData;

    console.log( price)
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    


    const onSubmit = async (data) => {
        // console.log(data)
        const updateInfo = {
            name:data.name,
            email:data.email,
            phone:data.phone,
            parcelType:data.parcelType,
            weight:data.weight,
            receiverName:data.receiverName,
            receiverPhone:data.receiverPhone,
            deliveryAddress:data.deliveryAddress,
            requestedDate:data.requestedDate,
            latitude:parseFloat(data.latitude),
            longitude:parseFloat(data.longitude),
            price:parseFloat(data.price) 
        }

        try {

            const { data } = await axiosSecure.put(`/updateBook/${_id}`, updateInfo)
            Swal.fire("Updated Bookings Successfully")
            console.log(data);
            reset()
            navigate('/dashboard/myParcel')
        }
        catch (error) {
            Swal.fire(" Bookings not successfully Update")
        }
    reset()
       

    }
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <Helmet>
                <title>DOE Courier || Updated Booking</title>
            </Helmet>
            <SectionTitle heading="Updated Booking" ></SectionTitle>
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                        {/* Name */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input type="text" defaultValue={user?.displayName}
                                {...register("price", { required: true })} className="input input-bordered w-full " />
                        </div>
                        <div className="form-control w-full ">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input type="email" defaultValue={user?.email}
                                {...register("email", { required: true })} className="input input-bordered w-full " />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 mt-3">
                        {/* Phone */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Phone Number*</span>
                            </div>
                            <input type="number" defaultValue={phone} {...register("phone", { required: true })}
                                placeholder="Phone" className="input input-bordered w-full " />
                            {errors.phone && <span className="text-red-600">Phone Number is required</span>}
                        </div>

                        {/* Parcel Type */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Parcel Type*</span>
                            </div>
                            <input type="text" defaultValue={parcelType} {...register("parcelType", { required: true })}
                                placeholder="parcel Type" className="input input-bordered w-full " />
                            {errors.parcelType && <span className="text-red-600">Parcel Type is required</span>}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 mt-3">
                        {/* Parcel Weight */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Parcel Weight kg*</span>
                            </div>
                            <input type="number" defaultValue={weight} {...register("weight", { required: true })} placeholder="Parcel Weight" className="input input-bordered w-full " />
                            {errors.weight && <span className="text-red-600">Parcel Weight is required</span>}
                        </div>

                        {/* Receiver’s Name */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Receivers Name*</span>
                            </div>
                            <input type="text" defaultValue={receiverName} {...register("receiverName", { required: true })}
                                placeholder="Receivers Name" className="input input-bordered w-full " />
                            {errors.receiverName && <span className="text-red-600">Receivers Name is required</span>}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 mt-3">
                        {/* Receiver's Phone Number */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Receiver Phone Number*</span>
                            </div>
                            <input type="number" defaultValue={receiverPhone} {...register("receiverPhone", { required: true })}
                                placeholder="Receiver Phone Number" className="input input-bordered w-full " />
                            {errors.receiverPhone && <span className="text-red-600">Receiver Phone is required</span>}
                        </div>

                        {/* Parcel Delivery Address */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Parcel Delivery Address*</span>
                            </div>
                            <input type="text" defaultValue={deliveryAddress} {...register("deliveryAddress", { required: true })}

                                placeholder="Parcel Delivery Address" className="input input-bordered w-full " />
                            {errors.deliveryAddress && <span className="text-red-600">Parcel Delivery Address is required</span>}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 mt-3">
                        {/*  Requested Delivery Date */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Requested Delivery Date*</span>
                            </div>
                            <input type="date" defaultValue={requestedDate} {...register("requestedDate", { required: true })}
                                placeholder="Requested Delivery Date" className="input input-bordered w-full " />
                            {errors.requestedDate && <span className="text-red-600">Requested Delivery Date is required</span>}
                        </div>

                        {/* Delivery Address Latitude */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Delivery Address Latitude*</span>
                            </div>
                            <input type="number"
                                step="any" defaultValue={latitude} {...register("latitude", { required: true })}
                                placeholder="Delivery Address Latitude" className="input input-bordered w-full " />
                            {errors.latitude && <span className="text-red-600">Delivery Address Latitude is required</span>}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 mt-3">
                        {/* Delivery Address longitude */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Delivery Address longitude*</span>
                            </div>
                            <input step="any" defaultValue={longitude} type="number" {...register("longitude", { required: true })}
                                placeholder="Delivery Address longitude" className="input input-bordered w-full " />
                            {errors.longitude && <span className="text-red-600">Delivery Address longitude is required</span>}
                        </div>

                        {/* price */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price* </span>
                            </div>
                            <input type="number"  defaultValue={price} {...register("price", { required: true })}
                                 className="input input-bordered w-full " />
                                 {errors.price && <span className="text-red-600">price is required</span>}
                            
                        </div>
                    </div>

                    <div className="w-2/5 md:w-3/12 mx-auto mt-6">
                        <button className="btn bg-green-400">
                           Update Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBook;