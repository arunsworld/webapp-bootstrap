import { BarPlot, BarPlotElement, StackedBarPlot, StackedBarSeries, StackedBarElement, GroupedBarPlot } from './interfaces';
import { min, max, scaleBand } from 'd3';
import { PlotModel, Drawing } from '../models';

declare var d3: any;


export class BarPlotModel extends PlotModel {

    plot: BarPlot;

    private barg: any;
    private color = 'black';
    private tip: any;

    constructor(plot: BarPlot, drawing: Drawing) {
        super(plot, drawing);
        if ('color' in plot) { this.color = plot.color; }
    }

    initialize() {
        this.setup_tooltip(this.drawing);
        this.barg = this.drawing.plotg.append('g');
    }

    draw() {
        this.set_missing_y0();
        let bars = this.barg.selectAll('.bar').data(this.plot.data, (d) => d.x);
        bars.exit()
          .on('mouseover', null)
          .on('mouseout', null)
          .remove();
        const new_bars = bars.enter().append('g')
          .attr('class', 'bar')
          .attr('transform', (d) => 'translate(' + this.drawing.x(d.x) + ', 0)')
          .on('mouseover', this.tip !== undefined ? this.tip.show : null)
          .on('mouseout', this.tip !== undefined ? this.tip.hide : null);
        new_bars.append('rect')
                .attr('x', 0)
                .attr('y', (d) => this.drawing.y(d.y0))
                .attr('width', this.drawing.x.bandwidth())
                .attr('height', 0)
                .style('fill', (d) => 'color' in d ? d.color : this.color);
        bars = bars.merge(new_bars);
        bars.transition().duration(500)
            .attr('transform', (d) => 'translate(' + this.drawing.x(d.x) + ', 0)');
        bars.select('rect').transition().duration(500)
            .attr('y', (d) => this.drawing.y(d.y))
            .attr('width', this.drawing.x.bandwidth())
            .attr('height', (d) => this.drawing.y(d.y0) - this.drawing.y(d.y))
            .style('fill', (d) => 'color' in d ? d.color : this.color);
    }

    y_range(): [number, number] {
        const min_y = min(this.plot.data, (d: BarPlotElement) => d.y0 ? d.y0 : 0);
        const max_y = max(this.plot.data, (d: BarPlotElement) => d.y);
        return [min_y, max_y];
    }

    private setup_tooltip(drawing: Drawing) {
        if (!('tooltip' in this.plot)) { return; }
        this.tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(this.plot.tooltip);
        drawing.svg.call(this.tip);
    }

    private set_missing_y0() {
        this.plot.data.forEach( (d: BarPlotElement) => {
            d.y0 = 'y0' in d ? d.y0 : 0;
        });
    }

}

export class StackedBarModel extends PlotModel {

    plot: StackedBarPlot;
    private stackedbarg: any;
    private tip: any;

    constructor(plot: StackedBarPlot, drawing: Drawing) {
        super(plot, drawing);
    }

    initialize() {
        this.setup_tooltip(this.drawing);
        this.stackedbarg = this.drawing.plotg.append('g');
    }
    draw() {
        let series = this.stackedbarg.selectAll('.series').data(this.plot.series);
        series.attr('fill', (s: StackedBarSeries) => s.color);
        series.exit().remove();
        const new_series = series.enter().append('g')
                                .attr('class', 'series')
                                .attr('fill', (s: StackedBarSeries) => s.color);
        series = series.merge(new_series);
        let bars = series.selectAll('.bar').data((s: StackedBarSeries) => s.data);
        bars.exit()
                .on('mouseover', null)
                .on('mouseout', null)
                .remove();
        const new_bars = bars.enter().append('g')
                .attr('class', 'bar')
                .attr('transform', (d: StackedBarElement) => 'translate(' + this.drawing.x(d.x) + ', 0)')
                .on('mouseover', this.tip !== undefined ? this.tip.show : null)
                .on('mouseout', this.tip !== undefined ? this.tip.hide : null);
        new_bars.append('rect')
                .attr('x', 0)
                .attr('y', (d) => this.drawing.y(d.y0))
                .attr('width', this.drawing.x.bandwidth())
                .attr('height', 0);
        bars = bars.merge(new_bars);
        bars.transition().duration(500)
            .attr('transform', (d) => 'translate(' + this.drawing.x(d.x) + ', 0)');
        bars.select('rect').transition().duration(500)
            .attr('y', (d) => this.drawing.y(d.y))
            .attr('width', this.drawing.x.bandwidth())
            .attr('height', (d) => this.drawing.y(d.y0) - this.drawing.y(d.y));
    }
    y_range(): [number, number] {
        const min_y = min(this.plot.series, (s: StackedBarSeries) => min(s.data, (d: StackedBarElement) => d.y0));
        const max_y = max(this.plot.series, (s: StackedBarSeries) => max(s.data, (d: StackedBarElement) => d.y));
        return [min_y, max_y];
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

export class GroupedBarModel extends PlotModel {

    plot: GroupedBarPlot;
    private tip: any;
    private groupedbarg: any;
    private inner_scale: any;

    constructor(plot: GroupedBarPlot, drawing: Drawing) {
        super(plot, drawing);
        this.inner_scale = scaleBand().padding(0.1);
    }

    initialize() {
        this.setup_tooltip(this.drawing);
        this.groupedbarg = this.drawing.plotg.append('g').attr('class', 'testplot');
    }

    draw() {
        this.inner_scale.rangeRound([0, this.drawing.x.bandwidth()]);
        this.inner_scale.domain(this.plot.series.map( (s, i) => i));

        let series = this.groupedbarg.selectAll('.series').data(this.plot.series);
        series.attr('fill', (s: StackedBarSeries) => s.color);
        series.exit().remove();
        const new_series = series.enter().append('g')
                                .attr('class', 'series')
                                .attr('fill', (s: StackedBarSeries) => s.color);
        series = series.merge(new_series);

        let bars = series.selectAll('.bar').data((s: StackedBarSeries, i) => s.data.map( (e) => {
                        return {id: i, data: e};
                    }));
        bars.exit()
                .on('mouseover', null)
                .on('mouseout', null)
                .remove();
        const new_bars = bars.enter().append('g')
                .attr('class', 'bar')
                .attr('transform', (d) => 'translate(' + this.drawing.x(d.data.x) + ', 0)')
                .on('mouseover', this.tip !== undefined ? this.tip.show : null)
                .on('mouseout', this.tip !== undefined ? this.tip.hide : null);
        new_bars.append('rect')
                .attr('x', (d) => this.inner_scale(d.id))
                .attr('y', this.drawing.y(0))
                .attr('width', this.inner_scale.bandwidth())
                .attr('height', 0);
        bars = bars.merge(new_bars);
        bars.transition().duration(500)
            .attr('transform', (d) => 'translate(' + this.drawing.x(d.data.x) + ', 0)');
        bars.select('rect').transition().duration(500)
            .attr('x', (d) => this.inner_scale(d.id))
            .attr('y', (d) => this.drawing.y(d.data.y))
            .attr('width', this.inner_scale.bandwidth())
            .attr('height', (d) => this.drawing.y(0) - this.drawing.y(d.data.y));
    }

    y_range(): [number, number] {
        const min_y = min(this.plot.series, (s: StackedBarSeries) => min(s.data, (d: StackedBarElement) => d.y0));
        const max_y = max(this.plot.series, (s: StackedBarSeries) => max(s.data, (d: StackedBarElement) => d.y));
        return [min_y, max_y];
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
