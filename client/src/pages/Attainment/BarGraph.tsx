import React from "react";
import { ChartOptions, ChartData, Chart } from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

// Import necessary chart elements from 'chart.js'
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define chart options
const options: ChartOptions<"bar"> = {

    // Use `animations` object to specify animation settings
    animations: {
      y: {
        duration: 2000,
        from: 500,
      },
    },
  
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "CIA Attainment (in %)",
    },
  },
};

// Define chart labels
const labels: string[] = ["CO1", "CO2", "CO3", "CO4", "CO6"];

// Generate dummy data for chart datasets
const data: ChartData<"bar", number[], string> = {
  labels,
  datasets: [
    {
      label: "CIA Threshold",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: "rgba(75, 192, 192, 0.8)",
    },
    {
      label: "Threshold Based Attainment",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: "rgba(255, 99, 132, 0.8)",
    },
  ],
};

// Define the BarGraph component
const BarGraph: React.FC = () => {
  return <Bar className="w-16" options={options} data={data} />;
};

export default BarGraph;
