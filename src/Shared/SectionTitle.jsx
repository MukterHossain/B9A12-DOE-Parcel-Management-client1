

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-3/5 my-5">
            <h2 className="text-3xl uppercase border-b-2 py-3 text-blue-800 font-bold">{heading}</h2>
            <p className="">{subHeading}</p>
        </div>
    );
};

export default SectionTitle;