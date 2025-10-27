import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DataLoader from './components/DataLoader';
import VisualizationPanel from './components/VisualizationPanel';
import EncodingPanel from './components/EncodingPanel';
import { DataRow } from './types';

const theme = createTheme({
  typography: {
    fontFamily: ['Arial', 'Roboto', 'Helvetica Neue', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'scatter' | 'area'>('bar');
  const [encoding, setEncoding] = useState<{
    x?: string;
    y?: string;
    color?: string;
    size?: string;
  }>({});

  const handleDataLoad = (newData: DataRow[], newColumns: string[]) => {
    setData(newData);
    setColumns(newColumns);
    setEncoding({});
  };

  const handleReset = () => {
    setData([]);
    setColumns([]);
    setEncoding({});
    setChartType('bar');
  };

  return (
    <ThemeProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <AppBar position="static" sx={{ bgcolor: 'white', color: 'black', boxShadow: 1 }}>
            <Toolbar variant="dense">
              <Typography variant="h6" component="h1" sx={{ flexGrow: 1, fontWeight: 300 }}>
                📊 Viz Formulator MVP
              </Typography>
              {data.length > 0 && (
                <Button variant="outlined" size="small" onClick={handleReset}>
                  Reset
                </Button>
              )}
            </Toolbar>
          </AppBar>

          {data.length === 0 ? (
            <DataLoader onDataLoad={handleDataLoad} />
          ) : (
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                <VisualizationPanel
                  data={data}
                  encoding={encoding}
                  chartType={chartType}
                />
              </Box>
              <EncodingPanel
                columns={columns}
                encoding={encoding}
                chartType={chartType}
                onEncodingChange={setEncoding}
                onChartTypeChange={setChartType}
              />
            </Box>
          )}
        </Box>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
