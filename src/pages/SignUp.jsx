import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import useAxiosSecure from "../hooks/useAxiosSecure";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SocialLogin from "../components/SocialLogin";


const SignUp = () => {
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation();

    const from = location?.state || '/'
    // const axiosSecure = useAxiosSecure()



    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('user profile info updated')
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            role: data.type,
                            image: data.photoURL
                        }
                        axiosPublic.put('/user', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    // console.log('user added to the database')
                                    reset()
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Sign up successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    // navigate(from);
                                }
                            })
                            navigate(from);
                    })
                    .catch(error => {
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "Something is wrong",
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
            })
    }
    // console.log(watch("example"))

    return (
        <>
            <Helmet>
                <title>DOE Courier || Sign UP</title>
            </Helmet>
            <div>
                <div className=" min-h-screen my-6 ">
                    <div className="card  w-4/5 md:w-2/5 lg:w-1/3 mx-auto  shadow-2xl bg-base-100">
                        <div className="text-center ">
                            <h1 className="text-2xl text-blue-800 md:text-4xl font-bold">Sign Up now!</h1>
                            <p className="text-sm text-gray-400">Sign Up to create your account </p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">Type*</span>
                                </label>
                                <select defaultValue=" " {...register('type', { required: true })} className="select select-bordered w-full">
                                    <option disabled value="">Select a Type</option>
                                    <option  value="user">User</option>
                                    {/* <option value="admin">Admin</option> */}
                                    <option value="deliveryMen">Delivery Men</option>
                                </select>
                                {errors.type && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">photo URL</span>
                                </label>
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true, minLength: 6, maxLength: 20,
                                    pattern: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!#$%&*?"])/
                                })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-600">Password is at least 6 character required</span>}
                                {errors.password?.type === 'maxLength' && <span className="text-red-600">Password is at less then 20 character required</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-600">password must have one uppercase, one lowercase , one number and one special character</span>}
                            </div>
                            <div className="form-control mt-4">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className="px-6 text-center"><small>Already have an account <Link to='/login' className="text-blue-600 font-bold">Please Login</Link></small></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;