import { FC } from 'react';
import { PieChartProps } from '../types/chart.type';
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: FC<PieChartProps> = ({ data, width = 500, height = 500 }) => {
  const chartData: ChartData<'pie'> = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: data.map((d) => d.color),
        borderColor: '#fff',
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 35,
          font: {
            size: 15,
          },
          usePointStyle: true,
          boxHeight: 8,
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        margin: '20px auto',
        position: 'relative',
      }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
