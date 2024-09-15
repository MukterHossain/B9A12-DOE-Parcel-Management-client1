

const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen rounded-sm " style={{ backgroundImage: 'url(https://i.ibb.co/YLrgyqr/banner.jpg)' }}>
                <div className="hero-overlay bg-opacity-60 rounded-sm"></div>
                <div className=" ">
                    <div className="text-center">
                        <div className="text-white w-4/5 md:w-2/3   m-auto text-center ">
                            <h1 className="mb-5 text-5xl text-green-200 font-bold">Welcome to DOE</h1>
                            <p className="mb-5 text-center">The courier service industry uses platforms to manage their fleets, clients, and business operations. Some of these substrates are old and are no longer as effective as newer technologies, posing competition issues.</p>
                        </div>
                        <div className="">
                            <div className="  w-1/2 m-auto flex  ">
                                <div className=" w-2/3 bg-white rounded-l-xl">
                                    <input type="text" placeholder="Type here" className="text-lg bg-white rounded-l-xl  outline-none px-3 py-2" />
                                </div>
                                <div className="border-l-2 w-1/3 rounded-r-xl bg-green-500">
                                    <span className="text-center rounded-r-xl  px-3 py-2 text-xl ml-4">Search</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;