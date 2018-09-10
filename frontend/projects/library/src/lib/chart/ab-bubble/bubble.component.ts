import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Bubble } from './interfaces';
import { BubbleModel } from './models';


@Component({
    selector: 'ab-bubble',
    template: `
      <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" #mySvg></svg>
    `,
    styleUrls: ['./bubble.css'],
    encapsulation: ViewEncapsulation.None
  })
  export class BubbleComponent implements OnInit {

    @Input() bubble: Bubble;
    @ViewChild('mySvg') mySvg: ElementRef;

    private bubbleModel: BubbleModel;

    constructor(private ref: ChangeDetectorRef) {
      ref.detach();
    }

    ngOnInit() {
      this.bubbleModel = new BubbleModel(this.bubble, this.mySvg.nativeElement);
    }

    refresh() {
      this.bubbleModel.refresh();
    }

  }
