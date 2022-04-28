import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const CollectionStatusChart = (props) => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const options = {
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
  };

  ChartJS.register(ArcElement, Tooltip);

  useEffect(() => {
    const own = props.items.filter((item) => item.status === "OWN").length;
    const want = props.items.filter((item) => item.status === "WANT").length;
    const doNotWant = props.items.filter(
      (item) => item.status === "DO_NOT_WANT"
    ).length;

    setChartData({
      labels: ["Own", "Want", "Do Not Want"],
      datasets: [
        {
          label: "Items",
          data: [own, want, doNotWant],
          backgroundColor: [
            "rgba(69, 204, 105, 1)",
            "rgba(214, 66, 49, 1)",
            "rgba(49, 120, 214, 1)",
          ],
          borderColor: [
            "rgba(255, 255, 255, 1)",
            "rgba(255, 255, 255, 1)",
            "rgba(255, 255, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
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
