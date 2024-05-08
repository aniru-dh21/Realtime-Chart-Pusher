export default function ChartButton({ chartRef, type, name }) {
  const switchToLineChart = () => {
    chartRef.current.update({
      chart: {
        type: type,
      },
    });
  };

  return (
    <button
      onClick={() => switchToLineChart()}
      className="bg-indigo-500 hover:bg-indigo-700 p-2 rounded text-white shadow-md"
    >
      {name}
    </button>
  );
}
