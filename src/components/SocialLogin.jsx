import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";


const SocialLogin = () => {
    const { logInWithGoogle } = useAuth()
    const axiosPublic =useAxiosPublic()
    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state || '/'


    const handleGoogleLogin = () =>{
        logInWithGoogle()
        .then(result => {
            // const user = result.user;
            // console.log(user)
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                image: result.user?.photoURL,
                role: 'user',
            }
            axiosPublic.put('/user', userInfo)
            .then(res =>{
                console.log(res.data)
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

        })
        .catch(err=> {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: {err},
              });
        })
    }
    return (
        <div className=" w-1/2 mx-auto my-2">
            <div className="divider">or</div>
            <div>
                <button onClick={handleGoogleLogin} className="btn ">
                    <FaGoogle></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;