import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export default function BarChart({ data, name }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e6e6e6",
        },
      },
      title: {
        display: true,
        text: name,
        color: "#e6e6e6",
      },
    },
  };

  const chartData = {
    labels: data.map((_, index) => `Post ${index + 1}`),
    datasets: [
      {
        label: name,
        data: data,
        backgroundColor: "#880F10",
        borderRadius: 3,
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
}
