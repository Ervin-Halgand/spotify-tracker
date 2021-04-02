export const option = {
  responsive: true,
  maintainAspectRatio: false,
  tooltips: { enabled: false },
  hover: { mode: null },
  legend: {
    position: "top",
    labels: { fontColor: "#000000", fontSize: 14 },
  },
  scale: {
    ticks: {
      beginAtZero: true,
      maxTicksLimit: 10,
      showLabelBackdrop: false,
      fontColor: "#000000",
      display: false,
    },
    pointLabels: {
      fontColor: "#000000",
    },
    gridLines: {
      color: "rgba(0, 0, 0, 0.3)",
    },
  },
};
