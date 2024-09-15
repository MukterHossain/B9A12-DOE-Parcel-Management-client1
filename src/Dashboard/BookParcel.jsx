import { useForm } from "react-hook-form";
import SectionTitle from "../Shared/SectionTitle";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const BookParcel = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    // const [weight, setWeight] = useState(0)
    const [price, setPrice] = useState(0)

    const { register, handleSubmit, reset, formState: { errors }, } = useForm()

    const calculatePrice = (weight) =>{
        
        if(weight <= 1){
            return 50;
        }
        else if(weight <=2){
            return 100
        }
        else{
            return 150
        }
        
    }

    const handlePriceChange = (e) => {
        e.preventDefault()
        const weight = parseFloat(e.target.value) || 0; 
        const newPrice = calculatePrice(weight);
        setPrice(calculatePrice(newPrice)); 
        console.log(e)
      };

console.log('data')
    const onSubmit = async (data) => { 
        // console.log(data)
        const userInfo = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            parcelType: data.parcelType,
            weight: data.weight,
            receiverName: data.receiverName,
            receiverPhone: data.receiverPhone,
            deliveryAddress: data.deliveryAddress,
            requestedDate: data.requestedDate,
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            // price: parseFloat(data.price),
            price: parseFloat(price),
            status: 'Pending',
        }

  
        const bookingsParcel = await axiosPublic.post('/bookings', userInfo)
        console.log(bookingsParcel.data)
        if (bookingsParcel.data.insertedId) {
            // console.log('bookings added to the database')
            reset()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Sign up successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/myParcel')
        }

    }

   




    return (
        <div>
            <Helmet>
                <title>DOE Courier || Book Parcel</title>
            </Helmet>
            <SectionTitle heading="Book a Parcel" ></SectionTitle>
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                        {/* Name */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input type="text" defaultValue={user?.displayName}
                                {...register("name", { required: true })} className="input input-bordered w-full " />
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
                            <input type="number" {...register("phone", { required: true })}
                                placeholder="Phone" className="input input-bordered w-full " />
                            {errors.phone && <span className="text-red-600">Phone Number is required</span>}
                        </div>

                        {/* Parcel Type */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Parcel Type*</span>
                            </div>
                            <input type="text" {...register("parcelType", { required: true })}
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
                            <input type="number"  onChange={(e)=>console.log(e)}  {...register("weight", { required: true })} placeholder="Parcel Weight" className="input input-bordered w-full " />
                            {errors.weight && <span className="text-red-600">Parcel Weight is required</span>}
                        </div>

                        {/* Receiver’s Name */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Receivers Name*</span>
                            </div>
                            <input type="text"{...register("receiverName", { required: true })}
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
                            <input type="number"{...register("receiverPhone", { required: true })}
                                placeholder="Receiver Phone Number" className="input input-bordered w-full " />
                            {errors.receiverPhone && <span className="text-red-600">Receiver Phone is required</span>}
                        </div>

                        {/* Parcel Delivery Address */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Parcel Delivery Address*</span>
                            </div>
                            <input type="text"{...register("deliveryAddress", { required: true })}

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
                            <input type="date"{...register("requestedDate", { required: true })}
                                placeholder="Requested Delivery Date" className="input input-bordered w-full " />
                            {errors.requestedDate && <span className="text-red-600">Requested Delivery Date is required</span>}
                        </div>

                        {/* Delivery Address Latitude */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Delivery Address Latitude*</span>
                            </div>
                            <input type="number"
                                step="any" {...register("latitude", { required: true })}
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
                            <input step="any" type="number" {...register("longitude", { required: true })}
                                placeholder="Delivery Address longitude" className="input input-bordered w-full " />
                            {errors.longitude && <span className="text-red-600">Delivery Address longitude is required</span>}
                        </div>

                        {/* price readOnly */}
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input type="number" value={price} {...register("price", { required: true })}
                                placeholder="price" className="input input-bordered w-full "  />
                            {errors.price && <span className="text-red-600">Price is required</span>}
                            
                        </div>
                    </div>

                    <div className="w-2/5 md:w-3/12 mx-auto mt-6">
                        <button className="btn bg-green-400">
                            Book Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookParcel;