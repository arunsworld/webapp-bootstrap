import { Bubble } from './interfaces';
import { select, scaleLinear, interpolateHcl, pack, hierarchy, transition, event, interpolateZoom } from 'd3';

export class BubbleModel {

    private plot: Bubble;
    private svg: any;
    private g: any;
    private circleg: any;
    private textg: any;
    private color = 'white';

    private margin;
    private diameter;
    private pack;
    private colors;
    private focus;
    private view;
    private node;
    private circles;
    private text;
    private root;

    constructor(plot: Bubble, svg: any) {
        this.plot = plot;
        this.svg = select(svg);
        if ('color' in plot) { this.color = plot.color; }

        this.initialize();
        this.draw();
    }

    initialize() {
        this.margin = 20;
        this.diameter = 600;
        this.g = this.svg.append('g')
                            .attr('transform', 'translate(' + this.diameter / 2 + ',' + this.diameter / 2 + ')');
        this.circleg = this.g.append('g');
        this.textg = this.g.append('g');
        this.colors = scaleLinear()
                        .domain([-1, 5])
                        .range([<any> 'hsl(152,80%,80%)', <any> 'hsl(228,30%,40%)'])
                        .interpolate(<any> interpolateHcl);
        this.pack = pack()
                      .size([this.diameter - this.margin, this.diameter - this.margin])
                      .padding(2);
    }

    refresh() {
        this.zoomOut();
        this.draw();
    }

    private draw() {
        this.root = hierarchy(this.plot.data)
                        .sum( (d) => d.size )
                        .sort( (a, b) => b.value - a.value );
        this.focus = this.root;
        const nodes = this.pack(this.root).descendants();

        this.circles = this.circleg.selectAll('circle').data(nodes);
        this.circles.transition().duration(500)
            .attr('class', (d) => d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root')
            .style('fill', (d) => d.children ? this.colors(d.depth) : d.data.color ? d.data.color : this.color);
        this.circles.exit().remove();
        const new_circles = this.circles.enter().append('circle')
                                .attr('class', (d) => d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root')
                                .style('fill', (d) => d.children ? this.colors(d.depth) : d.data.color ? d.data.color : this.color)
                                .on('click', (d) => {
                                    if (this.focus !== d) { this.zoom(d); }
                                    event.stopPropagation();
                                });
        this.circles = this.circles.merge(new_circles);

        this.text = this.textg.selectAll('text').data(nodes);
        this.text.style('fill-opacity', 0);
        this.text.exit().remove();
        const new_text = this.text.enter().append('text')
                            .attr('class', 'label')
                            .style('fill-opacity', 0 )
                            .style('display', 'inline')
                            .text((d) => d.data.name );
        this.text = this.text.merge(new_text);
        this.text.transition().duration(500)
            .style('fill-opacity', (d) => d.parent === this.root ? 1 : 0 )
            .text((d) => d.data.name );

        this.node = this.g.selectAll('circle,text');

        // this.drawing.svg.style('background', this.colors(-1));
        this.svg.on('click', () => this.zoom(this.root));
        this.zoomTo([this.root.x, this.root.y, this.root.r * 2 + this.margin]);
    }

    private zoom(d: any) {
        this.focus = d;

        transition().duration(500)
            .tween('zoom', () => {
                const i = interpolateZoom(this.view,
                    [this.focus.x, this.focus.y, this.focus.r * 2 + this.margin]);
                return (t) => this.zoomTo(i(t));
            });
        this.text.transition().duration(500).style('fill-opacity', (x) => x.parent === d ? 1 : 0 );
    }

    private zoomTo(v: any) {
        const k = this.diameter / v[2];
        this.view = v;
        this.node.attr('transform', (d) => 'translate(' + (d.x - v[0]) * k + ',' + (d.y - v[1]) * k + ')');
        this.circles.attr('r', (d) => d.r * k );
    }

    private zoomOut() {
        this.zoomTo([this.root.x, this.root.y, this.root.r * 2 + this.margin]);
    }

}
