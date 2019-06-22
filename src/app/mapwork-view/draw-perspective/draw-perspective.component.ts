import {Component, Input, OnInit} from '@angular/core';
import {IPerspective} from '../../model/IPerspective';
import {PerspectiveService} from '../../common/perspective.service';



@Component({
  selector: 'app-draw-perspective',
  templateUrl: './draw-perspective.component.html',
  styleUrls: ['./draw-perspective.component.css']
})
export class DrawPerspectiveComponent implements OnInit {

  perspective: IPerspective;

  constructor(private perspService: PerspectiveService) { }

  ngOnInit() {
    this.perspService.currentPersp.subscribe(data => this.perspective = data);
  }


}
