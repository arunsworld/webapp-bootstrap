import { Axis, XAxis, CategoricalXAxis, LinearXAxis, YAxis, AxisType } from './interfaces';
import { axisBottom, axisLeft, min, max } from 'd3';
import { Drawing } from '../models';


export abstract class AxisModel {
    title = '';
    tick_label_rotation = 0;
    title_offset = 35;
    tick_format: (value: any) => string;
    type: AxisType;
    data_range: [number, number] = [undefined, undefined];
    protected axis: Axis;
    protected drawing: Drawing;

    constructor(axis: Axis, drawing: Drawing) {
        if ('title' in axis) { this.title = axis.title; }
        if ('tick_label_rotation' in axis) { this.tick_label_rotation = axis.tick_label_rotation; }
        if ('title_offset' in axis) { this.title_offset = axis.title_offset; }
        if ('tick_format' in axis) { this.tick_format = axis.tick_format; }
        this.axis = axis;
        this.drawing = drawing;
    }

    abstract draw();
}

export abstract class XAxisModel extends AxisModel {

    protected axis: XAxis;
    private pegToZero = false;

    constructor(axis: XAxis, drawing: Drawing) {
        super(axis, drawing);
        if ('pegToZero' in axis) { this.pegToZero = axis.pegToZero; }
    }

    peg_xaxis_to_zero() {
        if (!this.pegToZero) { return; }
        this.drawing.xaxis.transition().duration(500)
            .attr('transform', 'translate(0,' + this.drawing.y(0) + ')');
    }

    protected rotate(labels) {
        if (this.tick_label_rotation === 0) { return; }
        const rotation_str = 'rotate(' + this.tick_label_rotation + ')';
        labels.selectAll('text')
                .style('text-anchor', 'end')
                .attr('transform', rotation_str);
    }
}

export class CategoricalXAxisModel extends XAxisModel {

    protected axis: CategoricalXAxis;

    constructor(axis: CategoricalXAxis, drawing: Drawing) {
        super(axis, drawing);
        this.type = AxisType.Categorical;
    }

    draw() {
        this.drawing.x.domain(this.labels());
        const labels = this.drawing.xaxis.select('.xaxis_labels');
        labels.transition().duration(500).call(axisBottom(this.drawing.x));
        this.rotate(labels);
    }

    private labels(): Array<string> {
        return (<CategoricalXAxis>this.axis).values;
    }

}

export class LinearXAxisModel extends XAxisModel {

    protected axis: LinearXAxis;

    constructor(axis: LinearXAxis, drawing: Drawing) {
        super(axis, drawing);
        this.type = AxisType.Linear;
    }

    draw() {
        this.drawing.x.domain([this.axis.min, this.axis.max]);
        const labels = this.drawing.xaxis.select('.xaxis_labels');
        labels.transition().duration(500).call(axisBottom(this.drawing.x));
        this.rotate(labels);
    }

}

export class YAxisModel extends AxisModel {

    protected axis: YAxis;

    constructor(axis: YAxis, drawing: Drawing) {
        super(axis, drawing);
        this.type = AxisType.Linear;
    }

    draw() {
        this.drawing.y.domain(this.y_range());
        const axisFunc = axisLeft(this.drawing.y).tickFormat(this.tick_format);
        this.drawing.yaxis.transition().duration(500).call(axisFunc);
    }

    private y_range(): [number, number] {
        const min_y = min([this.axis.min, this.data_range[0]]);
        const max_y = max([this.axis.max, this.data_range[1]]);
        return [min_y, max_y];
    }

}
