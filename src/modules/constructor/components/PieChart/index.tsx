import { FC, useCallback } from 'react';
import { Chart as ChartJS, ChartData, ChartOptions, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useAppSelector } from 'lib/hooks/useAppSelector';
import { sectorsFetchStatus, selectSectors } from 'lib/store/feature/sectors';
import SkeletonPieChart from 'modules/common/skeleton/SkeletonPieChart';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: FC = () => {
  const sectorData = useAppSelector(selectSectors);
  const fetchingStatus = useAppSelector(sectorsFetchStatus);

  const renderPieChart = useCallback(() => {
    if (fetchingStatus === 'idle' || fetchingStatus === 'loading') {
      return <SkeletonPieChart />;
    } else if (sectorData && sectorData.length > 0) {
      return <Pie data={chartData} options={options} />;
    } else {
      <></>;
    }
  }, [fetchingStatus, sectorData]);

  const chartData: ChartData<'pie'> = {
    labels: sectorData.map((d) => d.name),
    datasets: [
      {
        data: sectorData.map((d) => d.percentages),
        backgroundColor: sectorData.map((d) => d.color),
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
        width: `500px`,
        height: `500px`,
        margin: '20px auto',
        position: 'relative',
      }}
    >
      {renderPieChart()}
    </div>
  );
};

export default PieChart;
