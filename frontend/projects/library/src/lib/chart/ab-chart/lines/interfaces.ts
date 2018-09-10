import { Plot } from '../interfaces';


export interface LinePlotElement {
    x: number | string;
    y: number;
}

export interface LinePlot extends Plot {
    color?: string;
    interpolation?: string;
    dashed?: boolean;
    data: Array<LinePlotElement>;
}
