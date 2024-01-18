import { Chart as ChartJs } from "chart.js/auto";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import "jspdf-autotable";
import jsPDF from "jspdf";
import BlogService from "../services/blogService";
import { Button, Radio, Skeleton, Space, Tooltip, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faChartSimple,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

function ReportChart({ theme }) {
  const [reportData, setReportData] = useState({
    labels: [],
    datasets: [],
  });
  const [buttonLoading, setButtonLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [bar, setBar] = useState("bar");
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
    radius: 5,
    hitRadius: 30,
    hoverRadius: 12,
    responsive: true,
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
      head: [["Date", "Blogs in draft", "Blogs in review", "Blog published"]],
      body: tableData.map((row) => [
        row.date,
        row.blogDraft.toString(),
        row.blogPending.toString(),
        row.blogPublished.toString(),
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
              id: "0",
              fill: true,
              tension: 0.3,
              label: "Blogs in draft",
              data: res.data.map((data) => data.blogDraft),
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: (context) => {
                return getGredient(
                  context,
                  "rgba(53, 162, 235, 0.8)",
                  "rgba(53, 162, 235, 0.2)"
                );
              },
            },
            {
              id: "1",
              fill: true,
              tension: 0.3,
              label: "Blogs in review",
              data: res.data.map((data) => data.blogPending),
              borderColor: "rgba(255, 153, 0, 0.8)",
              backgroundColor: (context) => {
                return getGredient(
                  context,
                  "rgba(255, 153, 0, 0.8)",
                  "rgba(255, 153, 0, 0.3)"
                );
              },
            },
            {
              id: "2",
              fill: true,
              tension: 0.3,
              label: "Blogs published",
              data: res.data.map((data) => data.blogPublished),
              borderColor: "rgba(0, 128, 0, 0.8)",
              backgroundColor: (context) => {
                return getGredient(
                  context,
                  "rgba(0, 128, 0, 0.8)",
                  "rgba(0, 128, 0, 0.3)"
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
          {bar === "bar" ? (
            <Bar
              ref={chartRef}
              data={reportData}
              height={60}
              options={options}
            />
          ) : (
            <Line
              ref={chartRef}
              data={reportData}
              height={60}
              options={options}
            />
          )}
          <Space className="chart-top-action">
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
              />
            </Tooltip>
            <Radio.Group
              value={bar}
              buttonStyle="text"
              onChange={(e) => {
                setBar(e.target.value);
              }}
              disabled={buttonLoading}
            >
              <Radio.Button value="bar">
                <FontAwesomeIcon icon={faChartSimple} />
              </Radio.Button>
              <Radio.Button value="chart">
                <FontAwesomeIcon icon={faChartLine} />
              </Radio.Button>
            </Radio.Group>
          </Space>
        </div>
      )}
    </>
  );
}

export default ReportChart;
