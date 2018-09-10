

export interface Axis {
    readonly title?: string;
    readonly title_offset?: number;
    readonly tick_label_rotation?: number;
    readonly tick_format?: (value: any) => any;
}

export interface YAxis extends Axis {
    min?: number;
    max?: number;
}

export interface XAxis extends Axis {
    pegToZero?: boolean;
}

export enum AxisType {
    Linear = 0,
    Categorical
}

export interface CategoricalXAxis extends XAxis {
    values: Array<string>;
}

export interface LinearXAxis extends XAxis {
    min: number;
    max: number;
}
