import { Component, OnInit, Input } from '@angular/core';
import { IMapwork } from 'src/app/model/IMapwork';

@Component({
  selector: 'app-perspective-list',
  templateUrl: './perspective-list.component.html',
  styleUrls: ['./perspective-list.component.css']
})
export class PerspectiveListComponent implements OnInit {
  
  @Input() mapwork: IMapwork;
  constructor() { }

  ngOnInit() {
  }

}
