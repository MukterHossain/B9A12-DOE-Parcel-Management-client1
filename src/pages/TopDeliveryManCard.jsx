

const TopDeliveryManCard = ({item}) => {
    const {name, image, email } = item;
    
    return (
        <div>
            <div className="card card-compact w-full bg-base-100 shadow-xl">
                <img className="w-[80px] h-[70px]" src={image} alt="" />
                <div className="card-body">
                    <h2 className="card-title uppercase text-blue-600 font-bold">{name}</h2>
                    <p>{email}</p>
                    {/* <p>Total Booked: {totalBooked}</p>
                    <p>Total Delivered: {totalDelivered}</p>
                    <p>Total User: {totalUse}</p> */}
                </div>
            </div>
        </div>
    );
};

export default TopDeliveryManCard;