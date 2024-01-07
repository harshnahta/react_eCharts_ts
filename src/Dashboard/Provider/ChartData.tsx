import React, {
  type PropsWithChildren,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';

const ChartDataContext = React.createContext({
  data: {},
  replaceJson: (newJson) => {},
});

type chartOptions = {
  In: number;
  Resign: number;
};

type dataTypes = {
  [key: string]: chartOptions;
};

const defaultData: dataTypes = {
  Operations: {
    In: 16.61,
    Resign: 16.6,
  },
  Sales: {
    In: 15.3,
    Resign: 18.1,
  },
  IT: {
    In: 13.7,
    Resign: 11.6,
  },
  HR: {
    In: 12.9,
    Resign: 20.8,
  },
  Finance: {
    In: 12.5,
    Resign: 9.27,
  },
  'Customer Support': {
    In: 12.3,
    Resign: 12.0,
  },
  Marketing: {
    In: 11.9,
    Resign: 10.9,
  },
  'Office of CEO': {
    In: 11.0,
    Resign: 0,
  },
  Product: {
    In: 9.37,
    Resign: 8.59,
  },
};

export const ChartDataProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [data, setData] = useState<dataTypes>(defaultData);

  const replaceJson = useCallback((newJson: dataTypes) => {
    setData(newJson);
    sessionStorage.setItem('_chartData', JSON.stringify(newJson));
  }, []);

  useEffect(() => {
    const getUpdatedData = sessionStorage.getItem('_chartData');
    if (getUpdatedData && Object.keys(JSON.parse(getUpdatedData)).length) {
      replaceJson(JSON.parse(getUpdatedData));
    }
  }, [replaceJson]);

  return (
    <ChartDataContext.Provider
      value={{
        data,
        replaceJson,
      }}
    >
      {children}
    </ChartDataContext.Provider>
  );
};

export function useChartData() {
  const context = useContext(ChartDataContext);
  if (context === undefined) {
    throw new Error('useChartData must be used within an ChartDataProvider');
  }
  return context;
}
