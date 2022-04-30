import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { itemStatusMap } from "../utils/CollectionsHelper";

const CollectionStatusChart = (props) => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [options, setOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          boxHeight: 5,
          boxWidth: 5,
          padding: 5,
        },
      },
    },
  });

  ChartJS.register(ArcElement, Tooltip);

  useEffect(() => {
    if (props.items && props.items.length > 0) {
      let statusData = [];
      let labelsData = [];
      let backgroundColorData = [];
      let borderColorData = [];

      [...itemStatusMap.keys()].forEach((key) => {
        statusData.push(
          props.items.filter((item) => item.status === key).length
        );

        const itemStatus = itemStatusMap.get(key);
        labelsData.push(itemStatus.text);
        backgroundColorData.push(itemStatus.chartColor);
        borderColorData.push(itemStatus.chartBorderColor);
      });

      setChartData({
        labels: labelsData,
        datasets: [
          {
            label: "Items",
            data: statusData,
            backgroundColor: backgroundColorData,
            borderColor: borderColorData,
            borderWidth: 1,
          },
        ],
      });
    } else {
      setChartData({
        datasets: [
          {
            data: [1],
            backgroundColor: ["rgba(210, 210, 210, 1)"],
            borderColor: ["rgba(255, 255, 255, 1)"],
            borderWidth: 1,
          },
        ],
      });

      setOptions({
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: () => "No items",
            },
          },
        },
      });
    }
  }, [props.items]);

  return (
    <Doughnut
      className="status-chart mt-3 mt-lg-0"
      data={chartData}
      options={options}
    />
  );
};

export default CollectionStatusChart;
