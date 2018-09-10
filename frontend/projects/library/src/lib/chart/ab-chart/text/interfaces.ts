import { Plot } from '../interfaces';


export interface TextPlotElement {
    x: string;
    y: number;
    text: string;
}

export interface TextPlot extends Plot {
    color?: string;
    shape?: string;
    anchor?: string;
    xoffset?: number;
    yoffset?: number;
    data: Array<TextPlotElement>;
}
