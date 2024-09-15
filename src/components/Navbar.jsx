import { Link, NavLink } from "react-router-dom";
import avatarImg from '../assets/profile.jpg'
import { MdNotificationsActive } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";


const Navbar = () => {
    const { user, logOutUser } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [theme, setTheme] = useState('light');



    const handleLogOut = () => {
        logOutUser()
        
            // .then(() => { })
            // .catch(error => console.log(error))
    }

    const navOption = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
        <li><NavLink to='/contact'>Contact Us</NavLink></li>
    </>

useEffect(() => {
    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem('theme')
    document.querySelector('html').setAttribute('data-theme', localTheme)
}, [theme])
const handleToggle = (e) => {
    if (e.target.checked) {
        setTheme('synthwave')
    }
    else {
        setTheme('light')
    }
}




    return (
        <>
            <div className="navbar fixed bg-black bg-opacity-60 max-w-screen-xl mx-auto text-white z-10  shadow-sm">
                <div className="navbar-start ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-black rounded-box w-52">
                            {navOption}
                        </ul>
                    </div>

                    <div>
                        <Link to='/'>
                            <div className="flex items-center">
                                <img
                                    src={"https://i.ibb.co/pJtsy6q/logo.png"}
                                    alt='logo'
                                    width='70'
                                    height='70'
                                />
                                <h2><span className="text-3xl font-bold text-blue-200">DOE</span> <span className="text-sm text-gray-100 font-bold">Courier</span></h2>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOption}
                    </ul>
                </div>

                <div className="navbar-end">
                    <div>
                        <Link to="/dashboard/adminHome">
                            <MdNotificationsActive className="text-xl mr-4"></MdNotificationsActive>
                        </Link>
                    </div>
                    <div className="pr-2">
                        <label className="cursor-pointer grid place-items-center">
                            <input onChange={handleToggle} type="checkbox" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                            <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                            <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </label>
                    </div>
                    <div className='relative'>
                        <div className='flex flex-row items-center gap-3'>
                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                className='p-1 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                            >
                                <div className=''>
                                    <img
                                        className='rounded-full'
                                        referrerPolicy='no-referrer'
                                        title={user?.displayName}
                                        src={user && user.photoURL ? user.photoURL : avatarImg}
                                        alt='profile'
                                        height='40'
                                        width='40'
                                    />
                                </div>
                            </div>
                        </div>

                        {isOpen && (
                            <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[15vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                                <div className='flex flex-col cursor-pointer'>

                                    {user ? (
                                        <>
                                            <h2 className="text-[16px]  block  px-4 pt-2 hover:bg-neutral-100 text-blue-800 transition font-bold">{user?.displayName}</h2>
                                            <Link
                                                to='/dashboard'
                                                className='block  px-4 py-3 hover:bg-neutral-100 text-black  transition font-semibold'
                                            >
                                                Dashboard
                                            </Link>
                                            <div
                                                onClick={handleLogOut}
                                                className='px-4 pb-2 hover:bg-neutral-100 text-black  transition font-semibold cursor-pointer'
                                            >
                                                Logout
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to='/login'
                                                className='px-4 py-3 hover:bg-neutral-100 text-black transition font-semibold'
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to='/signup'
                                                className='px-4 py-3 hover:bg-neutral-100 text-black  transition font-semibold'
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Navbar;