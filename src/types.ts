export type DataRow = Record<string, any>;

export interface Encoding {
  x?: string;
  y?: string;
  color?: string;
  size?: string;
}

export type ChartType = 'bar' | 'line' | 'scatter' | 'area';
