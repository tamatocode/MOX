"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function TransactionChart({ transactions }) {
  const data = {
    labels: transactions.map((tx) => new Date(tx.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: "Amount",
        data: transactions.map((tx) => tx.amount),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "white" } },
      title: {
        display: true,
        text: "Transaction History",
        color: "white",
        font: { size: 18 },
      },
    },
    scales: {
      x: { ticks: { color: "white" }, grid: { color: "rgba(255, 255, 255, 0.1)" } },
      y: { ticks: { color: "white" }, grid: { color: "rgba(255, 255, 255, 0.1)" } },
    },
  };

  return (
    <div className="p-4">
      <Bar data={data} options={options} />
    </div>
  );
}