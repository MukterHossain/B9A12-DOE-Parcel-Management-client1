
import Banner from "../pages/Banner";
import OurFeatures from "../pages/OurFeatures";
import { Helmet } from 'react-helmet-async';
import TopDeliveryMan from "../pages/TopDeliveryMan";


const Home = () => {



    return (
        <div className="">
            <div>
            <Helmet>
                <title>DOE Courier || Home</title>
            </Helmet>
            </div>
            <Banner></Banner>
            <OurFeatures></OurFeatures>
            <TopDeliveryMan></TopDeliveryMan>
            
        </div>
    );
};

export default Home;