import { Component, OnInit, Input } from '@angular/core';
import { IAtlas } from 'src/app/model/IAtlas';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})
export class PaletteComponent implements OnInit {

  @Input() atlas: IAtlas;
  constructor() { }

  ngOnInit() {
  }

}
