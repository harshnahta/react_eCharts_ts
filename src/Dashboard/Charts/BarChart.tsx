import { memo, useCallback, useEffect, useState } from 'react';
import { useChartData } from '../Provider/ChartData';

import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';

import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
} from 'echarts/components';

import { EChartsOption } from 'echarts-for-react';

import {
  CanvasRenderer,
  // SVGRenderer,
} from 'echarts/renderers';

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);
const option: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
  },
  yAxis: {
    type: 'category',
    data: [],
  },
  series: [
    {
      name: 'In',
      type: 'bar',
      data: [],
      color: 'rgb(77,165,221)',
    },
    {
      name: 'Resign',
      type: 'bar',
      data: [],
      color: 'rgb(252,123,102)',
    },
  ],
};

type chartOptions = {
  In: number;
  Resign: number;
};

const Index = () => {
  const { data } = useChartData();
  const [loading, setLoading] = useState(true);
  const [barOptions, setBarOptions] = useState<EChartsOption>(option);

  const createbarOptions = useCallback(() => {
    setLoading(true);
    const categoryNames: Array<string> = Object.keys(data).reverse();
    const InData: Array<number> = categoryNames.map((item: string) => {
      const val: chartOptions = data[item as keyof typeof data];
      return val?.In || 0;
    });
    const ResignData: Array<number> = categoryNames.map((item: string) => {
      const val: chartOptions = data[item as keyof typeof data];
      return val?.Resign || 0;
    });

    setBarOptions((preState: EChartsOption) => ({
      ...preState,
      yAxis: {
        ...preState.yAxis,
        data: categoryNames,
      },
      series: [
        {
          name: 'In',
          type: 'bar',
          data: InData,
          color: 'rgb(77,165,221)',
        },
        {
          name: 'Resign',
          type: 'bar',
          data: ResignData,
          color: 'rgb(252,123,102)',
        },
      ],
    }));
    setLoading(false);
  }, [data]);

  useEffect(() => {
    createbarOptions();
  }, [createbarOptions]);

  if (loading) return null;

  return (
    <ReactEChartsCore
      style={{ height: '600px', width: '100%' }}
      echarts={echarts}
      option={barOptions}
      notMerge={true}
      lazyUpdate={true}
      theme={'theme_name'}
    />
  );
};

export default memo(Index);
