import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Chart } from './interfaces';
import { ChartModel } from './chart.model';

@Component({
  selector: 'ab-chart',
  template: `
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet" #mySvg></svg>
  `,
  styleUrls: ['./d3-tip.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit {

  @Input() chart: Chart;
  @ViewChild('mySvg') mySvg: ElementRef;

  private chartModel: ChartModel;

  constructor(private ref: ChangeDetectorRef) {
    ref.detach();
  }

  ngOnInit() {
    this.chartModel = new ChartModel(this.chart, this.mySvg.nativeElement);
  }

  refresh() {
    this.chartModel.draw();
  }

}
