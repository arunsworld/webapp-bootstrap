import { PlotModel, Drawing } from '../models';
import { ScatterPlot, ScatterPlotElement } from './interfaces';
import { min, max } from 'd3';

declare var d3: any;

export class ScatterPlotModel extends PlotModel {

    plot: ScatterPlot;
    private color = 'black';
    private size = 3.5;
    private scatterg: any;
    private tip: any;

    constructor(plot: ScatterPlot, drawing: Drawing) {
        super(plot, drawing);
        if ('color' in plot) { this.color = plot.color; }
        if ('size' in plot) { this.size = plot.size; }
    }

    initialize() {
        this.setup_tooltip(this.drawing);
        this.scatterg = this.drawing.plotg.append('g')
                            .attr('fill', this.color);
    }

    draw() {
        let dots = this.scatterg.selectAll('.dot').data(this.plot.data);
        dots.exit()
            .on('mouseover', null)
            .on('mouseout', null)
            .remove();
        const new_dots = dots.enter().append('circle')
                                .attr('class', 'dot')
                                .attr('r', (d: ScatterPlotElement) => this.get_size(d))
                                .attr('cx', (d: ScatterPlotElement) => this.drawing.x(d.x))
                                .attr('cy', (d: ScatterPlotElement) => this.drawing.y(d.y))
                                .on('mouseover', this.tip !== undefined ? this.tip.show : null)
                                .on('mouseout', this.tip !== undefined ? this.tip.hide : null);
        dots = dots.merge(new_dots);
        dots.transition().duration(500)
                .attr('r', (d: ScatterPlotElement) => this.get_size(d))
                .attr('cx', (d: ScatterPlotElement) => this.drawing.x(d.x))
                .attr('cy', (d: ScatterPlotElement) => this.drawing.y(d.y));
    }

    y_range(): [number, number] {
        const min_y = min(this.plot.data, (d: ScatterPlotElement) => d.y);
        const max_y = max(this.plot.data, (d: ScatterPlotElement) => d.y);
        return [min_y, max_y];
    }

    private get_size(d: ScatterPlotElement) {
        if ('size' in d) { return d.size; }
        return this.size;
    }

    private setup_tooltip(drawing: Drawing) {
        if (!('tooltip' in this.plot)) { return; }
        this.tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(this.plot.tooltip);
        drawing.svg.call(this.tip);
    }

}
