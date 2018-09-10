import { PlotModel, Drawing } from '../models';
import { TextPlot, TextPlotElement } from './interfaces';
import { Symbols } from '../../interfaces';
import { symbol, min, max } from 'd3';


export class TextPlotModel extends PlotModel {

    plot: TextPlot;
    private color = 'black';
    private shape: any;
    private anchor = 'middle';
    private xoffset = 0;
    private yoffset = 0;
    private yoffset_em;

    private labelsg: any;

    constructor(plot: TextPlot, drawing: Drawing) {
        super(plot, drawing);
        if ('color' in plot) { this.color = plot.color; }
        if ('shape' in plot) { this.shape = Symbols[plot.shape]; }
        if ('anchor' in plot) { this.anchor = plot.anchor; }
        if ('xoffset' in plot) { this.xoffset = plot.xoffset; }
        if ('yoffset' in plot) { this.yoffset = plot.yoffset; }
        this.yoffset_em = .35 - this.yoffset * 0.35;
    }

    initialize() {
        this.labelsg = this.drawing.plotg.append('g')
                        .attr('fill', this.color)
                        .attr('text-anchor', this.anchor);
    }

    draw() {
        let labels = this.labelsg.selectAll('.text').data(this.plot.data);
        labels.select('text')
            .text( (d: TextPlotElement) => d.text);
        labels.exit().remove();
        const new_labels = labels.enter().append('g')
                            .attr('class', 'text')
                            .attr('transform', (d: TextPlotElement) => this.position_of_element(d, this.drawing))
                            .attr('opacity', 0);
        new_labels.append('text')
            .text( (d: TextPlotElement) => d.text)
            .attr('dy', this.yoffset_em + 'em');
        if (this.shape !== undefined) {
            new_labels.append('path')
                .attr('d', symbol().type(this.shape));
        }
        labels = labels.merge(new_labels);
        labels.transition().duration(500)
                            .attr('transform', (d: TextPlotElement) => this.position_of_element(d, this.drawing))
                            .attr('opacity', 1);
    }

    y_range(): [number, number] {
        const min_y = min(this.plot.data, (d: TextPlotElement) => d.y);
        const max_y = max(this.plot.data, (d: TextPlotElement) => d.y);
        return [min_y, max_y];
    }

    private position_of_element(d: TextPlotElement, drawing: Drawing) {
        const x_pos = drawing.x(d.x) + drawing.x.bandwidth() / 2 +
            this.calculate_x_offset(drawing);
        const y_pos = drawing.y(d.y);
        return 'translate(' + x_pos + ',' + y_pos + ')';
    }

    private calculate_x_offset(drawing: Drawing) {
        if (this.xoffset === 0) { return 0; }
        const padding = drawing.x.paddingInner() / 2 + drawing.x.paddingOuter() / 2;
        return (drawing.x.bandwidth() / (1 - padding)) * this.xoffset;
    }
}
