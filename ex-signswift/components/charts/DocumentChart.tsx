"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  ArcElement,Legend
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";


// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);
ChartJS.register(ArcElement, Tooltip, Legend);
interface MarketChartProps {
  allDocs: number;
  draft: number;
  pending: number;
  completed: number;
}

const MarketChart: React.FC<MarketChartProps> = ({allDocs, draft, pending, completed}) => {
  //const [chartData, setChartData] = useState<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&precision=2&interval=daily`
//         );
//         const data = await response.json();
//         console.log("chartData:", data);
//         setChartData(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, [id]);

//   if (!chartData || !chartData.prices) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-12 w-12"></div>
//       </div>
//     );
//   }
//   const { prices } = chartData;
const prices = [["all",allDocs],["drafts", draft],["pending",pending], ["completed", completed]]
console.log(prices);
  const data = {
    labels: prices.map((entry: any) => entry[0]),
    datasets: [
      {
        label: "count",
        data: prices.map((entry: any) => entry[1]),
        borderColor: "orange",
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};
export default MarketChart;