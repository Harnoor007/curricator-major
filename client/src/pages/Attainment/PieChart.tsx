import React from "react";
import { ChartOptions, ChartData } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register chart elements and plugins (if needed)
// ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  options: ChartOptions<"pie">;
  data: ChartData<"pie", number[], string>;
}

const data: ChartData<"pie", number[], string> = {
  labels: ["90-100%", "80-90%", "70-80%", "60-70%", "50-60%", "0-50%"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
        "rgba(255, 159, 64, 0.8)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const options: ChartOptions<"pie"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "CIA Attainment (in %)",
    },
  },
};

const PieChart: React.FC<PieChartProps> = () => {
  return (
    <div className="w-min mx-9 py-10">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
