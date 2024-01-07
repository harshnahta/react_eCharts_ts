import { memo } from 'react';

import Charts from './Charts';
import Sidebar from './Sidebar';
import { Container, Grid, Box } from '@mui/material';
import {
  ListRounded,
  InfoRounded,
  SettingsRounded,
  ArrowDropDownCircleOutlined,
  CalendarViewMonth,
} from '@mui/icons-material';

type RoundedProps = {
  children: string | JSX.Element | JSX.Element[];
  backgroundColor?: string;
};
const RoundedIcon = ({ children, backgroundColor = 'grey' }: RoundedProps) => {
  return (
    <Container
      style={{
        width: '50px',
        height: '50px',
        padding: 10,
        margin: '5px 0 5px 0',
        borderRadius: '25px',
        backgroundColor: backgroundColor,
      }}
    >
      {children}
    </Container>
  );
};
const Index = () => {
  return (
    <Container style={{ maxWidth: '100vw', padding: 0, height: '100vh' }}>
      <Grid container spacing={2} style={{ height: '100vh' }}>
        <Grid item xs={12} sm={8} lg={9} style={{ position: 'relative' }}>
          <Charts />
          <Box
            flexDirection={'column'}
            display={'flex'}
            position={'absolute'}
            top={'25vh'}
            right={'0'}
            zIndex={9999999}
          >
            <RoundedIcon backgroundColor="blue">
              <InfoRounded style={{ color: 'white' }} />
            </RoundedIcon>
            <RoundedIcon>
              <ListRounded style={{ color: 'white' }} />
            </RoundedIcon>
            <RoundedIcon>
              <SettingsRounded style={{ color: 'white' }} />
            </RoundedIcon>
            <RoundedIcon>
              <ArrowDropDownCircleOutlined style={{ color: 'white' }} />
            </RoundedIcon>
            <RoundedIcon backgroundColor="black">
              <CalendarViewMonth style={{ color: 'white' }} />
            </RoundedIcon>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <Sidebar />
        </Grid>
      </Grid>
    </Container>
  );
};

export default memo(Index);
