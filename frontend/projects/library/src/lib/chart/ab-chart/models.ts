import { Plot } from './interfaces';
import { AxisType } from './axis/interfaces';

/*
    g: SVG group that is translated based on margin.
    plotg: SVG group that holds the plots.
    x: A linear or categorical scale for x axis.
    y: A linear scale for y axis.
    xaxis, yaxis: SVG groups within which the axis are drawn.
*/
export class Drawing {
    svg: any;
    g: any;
    plotg: any;
    dims = {width: 0, height: 0};
    x: any;
    y: any;
    xaxis: any;
    yaxis: any;
    xaxis_type: AxisType;
}

export abstract class PlotModel {

    plot: Plot;
    drawing: Drawing;

    constructor(plot: Plot, drawing: Drawing) {
        this.plot = plot;
        this.drawing = drawing;
    }

    abstract initialize();
    abstract draw();
    abstract y_range(): [number, number];

}
