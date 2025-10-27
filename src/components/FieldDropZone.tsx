import React from 'react';
import { useDrop } from 'react-dnd';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface FieldDropZoneProps {
  label: string;
  field?: string;
  onDrop: (field: string) => void;
  onRemove: () => void;
  optional?: boolean;
}

const FieldDropZone: React.FC<FieldDropZoneProps> = ({ label, field, onDrop, onRemove, optional }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'field',
    drop: (item: { name: string }) => onDrop(item.name),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
        {label} {optional && '(optional)'}
      </Typography>
      <Paper
        ref={drop}
        sx={{
          p: 1.5,
          minHeight: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '2px dashed',
          borderColor: isOver ? 'primary.main' : field ? 'primary.light' : '#e0e0e0',
          bgcolor: isOver ? 'primary.light' : field ? 'primary.50' : 'white',
          transition: 'all 0.2s',
        }}
        elevation={0}
      >
        {field ? (
          <>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {field}
            </Typography>
            <IconButton size="small" onClick={onRemove}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Drop field here
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default FieldDropZone;
