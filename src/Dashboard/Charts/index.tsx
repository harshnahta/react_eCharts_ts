import { memo, useCallback, useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ChartDataProvider } from '../Provider/ChartData';
import { CalendarMonth, Add, ExpandCircleDown } from '@mui/icons-material';
import BarChart from './BarChart';
import BarNegativeChart from './BarNegativeChart';
import { useChartData } from '../Provider/ChartData';
import { JSONEditor } from 'react-json-editor-viewer';

const JSONViewer = () => {
  const { data, replaceJson } = useChartData();
  const [loading, setLoading] = useState(true);
  const [json, setJson] = useState(data);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setJson(data);
    setLoading(false);
  }, [data]);

  useEffect(() => {
    if (!opened && !loading) {
      setJson(data);
    }
  }, [opened, loading, data]);

  const onJsonChange = useCallback(
    (key: any, value: any, parent: any, data: any) => {
      if (data.root) {
        setJson(data.root);
      } else {
        setJson(data);
      }
    },
    []
  );

  const updateJson = () => {
    replaceJson(json);
  };

  if (loading) return null;
  return (
    <Accordion style={{ margin: '10px' }}>
      <AccordionSummary
        expandIcon={<ExpandCircleDown />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={() => {
          setOpened((preState) => !preState);
        }}
      >
        <Typography>Chart Data JSON Viewer/Editor</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Container
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <JSONEditor data={json} collapsible onChange={onJsonChange} />
          <Button
            variant="outlined"
            style={{ width: '250px', float: 'left' }}
            onClick={updateJson}
          >
            Update JSON
          </Button>
        </Container>
      </AccordionDetails>
    </Accordion>
  );
};

const Index = () => {
  return (
    <ChartDataProvider>
      <Container style={{ maxWidth: '100vw', paddingTop: '40px' }}>
        <JSONViewer />
        <Typography fontWeight="600" paddingLeft={2} textAlign={'left'}>
          Comparision of high performer resignation rates to overall resignation
          rate
        </Typography>
        <Typography fontWeight="400" paddingLeft={2} textAlign={'left'}>
          Do high performers resign more often than others?
        </Typography>
        <Box display={'flex'} padding={1}>
          <Button
            variant="outlined"
            style={{
              marginTop: 8,
              justifyContent: 'center',
              color: 'black',
              borderColor: 'black',
            }}
            startIcon={<CalendarMonth />}
          >
            Mar 2019
          </Button>
          <Button
            variant="outlined"
            style={{
              marginTop: 8,
              marginLeft: 4,
              justifyContent: 'center',
              color: 'black',
              borderColor: 'black',
            }}
            startIcon={<Add />}
          >
            Add a filter
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <BarChart />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <BarNegativeChart />
          </Grid>
        </Grid>
      </Container>
    </ChartDataProvider>
  );
};

export default memo(Index);
