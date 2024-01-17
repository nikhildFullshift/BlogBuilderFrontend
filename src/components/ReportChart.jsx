import { Chart as ChartJs } from "chart.js/auto";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import BlogService from "../services/blogService";
import { Skeleton, notification } from "antd";

function ReportChart({ theme }) {
  const [reportData, setReportData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const options = {
    scales: {
      x: {
        ticks: {
          color: theme === "dark" ? "#fff" : "#000",
        },
      },
      y: {
        ticks: {
          color: theme === "dark" ? "#fff" : "#000",
          stepSize: 1,
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: theme === "dark" ? "#fff" : "#000",
        },
      },
      title: {
        display: true,
        text: "Last 7 Days Blog Report",
        color: theme === "dark" ? "#fff" : "#000",
        font: {
          size: 16,
          weight: "bold",
        },
        position: "left",
      },
    },
  };
  const getGredient = (context, c1, c2) => {
    const chart = context.chart;
    const { ctx, chartArea } = chart;

    if (!chartArea) {
      return null;
    }

    const gradient = ctx.createLinearGradient(
      chartArea.left,
      chartArea.top,
      chartArea.left,
      chartArea.bottom
    );

    gradient.addColorStop(0, c1);
    gradient.addColorStop(1, c2);

    return gradient;
  };
  useEffect(() => {
    BlogService.getReport()
      .then((res) => {
        setReportData({
          labels: res.data.map((data) => data.date),
          datasets: [
            {
              id: "1",
              fill: true,
              label: "Blog Posted",
              data: res.data.map((data) => data.blogPosted),
              borderColor: "rgb(0, 128, 0)",
              backgroundColor: (context) => {
                return getGredient(
                  context,
                  "rgba(0, 128, 0, 0.8)",
                  "rgba(0, 128, 0, 0.1)"
                );
              },
            },
            {
              id: "2",
              fill: true,
              label: "Blog Created",
              data: res.data.map((data) => data.blogCreated),
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: (context) => {
                return getGredient(
                  context,
                  "rgba(53, 162, 235, 0.8)",
                  "rgba(53, 162, 235, 0.1)"
                );
              },
            },
          ],
        });
        setLoading(false);
      })
      .catch(() => {
        notification.error({
          message: "Something went wrong while fetching Reports !!!",
        });
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <Line data={reportData} height={60} options={options} />
      )}
    </>
  );
}

export default ReportChart;
