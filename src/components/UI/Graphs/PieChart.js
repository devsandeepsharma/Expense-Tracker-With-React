import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from "chart.js";
  import { Pie } from "react-chartjs-2";
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  const PieChart = ({ data = [] }) => {
    const expenseData = {
        labels: ["Rental", "Entertainment", "Shopping", "Travel"],
        datasets: [
          {
            label: "Monthly Expenses",
            data: [1500, 304.33, 1161.13, 1251.66],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            hoverOffset: 4,
          },
        ],
      };
    
      return <Pie data={expenseData} />
};

export default PieChart;
  