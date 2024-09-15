import errorImage from '../assets/error.jpg'

const ErrorPage = () => {
    return (
        <div>
            <div className=' flex justify-center items-center'>
            <img className='w-80 h-80' src={errorImage} alt="" />
            </div>
            <h1 className='text-4xl text-center font-bold text-blue-600'>Page not found</h1>           
        </div>
    );
};

export default ErrorPage;