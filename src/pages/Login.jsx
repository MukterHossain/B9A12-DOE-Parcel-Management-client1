import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import SocialLogin from "../components/SocialLogin";


const Login = () => {
    const { signInUser } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state || '/'
    // const from = location.state?.from?.pathname || '/'



    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password)
        signInUser(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user)
                Swal.fire({
                    title: "User Login Successful",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
                navigate(from);
            })
            .catch(error => {
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: "Something is wrong",
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }



    return (
        <>
            <Helmet>
                <title>DOE Courier || Login</title>
            </Helmet>
            <div className=" min-h-screen  mt-6">
                <div className="py-4 w-4/5 md:w-2/5 lg:w-1/3 mx-auto rounded-xl shadow-2xl bg-base-100">
                    <div className="text-center ">
                        <h1 className="text-2xl text-blue-800 md:text-4xl font-bold">Login now!</h1>
                        <p className="text-sm">Login to access your account </p>
                    </div>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>

                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <p className='px-6 text-center'><small>New Here? <Link to='/signup' className='text-blue-600 font-bold'>Create an account</Link></small></p>
                    <SocialLogin></SocialLogin>

                </div>
            </div>
        </>
    );
};

export default Login;