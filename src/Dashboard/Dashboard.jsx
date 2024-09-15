import { NavLink, Outlet } from "react-router-dom";
import { FaAd, FaCalendar, FaEnvelope, FaHome, FaList, FaUsers } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useDeliverMen from "../hooks/useDeliverMen";
import { Helmet } from "react-helmet-async";
import { MdReviews } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FcStatistics } from "react-icons/fc";
import { GrUserWorker } from "react-icons/gr";
// import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isDeliveryMen] = useDeliverMen();
    // const  {user, loading}  =  useAuth()
    const  [isUser]  =  useUser()
    // console.log(isAdmin, isDeliveryMen, isUser);

    return (
        <div className="flex justify-between">
            <Helmet>
                <title>DOE Courier || Dashboard</title>
            </Helmet>
            {/* dashboard side bar */}
            <div className="w-40 md:w-60  min-h-screen bg-sky-200 ">
                <div>
                    <div className="flex items-center bg-orange-200 p-2 rounded-xl mt-3 mx-3">
                        <img
                            src={"https://i.ibb.co/pJtsy6q/logo.png"}
                            alt='logo'
                            width='70'
                            height='70'
                        />
                        <h2><span className="text-2xl md:text-3xl font-bold text-blue-700">DOE</span> <span className="text-sm text-green-700 font-bold">Courier</span></h2>
                    </div>
                </div>
                <div>
                    <ul className="menu">
                        {
                            isAdmin && <>
                                <h1 className="flex justify-center items-center gap-2 text-lg font-semibold bg-blue-200 rounded-lg py-1 mx-1"><FaHome></FaHome> Admin Home</h1>
                                <li>
                                    <NavLink to="/dashboard/statistics" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                        <FcStatistics></FcStatistics>
                                        Statistics</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allParcels" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                        <AiFillProduct></AiFillProduct>
                                        All Parcels</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/users" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                        <FaUsers></FaUsers>
                                        All Users</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/deliveryMen" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                        <GrUserWorker></GrUserWorker>
                                        All Delivery Men</NavLink>
                                </li>
                            </>
                        }
                        {
                            isDeliveryMen && <>
                                <h1 className="flex justify-center items-center gap-2 text-lg font-semibold bg-purple-200 rounded-lg py-1 mx-1"><FaHome></FaHome> Delivery Men Home</h1>
                                {/* <li>
                                    <NavLink to="/dashboard/deliveryHome" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                        <FaHome></FaHome>
                                        Delivery Men Home</NavLink>
                                </li> */}
                                <li>
                                    <NavLink to="/dashboard/deliveryList" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                        <FaList></FaList>
                                        My Delivery List</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reviews" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                        <MdReviews></MdReviews>
                                        My Reviews</NavLink>
                                </li>

                            </>
                        }

                        { isUser &&
                            <>
                                <h1 className="flex justify-center items-center gap-2 text-lg font-semibold bg-yellow-200 rounded-lg py-1 mx-1"><FaHome></FaHome> User Home</h1>
                                <li>
                                    <NavLink to="/dashboard/bookParcel" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                        <FaCalendar></FaCalendar>
                                        Book a Parcel</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myParcel" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                        <FaAd></FaAd>
                                        My Parcels</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/profile" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                        <FaList></FaList>
                                        My Profile</NavLink>
                                </li>
                            </>
                        }

                    </ul>
                    <div className="h-80 flex items-end">
                        <ul className="menu">
                            <div className="divider "></div>

                            <li className="">
                                <NavLink to="/" >
                                    <FaHome></FaHome>
                                    Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact">
                                    <FaEnvelope></FaEnvelope>
                                    Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* dashboard content */}
            {/* <h1 className="font-bold text-center"><span className="text-2xl md:text-5xl lg:text-7xl  text-blue-700">Welcome</span> <br /> <span className="text-xl md:text-3xl lg:text-5xl text-green-700">Dashboard</span></h1> */}
            <div className="flex-1 p-6">
 
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;