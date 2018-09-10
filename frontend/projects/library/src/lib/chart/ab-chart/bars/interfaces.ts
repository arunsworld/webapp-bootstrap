import { Plot } from '../interfaces';


export interface BarPlotElement {
    x: string;
    y: number;
    y0?: number;
    color?: string;
}

export interface BarPlot extends Plot {
    color?: string;
    tooltip?: (BarPlotElement) => string;
    data: Array<BarPlotElement>;
}

export interface StackedBarElement {
    x: string;
    y: number;
    y0: number;
    display?: string;
}

export interface StackedBarSeries {
    color?: string;
    data: Array<StackedBarElement>;
}

export interface StackedBarPlot extends Plot {
    series: Array<StackedBarSeries>;
    tooltip?: (StackedBarElement) => string;
}

export interface GroupedBarElement {
    x: string;
    y: number;
    display?: string;
}

export interface GroupedBarSeries {
    color?: string;
    data: Array<GroupedBarElement>;
}

export interface GroupedBarPlot extends Plot {
    series: Array<GroupedBarSeries>;
    tooltip?: (GroupedBarElement) => string;
}
