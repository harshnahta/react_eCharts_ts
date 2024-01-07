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
  grid: {
    top: 80,
    bottom: 30,
  },
  xAxis: {
    type: 'value',
    position: 'bottom',
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
  },
  yAxis: {
    type: 'category',
    axisLine: { show: false },
    axisLabel: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
    data: [],
  },
  series: [
    {
      name: 'Cost',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        formatter: '{b}',
      },
      data: [],
    },
  ],
};

type chartOptionsType = {
  In: number;
  Resign: number;
};

type seriesDataType = {
  value: string;
  label: string;
};

const Index = () => {
  const { data } = useChartData();
  const [loading, setLoading] = useState(true);
  const [barOptions, setBarOptions] = useState<EChartsOption>(option);

  const createbarOptions = useCallback(() => {
    setLoading(true);
    const categoryNames: Array<string> = Object.keys(data).reverse();
    const seriesData: Array<seriesDataType> = categoryNames.map(
      (item: string) => {
        const val: chartOptionsType = data[item as keyof typeof data];
        const diff: string = ((val?.In || 0) - (val?.Resign || 0)).toFixed(2);
        return { value: diff, label: `${diff} pp` };
      }
    );

    setBarOptions((preState: EChartsOption) => ({
      ...preState,
      yAxis: {
        ...preState.yAxis,
        data: seriesData.map((item: seriesDataType) => item.label),
      },
      series: [
        {
          name: 'Ratio',
          type: 'bar',
          stack: 'Total',
          color: 'rgb(76,200,187)',
          label: {
            show: true,
            formatter: '{b}',
          },
          data: seriesData,
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
