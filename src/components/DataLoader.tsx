import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { DataRow } from '../types';

interface DataLoaderProps {
  onDataLoad: (data: DataRow[], columns: string[]) => void;
}

const DataLoader: React.FC<DataLoaderProps> = ({ onDataLoad }) => {
  const [pasteDialogOpen, setPasteDialogOpen] = useState(false);
  const [pastedText, setPastedText] = useState('');

  const parseCSV = (text: string): { data: DataRow[]; columns: string[] } => {
    const lines = text.trim().split('\n');
    if (lines.length === 0) return { data: [], columns: [] };

    const columns = lines[0].split(',').map((col) => col.trim());
    const data: DataRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map((val) => val.trim());
      const row: DataRow = {};
      columns.forEach((col, idx) => {
        const value = values[idx];
        // Try to parse as number
        const numValue = parseFloat(value);
        row[col] = isNaN(numValue) ? value : numValue;
      });
      data.push(row);
    }

    return { data, columns };
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const { data, columns } = parseCSV(text);
      onDataLoad(data, columns);
    };
    reader.readAsText(file);
  };

  const handlePasteData = () => {
    const { data, columns } = parseCSV(pastedText);
    if (data.length > 0) {
      onDataLoad(data, columns);
      setPasteDialogOpen(false);
      setPastedText('');
    }
  };

  // Sample data for quick start
  const loadSampleData = () => {
    const sampleCSV = `Category,Sales,Profit,Region
Furniture,1000,200,East
Technology,1500,450,West
Office Supplies,800,150,East
Furniture,1200,250,West
Technology,2000,600,East
Office Supplies,900,180,West`;
    const { data, columns } = parseCSV(sampleCSV);
    onDataLoad(data, columns);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          📊 Viz Formulator MVP
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, textAlign: 'center' }}>
          Create beautiful visualizations with drag-and-drop. Load your data to get started.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadFileIcon />}
            size="large"
          >
            Upload CSV File
            <input type="file" hidden accept=".csv" onChange={handleFileUpload} />
          </Button>

          <Button
            variant="outlined"
            startIcon={<ContentPasteIcon />}
            size="large"
            onClick={() => setPasteDialogOpen(true)}
          >
            Paste Data
          </Button>
        </Box>

        <Button variant="text" size="small" onClick={loadSampleData}>
          Or try with sample data
        </Button>
      </Box>

      <Dialog open={pasteDialogOpen} onClose={() => setPasteDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Paste CSV Data</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            rows={10}
            fullWidth
            variant="outlined"
            placeholder="Category,Sales,Profit\nFurniture,1000,200\nTechnology,1500,450"
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handlePasteData} variant="contained" disabled={!pastedText.trim()}>
            Load Data
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataLoader;
