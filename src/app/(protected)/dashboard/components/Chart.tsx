import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { StatsItem } from "@/app/endpoints/analytics/analytics-types";
import { Skeleton } from "@mui/material";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StatsChartProps {
  data: StatsItem[];
  title?: string;
  color?: string; // optional line color
  loading?: boolean;
}

const StatsLineChart: React.FC<StatsChartProps> = ({
  data,
  title = "Stats Chart",
  color = "rgba(102, 204, 204, 1)",
  loading = false,
}) => {
  const chartData = {
    labels: data.map((item) => item.key),
    datasets: [
      {
        label: title,
        data: data.map((item) => item.value),
        borderColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null; // chart not yet rendered
          }

          // Create gradient
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "rgba(102, 204, 204, 0.5)"); // bottom color
          gradient.addColorStop(1, "rgba(127, 255, 255, 1)"); // top color
          return gradient;
        },
        backgroundColor: `${color.replace("1)", "0.2)")}`, // semi-transparent fill
        tension: 0.4, // smooth spline
        fill: true,
        pointRadius: 2,
        pointHoverRadius: 7,
        pointBackgroundColor: "#66CCCC", // optional, match gradient
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: !!title,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return loading ? (
    <Skeleton height={400} width={"100%"} />
  ) : (
    <Line data={chartData} options={options} />
  );
};

export default StatsLineChart;
