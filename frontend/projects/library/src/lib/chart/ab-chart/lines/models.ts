import { PlotModel, Drawing } from '../models';
import { LinePlot, LinePlotElement } from './interfaces';
import { CurveOptions } from '../../interfaces';
import { min, max, line } from 'd3';
import { AxisType } from '../axis/interfaces';


export class LinePlotModel extends PlotModel {

    plot: LinePlot;

    private color = 'black';
    private dashed: string;
    private lineg: any;
    private interpolation = CurveOptions['linear'];

    constructor(plot: LinePlot, drawing: Drawing) {
        super(plot, drawing);
        if ('color' in plot) { this.color = plot.color; }
        if ('interpolation' in plot) { this.interpolation = CurveOptions[plot.interpolation]; }
        if ('dashed' in plot && plot.dashed) { this.dashed = '5,5'; }
    }

    initialize() {
        this.lineg = this.drawing.plotg.append('g')
                        .style('stroke', this.color)
                        .style('fill', 'none');
        if (this.dashed !== undefined) { this.lineg.style('stroke-dasharray', this.dashed); }
    }

    draw() {
        let line_plot = this.lineg.selectAll('.line').data([this.plot.data]);
        line_plot.exit().remove();
        const new_line_plot = line_plot.enter().append('path')
            .attr('class', 'line')
            .attr('d', this.line_func(this.drawing));
        line_plot = line_plot.merge(new_line_plot);
        line_plot.transition().duration(500)
            .attr('d', this.line_func(this.drawing));
    }

    y_range(): [number, number] {
        const min_y = min(this.plot.data, (d: LinePlotElement) => d.y);
        const max_y = max(this.plot.data, (d: LinePlotElement) => d.y);
        return [min_y, max_y];
    }

    private line_func = (drawing: Drawing) => {
        return line()
                .x( (d: any) => this.xloc(d, drawing) )
                .y( (d: any) => drawing.y(d.y) )
                .curve(this.interpolation);
    }

    private xloc(d: any, drawing: Drawing): number {
        if (drawing.xaxis_type === AxisType.Linear) {
            return drawing.x(d.x);
        }
        return drawing.x(d.x) + drawing.x.bandwidth() / 2;
    }

}
