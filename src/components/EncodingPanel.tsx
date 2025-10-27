import React from 'react';
import {
  Box,
  Typography,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import AreaChartIcon from '@mui/icons-material/AreaChart';
import FieldDropZone from './FieldDropZone';
import { ChartType, Encoding } from '../types';

interface EncodingPanelProps {
  columns: string[];
  encoding: Encoding;
  chartType: ChartType;
  onEncodingChange: (encoding: Encoding) => void;
  onChartTypeChange: (chartType: ChartType) => void;
}

const EncodingPanel: React.FC<EncodingPanelProps> = ({
  columns,
  encoding,
  chartType,
  onEncodingChange,
  onChartTypeChange,
}) => {
  const handleFieldDrop = (channel: keyof Encoding, field: string) => {
    onEncodingChange({ ...encoding, [channel]: field });
  };

  const handleFieldRemove = (channel: keyof Encoding) => {
    const newEncoding = { ...encoding };
    delete newEncoding[channel];
    onEncodingChange(newEncoding);
  };

  return (
    <Box
      sx={{
        width: 320,
        borderLeft: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#fafafa',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Encoding
        </Typography>

        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
          Chart Type
        </Typography>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={(e, value) => value && onChartTypeChange(value)}
          size="small"
          fullWidth
          sx={{ mb: 3 }}
        >
          <ToggleButton value="bar">
            <BarChartIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="line">
            <ShowChartIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="scatter">
            <ScatterPlotIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="area">
            <AreaChartIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider sx={{ my: 2 }} />

        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
          Drag fields to channels
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <FieldDropZone
            label="X-axis"
            field={encoding.x}
            onDrop={(field) => handleFieldDrop('x', field)}
            onRemove={() => handleFieldRemove('x')}
          />
          <FieldDropZone
            label="Y-axis"
            field={encoding.y}
            onDrop={(field) => handleFieldDrop('y', field)}
            onRemove={() => handleFieldRemove('y')}
          />
          <FieldDropZone
            label="Color"
            field={encoding.color}
            onDrop={(field) => handleFieldDrop('color', field)}
            onRemove={() => handleFieldRemove('color')}
            optional
          />
          <FieldDropZone
            label="Size"
            field={encoding.size}
            onDrop={(field) => handleFieldDrop('size', field)}
            onRemove={() => handleFieldRemove('size')}
            optional
          />
        </Box>
      </Box>

      <Divider />

      <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto' }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Available Fields
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {columns.map((col) => (
            <DraggableField key={col} name={col} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

interface DraggableFieldProps {
  name: string;
}

const DraggableField: React.FC<DraggableFieldProps> = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'field',
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Paper
      ref={drag}
      sx={{
        p: 1,
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
        bgcolor: 'white',
        '&:hover': { bgcolor: '#f5f5f5' },
      }}
      elevation={1}
    >
      <Typography variant="body2">{name}</Typography>
    </Paper>
  );
};

import { useDrag } from 'react-dnd';

export default EncodingPanel;
