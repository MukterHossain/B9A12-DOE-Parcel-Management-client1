
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../Shared/SectionTitle";
import OurFeaturesCard from "./OurFeaturesCard";
import useAxiosPublic from "../hooks/useAxiosPublic";



const OurFeatures = () => {
    const axiosPublic = useAxiosPublic()
    console.log(axiosPublic)

    // const [features, setFeatures] = useState();
    // const [loading, setLoading] = useState(true)
    const {data:features = [], isLoading} = useQuery({
        queryKey: ['features'],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/features`)
            return data
        }
    })

    if(isLoading) return <progress className="progress progress-success w-56" value="100" max="100"></progress>

    return (
        <div className="">
            <SectionTitle heading={"Our Features"} subHeading={"Traditional couriers have a fleet of vehicles like motorcycle, car, van, and truck to transport goods from one location to another"}></SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-4">
                {
                features?.map(item => <OurFeaturesCard key={item._id} item={item}></OurFeaturesCard>)
                }               
            </div>

        </div>
    );
};

export default OurFeatures;