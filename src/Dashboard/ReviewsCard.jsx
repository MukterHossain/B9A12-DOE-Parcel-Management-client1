// import CountUp from "react-countup/build/CountUp";


const ReviewsCard = ({item}) => {
    const { name, image, rating, feedback } = item;
    return (
        <div>
            <div className="card card-compact w-full  bg-base-100 hover:scale-105 transition-all shadow-xl">
                <img className="w-[80px] h-[70px] group-hover:scale-125" src={image} alt="" />
                <div className="card-body">
                    <h2 className="card-title uppercase text-blue-600 font-bold">{name}</h2>
                    <p>{feedback}</p>
                    <hr />
                    <div className="space-y-2">
                        {/* <p>Total Booked: <span className="text-blue-600 font-bold"> <CountUp duration={2.5} end={rating}></CountUp></span></p> */}
                        <p>rating {rating}</p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewsCard;