import React, { useMemo } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { VegaLite } from 'react-vega';
import { DataRow, Encoding, ChartType } from '../types';

interface VisualizationPanelProps {
  data: DataRow[];
  encoding: Encoding;
  chartType: ChartType;
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ data, encoding, chartType }) => {
  const spec = useMemo(() => {
    if (!encoding.x || !encoding.y) {
      return null;
    }

    const baseSpec: any = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: 'A simple chart',
      data: { values: data },
      mark: chartType === 'scatter' ? { type: 'point', filled: true } : chartType,
      width: 600,
      height: 400,
      encoding: {
        x: {
          field: encoding.x,
          type: isNumeric(data, encoding.x) ? 'quantitative' : 'nominal',
          axis: { title: encoding.x },
        },
        y: {
          field: encoding.y,
          type: isNumeric(data, encoding.y) ? 'quantitative' : 'nominal',
          axis: { title: encoding.y },
        },
      },
    };

    if (encoding.color) {
      baseSpec.encoding.color = {
        field: encoding.color,
        type: isNumeric(data, encoding.color) ? 'quantitative' : 'nominal',
      };
    }

    if (encoding.size && chartType === 'scatter') {
      baseSpec.encoding.size = {
        field: encoding.size,
        type: 'quantitative',
      };
    }

    return baseSpec;
  }, [data, encoding, chartType]);

  const isNumeric = (data: DataRow[], field: string): boolean => {
    return data.length > 0 && typeof data[0][field] === 'number';
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Visualization
      </Typography>

      {!encoding.x || !encoding.y ? (
        <Paper
          sx={{
            p: 4,
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 400,
            bgcolor: '#f5f5f5',
          }}
          elevation={0}
        >
          <Typography variant="body1" color="text.secondary">
            👈 Drag fields to X and Y axes to create a visualization
          </Typography>
        </Paper>
      ) : (
        <Paper sx={{ p: 3, mt: 2, display: 'inline-block' }} elevation={2}>
          <VegaLite spec={spec} actions={false} />
        </Paper>
      )}

      {data.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Data: {data.length} rows
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default VisualizationPanel;
