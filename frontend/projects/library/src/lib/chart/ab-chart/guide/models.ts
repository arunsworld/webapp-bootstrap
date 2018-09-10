import { PlotModel, Drawing } from '../models';
import { GuidePlot } from './interfaces';
import { min, max, line } from 'd3';
import { AxisType } from '../axis/interfaces';


export class GuidePlotModel extends PlotModel {
    plot: GuidePlot;

    private isHorizontal: boolean;
    private guideg: any;
    private color = 'black';
    private dashed: string;

    constructor(plot: GuidePlot, drawing: Drawing, isHorizontal: boolean) {
        super(plot, drawing);
        this.isHorizontal = isHorizontal;
        if ('color' in plot) { this.color = plot.color; }
        if ('dashed' in plot && plot.dashed) { this.dashed = '5,5'; }
    }

    private static line_func_horizontal(yscale: any, width: number) {
        return line()
                .x( (d, i) => width * i )
                .y( (d) => yscale(d) );
    }

    private static line_func_vertical(xaxis_type: AxisType, xscale: any, height: number) {
        return line()
                .x( GuidePlotModel.x_func_by_axistype(xaxis_type, xscale) )
                .y( (d, i) => height * i );
    }

    private static x_func_by_axistype(xaxis_type: AxisType, xscale: any) {
        if (xaxis_type === AxisType.Linear) { return xscale; }
        return (d) => xscale(d) + xscale.bandwidth() / 2;
    }

    initialize() {
        this.guideg = this.drawing.plotg.append('g')
                        .style('stroke', this.color);
        if (this.dashed !== undefined) { this.guideg.style('stroke-dasharray', this.dashed); }
    }

    draw() {
        let guides = this.guideg.selectAll('.guide').data(this.plot.values.map( (e) => [e, e]));
        guides.exit().remove();
        const new_guides = guides.enter().append('path')
                            .attr('class', 'guide')
                            .attr('d', this.line_func(this.drawing));
        guides = guides.merge(new_guides);
        guides.transition().duration(500)
                .attr('d', this.line_func(this.drawing));
    }

    y_range(): [number, number] {
        if (this.plot.values.length === 0) { return [undefined, undefined]; }
        if (typeof this.plot.values[0] === 'string') { return [undefined, undefined]; }
        return [min(<Array<number>> this.plot.values), max(<Array<number>> this.plot.values)];
    }

    private line_func(drawing: Drawing) {
        if (this.isHorizontal) { return GuidePlotModel.line_func_horizontal(drawing.y, drawing.dims.width); }
        return GuidePlotModel.line_func_vertical(drawing.xaxis_type, drawing.x, drawing.dims.height);
    }

}
