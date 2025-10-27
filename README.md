# Viz Formulator MVP

A simplified MVP version of [microsoft/data-formulator](https://github.com/microsoft/data-formulator) - Create visualizations with a drag-and-drop interface.

## Features

- 📊 Create visualizations using drag-and-drop
- 📁 Load data from CSV files or paste from clipboard
- 🎨 Support for multiple chart types (bar, line, scatter, area)
- 🔧 Visual encoding channels (x, y, color, size)
- 📱 Clean Material-UI interface

## MVP Scope

This MVP focuses on the core visualization feature without:
- ❌ AI-powered data transformation
- ❌ Backend server
- ❌ Authentication
- ❌ Advanced data operations
- ❌ Multiple datasets/joins

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## How to Use

1. **Load Data**: Click "Load Data" and either:
   - Upload a CSV file
   - Paste CSV data from clipboard

2. **Select Chart Type**: Choose from bar, line, scatter, or area charts

3. **Drag & Drop Fields**: 
   - Drag data fields to encoding channels (X-axis, Y-axis, Color, Size)
   - The visualization updates automatically

4. **Explore**: Modify encodings to create different visualizations

## Tech Stack

- **React** ^18.2.0
- **TypeScript** ^4.9.5
- **Vite** ^5.4.19
- **Material-UI** ^7.1.1
- **Vega-Lite** ^5.5.0 - For chart rendering
- **React DnD** ^16.0.1 - For drag-and-drop functionality

## Parent Project

This MVP is based on [microsoft/data-formulator](https://github.com/microsoft/data-formulator), an AI-powered tool for creating rich data visualizations.

## License

MIT
