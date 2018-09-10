import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, CategoricalXAxis, YAxis, ChartComponent, BarPlot, BarPlotElement, NaturalColors,
  Formatters, TextPlot, LinearXAxis, LinePlot, ScatterPlot, ScatterPlotElement, StackedBarPlot,
  StackedBarElement, GroupedBarPlot, GroupedBarElement, PlotTypes, GuidePlot} from '../../../library/src/public_api';
import { interval } from 'rxjs';

@Component({
  selector: 'ab-demo-chart',
  template: `
    <div class="row">
      <div class="col-sm-6">
        <ab-chart [chart]="chart" #firstChart></ab-chart>
      </div>
      <div class="col-sm-6">
        <ab-chart [chart]="linear_chart" #secondChart></ab-chart>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <ab-chart [chart]="scatter_plot" #scatterPlot></ab-chart>
      </div>
      <div class="col-sm-6">
      <ab-chart [chart]="stacked_plot" #stackedPlot></ab-chart>
      </div>
    </div>
  `,
  styles: []
})
export class DemoChartComponent implements OnInit {

  chart: Chart;
  linear_chart: Chart;
  scatter_plot: Chart;
  stacked_plot: Chart;
  emea_txn_count: Chart;
  @ViewChild('firstChart') firstChart: ChartComponent;
  @ViewChild('secondChart') secondChart: ChartComponent;
  @ViewChild('scatterPlot') scatterPlot: ChartComponent;
  @ViewChild('stackedPlot') stackedPlot: ChartComponent;
  @ViewChild('emeaTxnCount') emeaTxnCount: ChartComponent;

  constructor() {}

  ngOnInit() {
    this.setup_first_chart();
    this.setup_linear_chart();
    this.setup_scatter_plot();
    this.setup_stacked_plot();
    this.setup_emea_txn_count();
  }

  private setup_emea_txn_count() {
    const my_sql_count = 132376203 + 372;
    const xaxis: CategoricalXAxis = {values: ['MySQL', 'NCF1', 'NCF100',
      'NCF106', 'NCF63', 'NCF64', 'NCF66']};
    const yaxis: YAxis = {title: 'Counts', title_offset: 70};
    const plot: BarPlot = {
      type: PlotTypes.Bar,
      color: NaturalColors.blue,
      data: [
        {x: 'MySQL', y: my_sql_count - my_sql_count},
        {x: 'NCF1', y: 132376595 - my_sql_count},
        {x: 'NCF100', y: 132376595 - my_sql_count},
        {x: 'NCF106', y: 132376595 - my_sql_count},
        {x: 'NCF63', y: 132488132 - my_sql_count},
        {x: 'NCF64', y: 132398736 - my_sql_count},
        {x: 'NCF66', y: 132556970 - my_sql_count}
      ],
      tooltip: (d) => Formatters.thousands()(d.y)
    };
    let text_data = JSON.parse(JSON.stringify(plot.data));
    text_data = text_data.map( (v) => {
      v.text = v.y !== 0 ? Formatters.thousands()(v.y) : '';
      return v;
    });
    const text: TextPlot = {
      type: PlotTypes.Text,
      data: text_data,
      yoffset: 2,
      color: 'purple'
    };
    this.emea_txn_count = {
      title: 'EMEA Txn Count',
      margin: {left: 100},
      xaxis: xaxis,
      yaxis: yaxis,
      plots: [plot, text]
    };
  }

  private setup_first_chart() {
    const xaxis: CategoricalXAxis = {
      title: 'x-axis',
      values: ['A', 'B', 'C'],
      tick_label_rotation: -40,
      title_offset: 50,
      pegToZero: true
    };
    const yaxis: YAxis = {title: 'y-axis', max: 175 };
    const barplot: BarPlot = {
      type: PlotTypes.Bar,
      color: NaturalColors.green,
      data: [
        {x: 'A', y: 100},
        {x: 'C', y: 150}
      ],
      tooltip: ( (e: BarPlotElement) => e.x + ':- ' + e.y)
    };
    const secondbarplot: BarPlot = {
      type: PlotTypes.Bar,
      color: NaturalColors.blue,
      data: [],
      tooltip: ( (e: BarPlotElement) => e.x + ': ' + e.y)
    };
    const textplot: TextPlot = {
      type: PlotTypes.Text,
      color: 'black',
      yoffset: -2,
      data: [
        {x: 'A', y: 100, text: 'Hello!'}
      ]
    };
    const textplottwo: TextPlot = {
      type: PlotTypes.Text,
      color: NaturalColors.red,
      yoffset: 2.5,
      shape: 'star',
      data: [
        {x: 'C', y: 150, text: '150'}
      ]
    };
    const lineplot: LinePlot = {
      type: PlotTypes.Line,
      color: NaturalColors.red,
      interpolation: 'step',
      data: []
    };
    const guide: GuidePlot = { type: PlotTypes.VerticalGuide, values: ['A', 'B']};
    const plots = [barplot, secondbarplot, textplot, textplottwo, lineplot];
    this.chart = {
      title: 'Demo Chart',
      xaxis: xaxis,
      yaxis: yaxis,
      plots: plots
    };
    setTimeout(() => {
      xaxis.values = ['C', 'A', 'N', 'B', 'X', 'Y', 'Z'];
      barplot.data.push({x: 'B', y: 50, y0: -50});
      secondbarplot.data.push({x: 'N', y: 150});
      textplottwo.data.push(
        {x: 'N', y: 150, text: '150'}
      );
      lineplot.data = [
        {x: 'C', y: 150},
        {x: 'A', y: 100},
        {x: 'N', y: 150},
        {x: 'B', y: 50},
        {x: 'X', y: 70},
      ];
      this.firstChart.refresh();
    }, 1000);
  }

