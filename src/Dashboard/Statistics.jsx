import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Chart from 'react-apexcharts'
// import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../Shared/LoadingSpinner";
// import { title } from "process";

// const options = {
//     chart: {
//       id: 'apexchart-example',
//       type: 'bar',
//     },
//     xaxis: {
//       categories: [] // categories ডেটা থেকে আসবে
//     },
//     title: {
//       text: 'Booked Over Date'
//     },
//     legend: {
//       position: 'bottom'
//     }
// }
const Statistics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: chartData = [], isLoading,refetch } = useQuery({
        queryKey: ['bar-chart'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bar-chart')
            return res.data;
        }
    })
    console.log(chartData)
    const categories = chartData.length > 0 ? chartData.map(item => item.data) : [];

    //requestedDate
    const options = {
        chart: {
          id: 'apexchart-example',
          type: 'bar',
        },
        xaxis: {
          categories: [categories] // categories ডেটা থেকে আসবে
        },
        title: {
          text: 'Booked Over Date'
        },
        legend: {
          position: 'bottom'
        }
    }
    const series = chartData.length > 0 ? [{
        name: 'Booking Count',
        data: chartData.map(item => item.price) // ডেটা অনুযায়ী মান বের করা
    }] : [];
  
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <Helmet>
                <title>DOE Courier || Statistics</title>
            </Helmet>
            <h2>Statistics {}</h2>
            <Chart
            options={options}  series={series} type="bar" width={500} height={320} 
       ></Chart> </div>
    );
};

export default Statistics;