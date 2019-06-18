import {Component, Input, OnInit} from '@angular/core';
import { IMapwork } from 'src/app/model/IMapwork';


@Component({
  selector: 'app-perspective-tree',
  templateUrl: './perspective-tree.component.html',
  styleUrls: ['./perspective-tree.component.css']
})
export class PerspectiveTreeComponent implements OnInit {

  @Input() mapwork: IMapwork;
  constructor() { }

  ngOnInit() {
  }


}
