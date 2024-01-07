import { memo } from 'react';

import { Box, Card, Typography, Button } from '@mui/material';

type ItemProp = {
  name: string;
  value: string;
  color?: string;
};

const Item = (props: ItemProp) => {
  const { name, value, color = 'black' } = props;
  return (
    <Box display={'flex'} padding={1}>
      <Box
        fontWeight="500"
        paddingLeft={2}
        textAlign={'left'}
        width={'50%'}
        fontSize={16}
        color={color}
      >
        {name}
      </Box>
      <Box
        fontWeight="500"
        paddingLeft={2}
        textAlign={'right'}
        width={'50%'}
        fontSize={16}
        color={color}
      >
        {value}
      </Box>
    </Box>
  );
};

const Index = () => {
  return (
    <Card
      style={{
        height: '100vh',
        backgroundColor: 'rgb(240,241,244)',
        position: 'relative',
        padding: '30px 10px',
      }}
    >
      <Typography fontWeight="600" paddingLeft={2} textAlign={'left'}>
        Summary
      </Typography>
      <Typography fontWeight="600" paddingLeft={2} textAlign={'left'}>
        Apr 2018 - mar 2019
      </Typography>
      <Card style={{ backgroundColor: 'white' }}>
        <Item name="Overall" value="14.0 %" color="rgb(77,165,221)" />
        <Item name="Resignation Count" value="639" />
        <Item name="Average Headcount" value="4.58 k" />
        <Item name="High Performer" value="14.1 %" color="red" />
        <Item name="Resignation Count" value="152" />
        <Item name="Average Headcount" value="108 k" />
        <Item name="Difference" value="-0.16 pp" color="green" />
      </Card>
      <Button
        variant="outlined"
        style={{ marginTop: 8, width: '96%', justifyContent: 'center' }}
      >
        View details
      </Button>
      <Typography fontWeight="600" paddingLeft={2} textAlign={'left'}>
        Legend
      </Typography>
      <Card style={{ backgroundColor: 'white', padding: '2px' }}>
        <Typography fontWeight="400" paddingLeft={2} textAlign={'left'}>
          Not all data items are shown in this chart. To show these values, go
          to
        </Typography>
        <Button
          style={{
            float: 'left',
            paddingLeft: '15px',
            color: 'rgb(77,165,221)',
          }}
        >
          CHAT SETTING
        </Button>
      </Card>
    </Card>
  );
};

export default memo(Index);
