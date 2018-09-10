import { Plot } from '../interfaces';


export interface GuidePlot extends Plot {
    values: Array<number | string>;
    readonly color?: string;
    readonly dashed?: boolean;
}
