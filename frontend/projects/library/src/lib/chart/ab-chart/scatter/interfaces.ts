import { Plot } from '../interfaces';


export interface ScatterPlotElement {
    x: number | string;
    y: number;
    size?: number;
}

export interface ScatterPlot extends Plot {
    color?: string;
    size?: number;
    tooltip?: (ScatterPlotElement) => string;
    data: Array<ScatterPlotElement>;
}
