import { Chart as ChartJs } from "chart.js/auto";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import "jspdf-autotable";
import jsPDF from "jspdf";
import BlogService from "../services/blogService";
import { Button, Skeleton, Tooltip, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

function ReportChart({ theme }) {
  const [reportData, setReportData] = useState({
    labels: [],
    datasets: [],
  });
  const [buttonLoading, setButtonLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
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

  const downloadReport = () => {
    setButtonLoading(true);
    const pdf = new jsPDF("p", "mm", "a4");
    console.log(chartRef.current);
    const chartCanvas = chartRef.current.canvas;
    const chartImage = chartCanvas.toDataURL("image/png");
    pdf.addImage(chartImage, "PNG", 10, 10, 190, 40);
    pdf.autoTable({
      startY: 60,
      head: [["Date", "Blog Created", "Blog Posted"]],
      body: tableData.map((row) => [
        row.date,
        row.blogCreated.toString(),
        row.blogPosted.toString(),
      ]),
    });
    setTimeout(() => {
      pdf.save("report.pdf");
      setButtonLoading(false);
    }, 2000);
  };
  useEffect(() => {
    BlogService.getReport()
      .then((res) => {
        setTableData(res.data);
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
        <div className="chart-report-wrapper">
          <Line
            ref={chartRef}
            data={reportData}
            height={60}
            options={options}
          />
          <Tooltip
            title={buttonLoading ? null : "Download Report"}
            placement="left"
          >
            <Button
              onClick={() => {
                downloadReport();
              }}
              loading={buttonLoading}
              icon={<FontAwesomeIcon icon={faDownload} />}
              shape={buttonLoading ? null : "circle"}
            >
              {buttonLoading ? "Downloading" : null}
            </Button>
          </Tooltip>
        </div>
      )}
    </>
  );
}

export default ReportChart;
