import React, { useMemo } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ data, name }) {
  // Зачем использовать useMemo, разве не лучше чтоб данные пересчитывались каждый раз?

  const chartData = useMemo(
    () => ({
      labels: data.map((_, index) => `Post ${index + 1}`),
      datasets: [
        {
          label: name,
          data,
          backgroundColor: "#880F10",
          borderRadius: 3,
        },
      ],
    }),
    [data, name]
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

  return <Bar options={options} data={chartData} />;
}
