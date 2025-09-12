export type PieChartData = {
  label: string;
  value: number;
  color: string;
};

export type PieChartProps = {
  data: PieChartData[];
  title?: string;
  width?: number;
  height?: number;
  showPercentage?: boolean;
};