  private setup_linear_chart() {
    const xaxis: LinearXAxis = {min: 0, max: 100, title: 'this is the x-axis'};
    const yaxis: YAxis = {title: 'this is the y-axis', min: 0, max: 60};
    const line_plot: LinePlot = {
      type: PlotTypes.Line,
      color: NaturalColors.blue,
      interpolation: 'linear',
      data: [
        {x: 10, y: 20},
        {x: 30, y: 15},
        {x: 50, y: 30},
        {x: 55, y: 40},
        {x: 60, y: 20},
        {x: 62, y: 30},
        {x: 91, y: 42},
      ]
    };
    const line_plot_2: LinePlot = JSON.parse(JSON.stringify(line_plot));
    line_plot_2.interpolation = 'basis';
    line_plot_2.color = NaturalColors.red;
    line_plot_2.dashed = true;
    const guide: GuidePlot = {
      type: PlotTypes.HorizontalGuide,
      values: [45],
      dashed: true,
      color: '#BB8FCE'
    };
    this.linear_chart = {
      title: 'Linear Chart',
      xaxis: xaxis,
      yaxis: yaxis,
      plots: [guide, line_plot, line_plot_2]
    };
    setTimeout(() => {
      line_plot.data[2].y = 5;
      line_plot_2.data[2].y = 5;
      this.secondChart.refresh();
    }, 1000);
  }

  private setup_scatter_plot() {
    const xaxis: LinearXAxis = {min: 0, max: 100};
    const splot: ScatterPlot = {
      type: PlotTypes.Scatter,
      color: NaturalColors.blue,
      data: this.generate_random_scatter_data(40),
      tooltip: (e: ScatterPlotElement) => e.x + ': ' + e.y
    };
    const splottwo: ScatterPlot = {
      type: PlotTypes.Scatter,
      color: NaturalColors.red,
      data: this.generate_random_scatter_data(40)
    };
    this.scatter_plot = {
      title: 'Scatter Plot',
      xaxis: xaxis,
      yaxis: {min: 0, max: 100},
      plots: [splot, splottwo]
    };
    // interval(2000).subscribe( (c: number) => {
    //   splot.data = this.generate_random_scatter_data(40);
    //   splottwo.data = this.generate_random_scatter_data(40);
    //   this.scatterPlot.refresh();
    // });
  }

  private setup_stacked_plot() {
    const xaxis: CategoricalXAxis = {values: ['A', 'B', 'C', 'D', 'E', 'F']};
    const splot: StackedBarPlot = {
      type: PlotTypes.StackedBar,
      series: [
        {
          color: NaturalColors.red,
          data: [{x: 'A', y0: 0, y: 20}, {x: 'B', y0: 0, y: 5}, {x: 'C', y0: 0, y: 15}]
        },
        {
          color: NaturalColors.blue,
          data: [{x: 'A', y0: 20, y: 30}, {x: 'B', y0: 5, y: 15}, {x: 'C', y0: 15, y: 25}]
        }
      ],
      tooltip: (e: StackedBarElement) => e.x + ': ' + (e.y - e.y0)
    };
    const gplot: GroupedBarPlot = {
      type: PlotTypes.GroupedBar,
      series: [
        {
          color: NaturalColors.red,
          data: [{x: 'D', y: 20}, {x: 'E', y: 5}, {x: 'F', y: 15}]
        },
        {
          color: NaturalColors.blue,
          data: [{x: 'D', y: 10}, {x: 'E', y: 10}, {x: 'F', y: 10}]
        },
        {
          color: NaturalColors.green,
          data: [{x: 'D', y: 5}, {x: 'E', y: 15}, {x: 'F', y: 20}]
        }
      ],
      tooltip: (e) => e.data.x + ': ' + e.data.y
    };
    this.stacked_plot = {
      title: 'Stacked & Group Plot',
      xaxis: xaxis,
      yaxis: {},
      plots: [splot, gplot]
    };
    // setTimeout(() => {
    //   splot.series[0].color = NaturalColors.green;
    //   splot.series[0].data = [{x: 'A', y0: 10, y: 20}, {x: 'B', y0: 0, y: 5}, {x: 'C', y0: 0, y: 15}];
    //   this.stackedPlot.refresh();
    // }, (1000));
  }

  private generate_random_scatter_data(count: number) {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push({x: this.randomInt(100), y: this.randomInt(100)});
    }
    return result;
  }

  private randomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
